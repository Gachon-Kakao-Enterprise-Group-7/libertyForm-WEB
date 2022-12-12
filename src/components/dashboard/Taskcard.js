import React, { useState } from "react";
import Preview from "./Preview";
import SenderHistory from "components/sendsurvey/SenderHistory";

import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";

import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-modal";
import Swal from "sweetalert2";

import { ReactComponent as CloseModal } from "svg/close.svg";
import { ReactComponent as LinkIcon } from "svg/link.svg";
import { ReactComponent as AlamIcon } from "svg/alam.svg";
import defaultImg from "img/default-thumbnail.jpg";

const ScoreLine = styled.div`
  width: ${(props) => props.Dayratio}%;
  height: 3px;
  border-radius: 2.5px;
  background-color: #f5c525;
`;

const CustomCard = styled(Card)`
  margin: 10px;
  width: 30vmin;
  &.MuiCard-root {
    border-radius: 20px;
    overflow: visible;
  }
`;
const CustomCardMediaW = styled.div`
  width: 30vmin;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
`;
const CustomCardMedia = styled(CardMedia)`
  padding-top: 56.25%;
  transition: transform 400ms;
  &:hover {
    transform: scale(1.2);
  }
`;
const LinkIconSvg = styled(LinkIcon)`
  width: 30px;
  height: 25px;
`;

const AlamIconSvg = styled(AlamIcon)`
  width: 22px;
  height: 22px;
  padding-bottom: 3px;
  margin-right: 3px;
`;
const TypographyTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NavDropStyle = styled.div`
  display: flex;
  justify-content: space-between;
  .dropdown-button {
    color: #ffcd00;
  }
`;

const ShowLeftDate = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding: 15px 0 10px 0;
  display: flex;
  align-items: center;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #92929d;
  font-size: 14px;
`;
const ModalDelete = styled.button`
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
`;

const CloseModalSvg = styled(CloseModal)`
  fill: #92929d;
  width: 30px;
  height: 30px;
  &:hover {
    fill: #ff7800;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #171725;
  font-size: 24px;
  margin: 20px 0;
  margin-left: 10px;
  margin-right: 0px;
  border-bottom: 1px solid #e2e2ea;
  height: 50px;

  & h4 {
    padding-bottom: 10px;
    font-weight: bold;
  }
`;

const ModalDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 10px;
  color: #171725;
  font-size: 16px;
`;
const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: 10px;
  width: 98%;
  background-color: #ff7800;
  outline: none;
  cursor: pointer;
  color: white;
  height: 38px;
  border-radius: 20px;
  border: 1px solid #ff7800;
  :hover {
    color: #ff7800;
    background-color: white;
  }
`;

const ModalCopyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 20%;
  background-color: #ffcd00;
  outline: none;
  cursor: pointer;
  color: white;
  height: 38px;
  border-radius: 10px;
  border: 2px solid #ffcd00;
  :hover {
    color: #ffcd00;
    background-color: white;
  }
`;

const CopyWrapper = styled.div`
  display: flex;
  float: left;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 -5px 10px;
  height: 45px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  width: 98%;
  padding: 0 5px;
`;

const styles = (muiBaseTheme) => ({
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  button: {
    borderRadius: "5px",
    width: "100%",
    fontSize: "13px",
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

function Scard(props) {
  const { classes, surveyId, code, thumbnailImgUrl, end } = props;
  const now = new Date();
  const expireDate = new Date(`${props.expirationDate}:00:00:00`);
  const startDate = new Date(props.createdAt);

  const DayCount = Math.ceil((expireDate - startDate) / (1000 * 60 * 60 * 24)); // 전체 날짜
  const RemainDayCount = Math.ceil((expireDate - now) / (1000 * 60 * 60 * 24)); // 남은 날짜

  let Dayratio = Math.ceil(100 - (RemainDayCount / DayCount) * 100);
  if (Dayratio === 0) {
    Dayratio = 3;
  }
  if (Dayratio > 100) {
    Dayratio = 100;
  } else if (Dayratio < 0) {
    Dayratio = 0;
  }

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [SenderHistoryModalOpen, setSenderHistoryModalOpen] = useState(false);

  const surveylink = `${process.env.REACT_APP_DOSURVEY_HOST}/survey/${code}`;

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const openLinkModal = () => {
    setLinkModalOpen(true);
  };
  const openResponseConfirmationModal = () => {
    setSenderHistoryModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLinkModal = () => {
    setLinkModalOpen(false);
  };

  const openPreviewModal = () => {
    setPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
  };
  const closeResponseConfirmationModal = () => {
    setSenderHistoryModalOpen(false);
    document.body.style.overflow = "unset";
  };
  const copySurveyLink = async () => {
    await navigator.clipboard.writeText(surveylink);
    Swal.fire({
      title: "Success!",
      text: "링크가 복사되었습니다!",
      icon: "success",
      confirmButtonText: "확인",
    });
  };

  const editSurvey = () => {
    window.location.href = `/home/editsurvey/${code}`;
  };

  const deleteSurvey = () => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(
        `${process.env.REACT_APP_DB_HOST}/survey/delete/${surveyId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
          data: {},
        }
      )
      .then((res) => {
        switch (res.data.code) {
          case 1000:
            Swal.fire({
              title: "Success!",
              text: "설문 삭제 성공",
              icon: "success",
              confirmButtonText: "확인",
            }).then((result) => {
              window.location.reload();
            });
            break;
          default:
            alert("정의되지 않는 코드입니다.");
            break;
        }
      })
      .catch((Error) => {
        console.log(Error);
        Swal.fire({
          title: "Error!",
          text: "에러 발생",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  };

  return (
    <div>
      
        <CustomCard>
        <CustomCardMediaW>
          <CustomCardMedia
            image={thumbnailImgUrl ? thumbnailImgUrl : defaultImg}>
          </CustomCardMedia>
          </CustomCardMediaW>
          <CardContent className={classes.content}>
            <NavDropStyle>
              <Typography
                className={classes.text}
                variant={"h6"}
                gutterBottom>
                {DayCount < 0
                  ? <TypographyTitle style={{ fontWeight: '400', textDecoration: 'line-through' }}>{props.title}</TypographyTitle>
                  : <TypographyTitle style={{ fontWeight: '400' }}>{props.title}</TypographyTitle>
                }
              </Typography>
              <NavDropdown id="collasible-nav-dropdown" bsPrefix="dropdown-button">
                <NavDropdown.Item disabled={end} onClick={openLinkModal}>링크생성</NavDropdown.Item>
                <NavDropdown.Item disabled={end} onClick={editSurvey}>수정하기</NavDropdown.Item>
                <NavDropdown.Item onClick={openPreviewModal}>미리보기</NavDropdown.Item>
                <NavDropdown.Item onClick={openResponseConfirmationModal}>이력관리</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={openDeleteModal}>삭제하기</NavDropdown.Item>
              </NavDropdown>
            </NavDropStyle>
            <Divider light />
            <ShowLeftDate>
              <AlamIconSvg />
              {RemainDayCount >= 1 && <> {RemainDayCount} Days Left</>}
              {RemainDayCount === 0 && <>Today is deadline</>}
              {RemainDayCount < 0 && <>Expired</>}
            </ShowLeftDate>
            {RemainDayCount >= 0 && <><ScoreLine Dayratio={Dayratio} /></>}
          </CardContent>
        </CustomCard>

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
          overflow: 'hidden',
          outline: 'none',
          borderRadius: '20px',
          padding: '20px 25px'
        }
      }}>

        <ModalHeader>
          <ModalDelete onClick={closeDeleteModal}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <ModalTitle><h4>설문 삭제</h4></ModalTitle>
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
          width: '35%',
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
          <ModalDelete onClick={closeLinkModal}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <ModalTitle><h4>설문 링크</h4></ModalTitle>
        <ModalDescription>발송자 지정 공유</ModalDescription>
        <ModalButton  onClick={()=>{document.location.href="/home/surveysend"}} style={{ marginTop: "10px", marginBottom: "20px", borderRadius: "10px" }}>지정하기</ModalButton>
        <ModalDescription>링크 복사하기</ModalDescription>
        <CopyWrapper>
          <LinkIconSvg></LinkIconSvg>
          <input style={{ border: "none", outline: "none", height: '100%', margin: '10px', width: '100%' }} value={surveylink}></input>
          <ModalCopyButton onClick={copySurveyLink}>복사</ModalCopyButton>
        </CopyWrapper>


      </Modal>

      <Modal isOpen={previewModalOpen} style={{ //설문 미리보기에 대한 모달
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
          width: '70%',
          height: '80%',
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
          <ModalDelete onClick={closePreviewModal}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <Preview code={code} />
      </Modal>

      <Modal isOpen={SenderHistoryModalOpen} style={{ //설문 발송자 관리에 대한 모달
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
          width: '70%',
          height: '80%',
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
          <ModalDelete onClick={closeResponseConfirmationModal}><CloseModalSvg /></ModalDelete>
        </ModalHeader>
        <SenderHistory surveyId={surveyId}  code={code}/>
      </Modal>
    </div>
  );
}




Scard.defaltProps = {
  title: '제목 없음'
}


const Taskcard = withStyles(styles)(Scard);
export default Taskcard;