import { React, useState, useEffect, useRef } from "react";
// import { Button } from '../ButtonElements'
import styled from "styled-components";
import { Link } from "react-router-dom";

import Img4_1 from "img/section4-1.JPG";
import Img4_2 from "img/section4-2.JPG";
import Img4_3 from "img/section4-3.JPG";

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
  font-size: 48px;
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
  font-size: 18px;
  line-height: 24px;
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
  width: 650px;
  display: flex;
  border-radius: 25px;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0 0 0 0;
  padding-right: 0;
  border-radius: 20px;
  border: 5px solid #f8bb06;
`;
const Mainbutton = styled.button`
  font-weight: bold;
  font-size: 20px;
  width: 200px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #ff7800;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;

  &:hover {
    background-color: #ff973a;
  }

  &:active {
    background-color: #ff7800;
  }
`;

const Section4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 1; //슬라이드 갯수
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
                {/* <TopLine>분석</TopLine> */}

                <Heading lightText={false}>설문분석</Heading>
                <Subtitle darkText={true}> 리버티폼에서 제공하는 다양한 시각화로 <br />당신의 설문을 유연하고 직관적으로 확인하세요
                </Subtitle>
                <Subtitle darkText={true}>
                  {" "}◦워드클라우드<br />◦감정분석<br />◦파이차트<br />◦막대차트
                </Subtitle>
                <BtnWrap>
                  <Link to="/home/dashboard">
                    <Mainbutton>시작하기</Mainbutton>
                  </Link>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgSlide>
                <ImgWrap ref={slideRef} currentSlide={currentSlide}>
                  <Img src={Img4_1} />
                  <Img src={Img4_2} />
                  <Img src={Img4_3} />
                </ImgWrap>
              </ImgSlide>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default Section4;
