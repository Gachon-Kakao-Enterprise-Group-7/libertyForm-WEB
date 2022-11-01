import React, { useState } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Cards from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';
import AlarmIcon from '@mui/icons-material/Alarm';
import IconActivity from './sidebar/icon/Activity'

import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from "react-modal";

const ScoreLine = styled.div`
  background-color: #e2e2ea;
  width: ${(props) => props.Dayratio}%;
  height: 3px;
  border-radius: 2.5px;

  div {
    height: 3px;
    background-color: #3dd598;
  }
`

const TWrapper = styled.div`
  margin: 10px;
  width: 280px;
  color : white;
  border-radius: 20px;
  &:hover {
    width: 290px;
    height: 300px;
    box-shadow: rgba(0, 0, 0, 0.9) 0px 22px 70px 4px;
    cursor: pointer;
  }
`

const Icon = styled.div`
    margin-right : 3px;
    display: flex;
    align-items: center;
`
const NavDropStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShowLeftDate = styled.div`
  font-weight: 600;
  color: var(--soft-blue);
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px; 

  display: flex;
  align-items: center;
`
const styles = (muiBaseTheme) => ({
    card: {
        transition: "0.3s",
        borderRadius: "20px",
        border: "1px dashed white",
    },
    media: { //사진
        paddingTop: "56.25%",
        width: "100%",
    },
    content: {
        textAlign: "left",
        padding: muiBaseTheme.spacing.unit * 3
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    button: {
        borderRadius: "5px",
        width: "100%",
        fontSize: '13px'
    }
});


function Scard(props) {

    const { classes, surveyId } = props

    const now = new Date()
    const expireDate = new Date(props.expirationDate)
    const startDate = new Date(props.createdAt)
    const DayCount = Math.round((expireDate - startDate) / (1000 * 60 * 60 * 24)); // 전체 날짜
    const nowDayCount = Math.round((expireDate - now) / (1000 * 60 * 60 * 24)); // 남은 날짜

    const Dayratio = Math.round(100 - ((nowDayCount / DayCount) * 100))


    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div>
            <TWrapper>
                <Cards className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={
                            "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                        }
                    />
                    <CardContent className={classes.content}>
                        <NavDropStyle>
                            <Typography
                                className={classes.text}
                                variant={"h6"}
                                gutterBottom>
                                {DayCount < 0
                                    ? <div class='txt' style={{ textDecoration: 'line-through', fontWeight: 'bold', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{props.title}</div>
                                    : <div class='txt' style={{ fontWeight: 'bold', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{props.title}</div>
                                }
                            </Typography>
                            <NavDropdown title="" id="collasible-nav-dropdown" style={{ textDecoration: 'none' }} >
                                <NavDropdown.Item href="/null1">발행하기</NavDropdown.Item>
                                <NavDropdown.Item href="/null2">수정하기</NavDropdown.Item>
                                <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => { setModalOpen(true) }}>삭제하기</NavDropdown.Item>
                            </NavDropdown>
                        </NavDropStyle>
                        <Divider light />
                        <ShowLeftDate>
                            <Icon>
                                <AlarmIcon fontSize="small" />
                            </Icon>
                            {DayCount >= 1 && <> {DayCount} Days Left</>}
                            {DayCount === 0 && <>Today is deadline</>}
                            {DayCount < 0 && <>Expired</>}
                        </ShowLeftDate>
                        <ScoreLine Dayratio={Dayratio}>
                            <div /></ScoreLine>
                    </CardContent>
                </Cards>
            </TWrapper>
            <Modal isOpen={modalOpen} style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)'
                },
                content: {
                    position: 'absolute',
                    top: '300px',
                    left: '300px',
                    right: '300px',
                    bottom: '300px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px'
                }
            }}>

                <div style={{ textAlign: 'right' }}><button onClick={() => { setModalOpen(false) }}>X</button></div>
                <p>설문을 정말로 삭제하시겠습니까?</p>
                <button onClick={() => { console.log(`${surveyId}번 설문 백엔드에서 삭제해주세요!`) }}>삭제하기</button>
            </Modal>
        </div>
    );
}

Scard.defaltProps = {
    title: '제목 없음'
}


const Tcards = withStyles(styles)(Scard);
export default Tcards;