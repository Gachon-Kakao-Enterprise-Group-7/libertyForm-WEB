import { React, useState, useEffect, useRef } from "react";
// import { Button } from '../ButtonElements'
import styled from "styled-components";

import Img3_1 from "img/section3-1.JPG";
import Img3_2 from "img/section3-2.JPG";
import Img3_3 from "img/section3-3.JPG";

const InfoContainer = styled.div`
  background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#ffbc00")};
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 100vh;
  width: 100% auto;
  max-width: 1100px;
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
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 1px;
  color: ${({ darkText }) => (darkText ? "#010606" : "#fff")};
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
  width: 600px;
  display: flex;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0 0 10px 0;
  padding-right: 0;
  border: 5px solid #ebebeb;
  border-radius: 10px;
`;

const Section3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 2; //슬라이드 갯수
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
      <InfoContainer lightBg={true}>
        <InfoWrapper>
          <InfoRow imgStart={false}>
            <Column1>
              <TextWrapper>
                {/* <TopLine>설문 발송</TopLine> */}
                <Heading lightText={false}>발송관리</Heading>
                <Subtitle darkText={true}>
                  대상을 지정해서 설문을 발송하고<br />설문 응답 여부을 추적할 수 있습니다
                </Subtitle>
                <BtnWrap></BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgSlide>
                <ImgWrap ref={slideRef} currentSlide={currentSlide}>
                  <Img src={Img3_1} />
                  <Img src={Img3_2} />
                  <Img src={Img3_3} />
                </ImgWrap>
              </ImgSlide>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default Section3;
