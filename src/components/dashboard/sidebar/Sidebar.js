import React from 'react'
import styled from 'styled-components'
import { Doughnut } from 'react-chartjs-2'; //styled-components사용
import { useMediaQuery } from 'react-responsive' // react-responsive 에서 제공하는 useMediaQuery 사용해 반응형 구성
import { useSelector } from 'react-redux';
import ReactDOM from "react-dom";
import { Chart, ArcElement } from "chart.js"
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import Demo from "./Demo"
import HeaderItem from './HeaderItem'
>>>>>>> d4f179854f76c3c00d104baf1076016af6f409f7
import IconTasks from './icon/Tasks'
import IconMessages from './icon/Messages'
import IconSchedule from './icon/Schedule'
import IconActivity from './icon/Activity'
import IconSettings from './icon/Settings'
<<<<<<< HEAD

// import IconDashboard from '../../.././img/dashboardicon.jpg'

import Demo from "./Demo"

Chart.register(ArcElement)

=======
import IconDashboard from './icon/Dashboard'
import { useState } from 'react';


Chart.register(ArcElement)


>>>>>>> d4f179854f76c3c00d104baf1076016af6f409f7
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
<<<<<<< HEAD
  
=======
>>>>>>> d4f179854f76c3c00d104baf1076016af6f409f7
`

const ItemWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top:10px;
<<<<<<< HEAD
  justify-content: space-between;
=======
  
>>>>>>> d4f179854f76c3c00d104baf1076016af6f409f7
  @media (max-width: 620px) {
    margin-top: 40px;
  }
`
<<<<<<< HEAD
const NavItem = styled(NavLink)`
display: flex;
align-items: center;
text-decoration: none;
color: black;
font-size: 14px;
letter-spacing: 0.1px;
border-left: 3px solid #fff;
margin-bottom: 40px;
svg {
  fill: #92929d; 
}
&.active{
  color: #0062ff;  
  border-left: 3px solid #0062ff;
  svg {
    fill: #0062ff;
  }
}
  &:hover{
    svg {
    fill: #0062ff;
  }
}
`
const Icon = styled.div `
margin: 0 24px;
`
const NameLink = styled.span `
@media (max-width: 620px) {
  display: none;
}
`

function Sidebar () {

  const itemsData = [
    {
      name: 'Dashboard',
      icon:  "../../.././img/dashboardicon.jpg",
      link: '/dashboard'
    },
    {
      name: '새로운 설문 생성',
      icon: IconMessages(),
      link: '/mksurvey'
    },
    {
      name: '설문결과 분석',
      icon: IconTasks(),
      link: '/ansurvey'
    },
    {
      name: '발송자 관리',
      icon: IconSchedule(),
      link: '/default'
    },
    {
      name: 'Activity',
      icon: IconActivity(),
      link: '/default'
    },
    {
      name: 'Settings',
      icon: IconSettings(),
      link: '/default'
    }
  ]
=======

const itemsData = [
  {
    name: 'Dashboard',
    icon: IconDashboard(),
    link: '/dashboard'
  },
  {
    name: '새로운 설문 생성',
    icon: IconMessages(),
    link: '/mksurvey'
  },
  {
    name: '설문결과 분석',
    icon: IconTasks(),
    link: '/ansurvey'
  },
  {
    name: '발송자 관리',
    icon: IconSchedule(),
    link: '/default'
  },
  {
    name: 'Activity',
    icon: IconActivity(),
    link: '/default'
  },
  {
    name: 'Settings',
    icon: IconSettings(),
    link: '/default'
  }
]


const items = itemsData.map((item, idx) => (React.createElement(HeaderItem, Object.assign({ key: idx }, item))));

const Sidebar = () => {

  const state = useSelector(state => state.survey.previewsurvey)
  const now = new Date()

  const ongoingSurvey = state.filter((survey, index) => (new Date(survey.expirationDate) - now) > 0).length
  const expiredSurvey = state.filter((survey, index) => (new Date(survey.expirationDate) - now) <= 0).length

>>>>>>> d4f179854f76c3c00d104baf1076016af6f409f7
  return (
    <Wrapper>
      <TopWrapper>
        <Main>
          <DWrapper>
<<<<<<< HEAD
            <Demo />
          </DWrapper>
        </Main>
      </TopWrapper>
      <ItemWrapper>
        {itemsData.map((item, index) =>{
          return(
            <NavItem className={({isActive}) => (isActive? "active" : "")} to={item.link}>
              <Icon>{item.icon}</Icon>
              <NameLink>{item.name}</NameLink>
            </NavItem>
          );
        })}
      </ItemWrapper>
=======
            <Demo ongoingSurvey={ongoingSurvey} expiredSurvey={expiredSurvey} />
          </DWrapper>
        </Main>
      </TopWrapper>
      <ItemWrapper>{items}</ItemWrapper>
>>>>>>> d4f179854f76c3c00d104baf1076016af6f409f7
    </Wrapper>
  )
}

export default Sidebar