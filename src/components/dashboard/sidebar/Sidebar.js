import React from 'react'
import styled from 'styled-components'
import { Doughnut } from 'react-chartjs-2'; //styled-components사용
import { useMediaQuery } from 'react-responsive' // react-responsive 에서 제공하는 useMediaQuery 사용해 반응형 구성
import { useSelector } from 'react-redux';
import ReactDOM from "react-dom";
import { Chart, ArcElement } from "chart.js"
import { NavLink } from 'react-router-dom';
import { Donut, Plot, Tooltip, colors } from "@semcore/d3-chart";
import { Flex } from "@semcore/flex-box";
import { Text } from "@semcore/typography";
import Checkbox from "@semcore/checkbox";
import { useState } from 'react';
import { useEffect } from 'react';

import IconTasks from './icon/Tasks'
import IconMessages from './icon/Messages'
import IconSchedule from './icon/Schedule'
import IconActivity from './icon/Activity'
import IconSettings from './icon/Settings'
import IconDashboard from './icon/Dashboard'




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
  justify-content: space-between;
  
  @media (max-width: 620px) {
    margin-top: 40px;
  }
`
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
const Icon = styled.div`
margin: 0 24px;
`
const NameLink = styled.span`
@media (max-width: 620px) {
  display: none;
}
`

function Sidebar() {

  const [ongoingSurveyCount, setOngoingSurveyCount] = useState(0)
  const [expiredSurveyCount, setExpiredSurveyCount] = useState(0)

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
  const donutdata = {
    a: 5,
    b: 2
  };
  const state = useSelector(state => state.survey.previewsurvey)
  const now = new Date()

  useEffect(() => {
    setOngoingSurveyCount(state.filter((survey, index) => (new Date(survey.expirationDate) - now) > 0).length)
    setExpiredSurveyCount(state.filter((survey, index) => (new Date(survey.expirationDate) - now) <= 0).length)
  }, [ongoingSurveyCount])


  return (
    <div>
    <Wrapper>
      <TopWrapper>
        <Main>
          <DWrapper>
          <Text style={{ fontWeight: 'bold' , marginRight: '15px' }} tag="h3" size={400} medium m={0} >
            설문 현황
          </Text>
       
    <Plot width={250} height={250} data={donutdata} style={{ marginRight: '10px' }}>
      <Donut startAngle={90}
              endAngle={-270}
              innerRadius={70}
              outerRadius={100} >
        <Donut.Pie
          dataKey="a"
          color={colors["blue-02"]}
          name="진행설문"
        />
        <Donut.Pie
          dataKey="b"
          color={colors["green-02"]}
          name="종료설문"
        />
        <Donut.Label x={0} y={0}>
                      <Text tag="tspan" size={500} bold>
                        5
                      </Text>
                      <br/>
                      <Text tag="tspan" x={0} y={25}size={300}>
                       전체설문
                      </Text>
      </Donut.Label>
      </Donut>
      <Tooltip>
        {({ dataKey, name, color }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{name}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Text bold>{donutdata[dataKey]}</Text>
                </Flex>
              </>
            )
          };
        }}
      </Tooltip>
    </Plot>
    <Checkbox>
          <Checkbox.Value checked="true" />
          <Checkbox.Text pr={3}>
            <Text>ddd</Text>
          </Checkbox.Text>
        </Checkbox>
          </DWrapper>
        </Main>
      </TopWrapper>
      <ItemWrapper>
        {itemsData.map((item, index) => {
          return (
            <NavItem className={({ isActive }) => (isActive ? "active" : "")} to={item.link}>
              <Icon>{item.icon}</Icon>
              <NameLink>{item.name}</NameLink>
            </NavItem>
          );
        })}
      </ItemWrapper>
    </Wrapper>
    </div>

  )
}
export default Sidebar