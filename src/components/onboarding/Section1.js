import { React, useState, useEffect, useRef } from "react";
// import { Button } from '../ButtonElements'
import styled from "styled-components";

import Img1_1 from "img/section1-1.JPG";
import Img1_2 from "img/section1-2.JPG";
import Img1_3 from "img/section1-3.JPG";

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
  max-width: 1200px;
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
  letter-spacing: 0.3px;
  color: ${({ darkText }) => (darkText ? "#010606" : "#fff")};
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

const Section1 = () => {
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
                <Heading lightText={false}>설문생성</Heading>
                <Subtitle darkText={true}>
                  다양한 질문방식을 선택하여 자유롭게 생성하고 <br /> 슬라이드 형식으로 보여지는 자유롭고 직관적인 설문
                </Subtitle>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgSlide>
                <ImgWrap ref={slideRef} currentSlide={currentSlide}>
                  <Img src={Img1_1} />
                  <Img src={Img1_2} />
                  <Img src={Img1_3} />
                </ImgWrap>
              </ImgSlide>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default Section1;
