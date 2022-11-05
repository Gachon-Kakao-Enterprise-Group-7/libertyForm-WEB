import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Divider, Typography } from "@material-ui/core";
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

const TypographyTitle = styled.div`
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const TWrapper = styled.div`
  margin: 10px;
  width: 280px;
  color : white;
  border-radius: 20px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.7) 0px 12px 35px 2px;
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
  color :"black";
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

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #92929d;
  font-size: 14px;
`
const Button = styled.button`
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
  svg {
    fill: #92929d;
    :hover {
      fill: #0062ff;
    }
  }
`
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #171725;
  font-size: 24px;
  margin: 30px 0;
  margin-left: 10px;
  border-bottom: 1px solid #e2e2ea;
  height: 50px;
`

const ModalDescription = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 10px;
  color: gray;
  font-size: 14px;
`
const ModalDelete = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  width:100%;
  background-color: #fc5a5a;
  outline: none;
  cursor: pointer;
  color: white;
  height: 38px;
  border-radius: 20px;
  border: 1px solid #fc5a5a;
  :hover {
    color: #fc5a5a;
    background-color: white;
  }
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
  },
  text: {
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  }
});


function Scard(props) {

  const { classes, surveyId, } = props

  const now = new Date()
  const expireDate = new Date(`${props.expirationDate}:00:00:00`)
  const startDate = new Date(props.createdAt)

  const DayCount = Math.round((expireDate - startDate) / (1000 * 60 * 60 * 24)); // 전체 날짜
  const RemainDayCount = Math.round((expireDate - now) / (1000 * 60 * 60 * 24)); // 남은 날짜

  let Dayratio = Math.round(100 - ((RemainDayCount / DayCount) * 100))
  if (Dayratio > 100) {
    Dayratio = 100
  }
  else if (Dayratio < 0) {
    Dayratio = 0
  }
  console.log(Dayratio)

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div>
      <TWrapper>
        <Card className={classes.card}>
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
                  ? <TypographyTitle style={{ fontWeight: 'bold', textDecoration: 'line-through' }}>{props.title}</TypographyTitle>
                  : <TypographyTitle style={{ fontWeight: 'bold' }}>{props.title}</TypographyTitle>
                }
              </Typography>
              <NavDropdown title="" id="collasible-nav-dropdown" style={{ textDecoration: 'none' }} >
                <NavDropdown.Item href="/null1">발행하기</NavDropdown.Item>
                <NavDropdown.Item href="/null2">수정하기</NavDropdown.Item>
                <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={openModal}>삭제하기</NavDropdown.Item>
              </NavDropdown>
            </NavDropStyle>
            <Divider light />
            <ShowLeftDate>
              <Icon>
                <AlarmIcon fontSize="small" />
              </Icon>
              {RemainDayCount >= 1 && <> {RemainDayCount} Days Left</>}
              {RemainDayCount === 0 && <>Today is deadline</>}
              {RemainDayCount < 0 && <>Expired</>}
            </ShowLeftDate>
            <ScoreLine Dayratio={Dayratio}>
              <div /></ScoreLine>
          </CardContent>
          {RemainDayCount}
        </Card>
      </TWrapper>

      <Modal isOpen={modalOpen} style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',

        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          height: '300px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          borderRadius: '20px',
          padding: '20px 25px'
        }
      }}>

        <Header>
          <Button onClick={closeModal}>X</Button>
        </Header>
        <ModalTitle>
          <span>게시물 삭제</span>
        </ModalTitle>
        <ModalDescription>정말 삭제하시겠습니까?</ModalDescription>
        <ModalDelete onClick={() => { console.log(`${surveyId}번 설문 백엔드에서 삭제해주세요!`) }}>삭제하기</ModalDelete>

      </Modal>

    </div>
  );
}

Scard.defaltProps = {
  title: '제목 없음'
}


const Tcards = withStyles(styles)(Scard);
export default Tcards;