import {React,useState,useEffect,useRef} from 'react'
// import { Button } from '../ButtonElements'
import styled from 'styled-components';
import {Link} from 'react-scroll'

import Img1 from 'img/dashboard2.png'


export const InfoContainer = styled.div`
  /* background: ${({lightBg}) => (lightBg ? '#f9f9f9' : '#010606')}; */
  background: #ffbc00;

  @media screen and  (max-width: 768px) {
    padding: 100px 0;
  }
`

export const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 100vh;
  width: 100% auto;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;
`

export const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({imgStart}) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({imgStart}) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)}
  }
`

export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`
export const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`
export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`

export const TopLine = styled.p`
  color: #ff7800;
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: bold;
  color: ${({lightText}) => (lightText ? '#f7f8fa' : '#010606')};

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`
export const Subtitle  = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({darkText}) => (darkText ? '#010606' : '#fff')};
`
export const BtnWrap = styled.div`
  display:flex;
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
`
export const ImgWrap = styled.div`
  max-width: 555px;
  display: flex;
`;
export const Img = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0 0 10px 0;
  padding-right: 0;
  
`;
const Mainbutton = styled.button`
    font-weight: bold;
    font-size : 20px;
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

    &:hover:before {
        opacity: 0.6;
    }

    &:after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ff7800;
        left: 0;
        top: 0;
        border-radius: 10px;
        opacity: 0.8;
    }

`

const Section2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 0; //슬라이드 갯수
  const slideRef = useRef(null);

  useEffect(() => {
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
}, [currentSlide]);



  useEffect(() => {
    const timer = setInterval(
      () => {
        if (currentSlide <= TOTAL_SLIDES - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setCurrentSlide(0);
        }
      }, 2500
    );

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);

  
  
  return (
    <>
      <InfoContainer lightBg={true}>
        <InfoWrapper>
          <InfoRow imgStart={true}>
            <Column1>
              <TextWrapper>
                <TopLine>대시보드</TopLine>
                <Heading lightText={false}>대시보드 관리</Heading>
                <Subtitle darkText={true}>진행중 설문과 완료된 설문을 관리해보세요</Subtitle>
                <BtnWrap>
                <Mainbutton to='home'>시작하기</Mainbutton>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
            <ImgSlide>
              <ImgWrap ref={slideRef} currentSlide={currentSlide}>
                <Img src={Img1}/>
              </ImgWrap>
              </ImgSlide>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  )
}

export default Section2
