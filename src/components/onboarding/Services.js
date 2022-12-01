import React from 'react'
import styled from 'styled-components'
import Icon1 from 'img/function.png'
import Icon2 from 'img/function2.png'
import Icon3 from 'img/function3.png'


export const ServicesContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffbc00;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
 `

export const ServicesWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;

    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
  }

    @media screen and (max-width: 786px) {
      grid-template-columns: 1fr;
      padding: 0 20px;
  }
`

export const ServicesCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding:  30px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor:pointer;
  }
`
export const ServicesIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;

`
export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: center;
`

export const ServicesH1 = styled.h1`
  font-size: 7rem;
  color: #fff;
  margin-bottom: 100px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }  
`
// export const ServicesH2 = styled.h2`
//   font-size: 2.5rem;
//   color: #fff;
//   margin-bottom: 40px;
// `

export const CardTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`



function Services() {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>자유롭고 편리한 소통의 시작</ServicesH1>
      {/* <ServicesH2></ServicesH2> */}
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1}/>
          <CardTitle>편의성</CardTitle>
          <ServicesP>설문조사를 보다 편하게 진행하기 위한 UI 및 기능 구축</ServicesP>
        </ServicesCard>
        <ServicesCard>
        <ServicesIcon src={Icon2}/>
          <CardTitle>유연성</CardTitle>
          <ServicesP>사용자의 사용목적에 맞는 <br/> 다양한 시각화 방식</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3}/>
          <CardTitle>직관성</CardTitle>
          <ServicesP>사용자가 원하는 결과와 정보를<br/>쉽게 이해하고 사용</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services