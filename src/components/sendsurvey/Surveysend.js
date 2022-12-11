import React, { useState, useEffect } from "react";
import Groupcontrol from "./Groupcontrol";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // react-redux사용
import Modal from "react-modal";
import { ReactComponent as CloseModal } from "svg/close.svg";
import Swal from "sweetalert2";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`;
const Title = styled.span`
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #171725;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Text1 = styled.span`
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #171725;
  @media (max-width: 450px) {
    display: none;
  }
`;
const Text2 = styled.span`
  font-size: 18px;
  letter-spacing: 0.1px;
  color: #92929d;
  margin-left: 10px;
  font-family: "Roboto", sans-serif;
`;
const Surveybutton = styled.button`
  font-weight: bold;
  width: 220px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #ff7800;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  margin-top: 80px;
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
  border-bottom: 1px solid #e2e2ea;
  height: 50px;

  & h4 {
    padding-bottom: 10px;
    font-weight: bold;
  }
`;
const ModalDescription = styled.span`
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
  width: 100%;
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
const Email = styled.div`
  &:hover {
    color: red;
    cursor: pointer;
    font-weight: bold;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: auto;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 90%;
  border-radius: 1rem;
  height: auto;
  margin-top: 20px;
`;

function Surveysend() {
  const dispatch = useDispatch();

  const surveys = useSelector((state) => state.survey.previewsurvey);

  const [loading, setLoading] = useState(false);
  const [selectSurvey, setSelectSurvey] = useState(null);
  const [selectSurveyEday, setSelectSurveyEday] = useState(null);
  // const [userInput, setUserInput] = useState(""); input에 입력한 정보를 가지고 있는 state
  const [users, setUsers] = useState([]); // 설문을 발송하고자 하는 유저 정보를 가진 배열 state
  const [mailSendModal, setMailSendModal] = useState(false);
  const [postManageData, setPostManageData] = useState({});

  const delUser = (e) => {
    const userIndex = parseInt(e.target.dataset.id);
    setUsers(users.filter((user, index) => userIndex !== index));
  };

  const convertPostManageData = () => {
    const cvusers = users.map((user) => user);
    setPostManageData((prev) => ({
      expiredDate: selectSurveyEday,
      surveyId: selectSurvey,
      emails: cvusers,
    }));
  };

  const sendManageToServer = async () => {
    const jwt = localStorage.getItem("jwt");
    await axios
      .post(`${process.env.REACT_APP_DB_HOST}/manage/create`, postManageData, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
      .then((res) => {
        console.log();
        Swal.fire({
          title: "Success!",
          text: "발송했습니다!",
          icon: "success",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            document.location.href = "/home/dashboard";
          }
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const verifyData = () => {
    if (selectSurvey === null) {
      Swal.fire({
        text: "설문을 선택해주세요",
        icon: "warning",
        confirmButtonText: "확인",
      });
    } else if (users.length < 1) {
      Swal.fire({
        text: "사용자를 추가해주세요",
        icon: "warning",
        confirmButtonText: "확인",
      });
    } else {
      setMailSendModal(true);
      convertPostManageData();
    }
  };

  useEffect(() => {
    // 서버에 등록되어 있는 연락처 정보 받아오기
    setLoading(true);
    const jwt = localStorage.getItem("jwt");
    axios
      .get(`${process.env.REACT_APP_DB_HOST}/contact`, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
      .then((res) => {
        console.log("유저 정보 업데이트 완료!");
        console.log(res.data.result);
        dispatch({ type: "SAVECONTACT", data: res.data.result });
        setLoading(false);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  if (loading) {
    return <>로딩중</>;
  }

  return (
    <>
      <HeaderContent>
        <div>
          <Text1>환영합니다,</Text1>
          <Text2>설문이 이메일로 발송됩니다.</Text2>
        </div>
      </HeaderContent>
      <br />
      <SectionWrapper>
        <Title>설문 선택</Title>
        {surveys.length !== 0 ? (
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <TableContainer
                sx={{ minWidth: 350, maxWidth: 1000 }}
                component={Paper}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        size="small"
                        align="center"
                        style={{ fontWeight: "bold" }}
                      >
                        선택
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        설문이름
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        만료일
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {surveys
                    .sort(
                      (a, b) =>
                        new Date(b.expirationDate) - new Date(a.expirationDate)
                    )
                    .map((survey, index) => (
                      <TableBody key={index}>
                        <TableCell align="center" padding="none">
                          <FormControlLabel
                            disabled={
                              new Date(survey.expirationDate) - new Date() < 0
                            }
                            onClick={(e) => {
                              setSelectSurvey(e.target.value);
                              setSelectSurveyEday(survey.expirationDate);
                            }}
                            value={survey.surveyId}
                            control={<Radio />}
                          />
                        </TableCell>
                        <TableCell
                          style={{
                            textDecoration:
                              new Date(survey.expirationDate) -
                                new Date() +
                                54000000 <
                              0
                                ? "line-through"
                                : "none",
                          }}
                          align="center"
                          padding="none"
                        >
                          {survey.name}
                        </TableCell>
                        <TableCell align="center" padding="none">
                          {survey.expirationDate}
                        </TableCell>
                      </TableBody>
                    ))}
                </Table>
              </TableContainer>
            </RadioGroup>
          </FormControl>
        ) : (
          <div>발송할 수 있는 설문이 없습니다.</div>
        )}
      </SectionWrapper>

      <SectionWrapper>
        <Groupcontrol setUsers={setUsers} users={users}></Groupcontrol>
        {/* 그룹컨트롤 컴포넌트 가져오기, 부모 요소의 setter함수를 자식한테 보내줘서 사용 할 수 있게 한다. */}
      </SectionWrapper>
      <SectionWrapper>
        <Title>발송 리스트 {users.length}명</Title>
        {users.map((user, index) => (
          <Email onClick={delUser} data-id={index} key={index}>
            {user}
          </Email>
        ))}
      </SectionWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "50px",
        }}
      >
        <Surveybutton onClick={verifyData}>메일 발송하기</Surveybutton>
      </div>
      <Modal
        isOpen={mailSendModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            height: "300px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            borderRadius: "20px",
            padding: "20px 25px",
          },
        }}
      >
        <ModalHeader>
          <ModalDelete
            onClick={() => {
              setMailSendModal(false);
            }}
          >
            <CloseModalSvg />
          </ModalDelete>
        </ModalHeader>
        <ModalTitle>
          <h4>메일발송</h4>
        </ModalTitle>
        <ModalDescription>정말로 발송하시겠습니까?</ModalDescription>
        <ModalButton onClick={sendManageToServer}>발송하기</ModalButton>
      </Modal>
    </>
  );
}

export default Surveysend;
