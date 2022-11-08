import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Divider, Typography } from "@material-ui/core";
import styled from 'styled-components';
import AlarmIcon from '@mui/icons-material/Alarm';
import axios from 'axios';
import IconActivity from './sidebar/icon/Activity'

import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from "react-modal";
import { margin } from '@mui/system';

 
const ScoreLine = styled.div`
  background-color: #e2e2ea;
  width: ${(props) => props.Dayratio}%;
  height: 3px;
  border-radius: 2.5px;

  div {
    height: 3px;
    background-color: #f5c525;
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
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #92929d;
  font-size: 14px;
`
const ModalDelete = styled.button`
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
  /* svg {
    fill: #92929d;
    :hover {
      fill: #ff7800;
    }
  } */
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
const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  width:100%;
  background-color: #ff7800;
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

  const { classes, surveyId, code } = props
  const now = new Date()
  const expireDate = new Date(`${props.expirationDate}:00:00:00`)
  const startDate = new Date(props.createdAt)

  const DayCount = Math.ceil((expireDate - startDate) / (1000 * 60 * 60 * 24)); // 전체 날짜
  const RemainDayCount = Math.ceil((expireDate - now) / (1000 * 60 * 60 * 24)); // 남은 날짜

  let Dayratio = Math.ceil(100 - ((RemainDayCount / DayCount) * 100))
  console.log(Dayratio)
  if (Dayratio == 0){
    Dayratio = 3
  }
  if (Dayratio > 100) {
    Dayratio = 100
  }
  else if (Dayratio < 0) {
    Dayratio = 0
  }

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const [linkModalOpen, setLinkModalOpen] = useState(false)

  const surveylink = `localhost:3000/dosurvey/${code}`

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const openLinkModal = () => {
    setLinkModalOpen(true)
  }

  const closeLinkModal = () => {
    setLinkModalOpen(false)
  }

  const copySurveyLink = async () => {
    await navigator.clipboard.writeText(surveylink)
    alert('링크가 복사되었습니다!')
  }

  const jwt = localStorage.getItem('jwt');

  const deleteSurvey = () => {
    axios.patch(`/survey/delete/${surveyId}`, {}, {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
      .then((res) => {
        console.log(res)
        return window.location.reload();
      })
      .catch((Error) => {
        setError(Error)
      })
  }

  const [NavbarOpen, setNavbarOpen] = useState(false)

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
              <NavDropdown title="" id="collasible-nav-dropdown" style={{ textDecoration: 'none', color: 'red' }} >
                <NavDropdown.Item onClick={openLinkModal}>링크생성</NavDropdown.Item>
                <NavDropdown.Item href="/null2">수정하기</NavDropdown.Item>
                <NavDropdown.Item href="/null3">Action3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={openDeleteModal}>삭제하기</NavDropdown.Item>
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
        </Card>
      </TWrapper>

      <Modal isOpen={deleteModalOpen} style={{ // 설문 삭제에 관한 모달
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

        <ModalHeader>
          <ModalDelete onClick={closeDeleteModal}>X</ModalDelete>
        </ModalHeader>
        <ModalTitle>
          <span>설문 삭제</span>
        </ModalTitle>
        <ModalDescription>정말 삭제하시겠습니까?</ModalDescription>
        <ModalButton onClick={deleteSurvey}>삭제하기</ModalButton>

      </Modal>

      <Modal isOpen={linkModalOpen} style={{ //설문 링크 생성에 대한 모달
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
          width: '50%',
          height: '400px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          borderRadius: '20px',
          padding: '20px 25px'
        }
      }}>

        <ModalHeader>
          <ModalDelete onClick={closeLinkModal}>X</ModalDelete>
        </ModalHeader>
        <ModalTitle>
          <span>설문 링크</span>
        </ModalTitle>
        <input style={{ border: '1px solid grey', margin: '10px', width: '80%' }} value={surveylink}></input>
        <ModalButton onClick={copySurveyLink}>복사하기</ModalButton>

      </Modal>

    </div>
  );
}

Scard.defaltProps = {
  title: '제목 없음'
}


const Tcards = withStyles(styles)(Scard);
export default Tcards;