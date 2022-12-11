import { React, useState, useEffect, useRef } from "react";
// import { Button } from '../ButtonElements'
import styled from "styled-components";

import Img2_1 from "img/section2-1.png";

const InfoContainer = styled.div`
  background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#ffcd00")};
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 100vh;
  width: 100% auto;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;
`;

const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`};
  }
`;

const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;
const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;
const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`;
const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 4vw;
  line-height: 1.1;
  font-weight: bold;
  color: ${({ lightText }) => (lightText ? "#f7f8fa" : "#010606")};

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;
const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 22px;
  line-height: 24px;
  color: ${({ darkText }) => (darkText ? "#010606" : "#fff")};
  letter-spacing: 0.5px;
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const ImgSlide = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* background-color: antiquewhite; */
`;
const ImgWrap = styled.div`
  width: 650px;
  display: flex;
  border-radius: 25px;
  border: 5px solid #f8bb06;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0 0 0 0;
  padding-right: 0;
  border-radius: 20px;
`;

const Section2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 0; //슬라이드 갯수
  const slideRef = useRef(null);

  useEffect(() => {
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide <= TOTAL_SLIDES - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        setCurrentSlide(0);
      }
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);

  return (
    <>
      <InfoContainer lightBg={false}>
        <InfoWrapper>
          <InfoRow imgStart={true}>
            <Column1>
              <TextWrapper>
                <Heading lightText={false}>대시보드</Heading>
                <Subtitle darkText={true}>
                  한눈에 볼 수 있는 설문 현황, 자유로운 기능 <br /> 리버티폼의
                  대시보드로부터 시작됩니다
                </Subtitle>
                <BtnWrap></BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgSlide>
                <ImgWrap ref={slideRef} currentSlide={currentSlide}>
                  <Img src={Img2_1} />
                </ImgWrap>
              </ImgSlide>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default Section2;
