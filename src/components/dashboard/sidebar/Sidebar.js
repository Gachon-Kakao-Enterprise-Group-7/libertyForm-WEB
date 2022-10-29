import React from 'react'
import styled from 'styled-components'
import {Doughnut} from 'react-chartjs-2'; //styled-components사용
import { useMediaQuery } from 'react-responsive' // react-responsive 에서 제공하는 useMediaQuery 사용해 반응형 구성
import { useSelector } from 'react-redux';
import ReactDOM from "react-dom";
import { Chart, ArcElement } from "chart.js"
import Demo from "./Demo"
import HeaderItem from './HeaderItem'
import IconTasks from './icon/Tasks'
import IconMessages from './icon/Messages'
import IconSchedule from './icon/Schedule'
import IconActivity from './icon/Activity'
import IconSettings from './icon/Settings'
import IconDashboard from './icon/Dashboard'


Chart.register(ArcElement)


const TopWrapper = styled.div`
  height: 350px; //설문 맨 윗 창 크기 수정
  padding: 20px 20px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 620px) {
    display: none;
  }

`
const Main = styled.div`
  height: 345px; 
  width: 230px;
  border-bottom: 1px solid #f1f1f5;
`
const DWrapper = styled.div`
    height: 100%;
    text-align: center;
    padding-top: 1vw;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 620px) {
    display: none;
    
  }
`

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  height: 92vh;
  min-height: 640px;
`

const ItemWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top:10px;
  
  @media (max-width: 620px) {
    margin-top: 40px;
  }
`

const itemsData = [
  {
    name: 'Dashboard',
    icon: IconDashboard(),
    link: '/dcontent'
  },
  {
    name: '새로운 설문 생성',
    icon: IconMessages(),
    link: '/mksurvey'
  },
  {
    name: '설문결과 분석',
    icon: IconTasks(),
    link: ''
  },
  {
    name: '발송자 관리',
    icon: IconSchedule(),
    link: ''
  },
  {
    name: 'Activity',
    icon: IconActivity(),
    link: ''
  },
  {
    name: 'Settings',
    icon: IconSettings(),
    link: ''
  }
]


const items = itemsData.map((item, idx) => (React.createElement(HeaderItem, Object.assign({ key: idx }, item))));

const Sidebar = () => {

  const state = useSelector(state => state.survey)

  return (
    <Wrapper>
      <TopWrapper>
        <Main>
          <DWrapper>
            <Demo/>
          </DWrapper>
        </Main>
      </TopWrapper>
      <ItemWrapper>{items}</ItemWrapper>
    </Wrapper>
  )
}

export default Sidebar