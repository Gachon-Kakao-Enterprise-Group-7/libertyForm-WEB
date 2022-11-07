import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Donut, Plot, Tooltip, colors } from "@semcore/d3-chart";
import { Flex } from "@semcore/flex-box";
import { Text } from "@semcore/typography";
import Checkbox from "@semcore/checkbox";

import IconTasks from './icon/Tasks'
import IconMessages from './icon/Messages'
import IconSchedule from './icon/Schedule'
import IconActivity from './icon/Activity'
import IconSettings from './icon/Settings'
import IconDashboard from './icon/Dashboard'

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content:left;
  flex-direction: column;
`
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
  height: 360px; 
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
  margin-top:40px;
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
    color: rgb(235,120,48);  
    border-left: 3px solid rgb(235,120,48);
    svg {
      fill: rgb(235,120,48);
    }
  }
    &:hover{
      svg {
      fill: rgb(235,120,48);
    }
    color:rgb(235,120,48)
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

  const [ongoingSurvey, setOngoingSurvey] = useState('')
  const [expiredSurvey, setExpiredSurvey] = useState('')

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
    a: ongoingSurvey.length,
    b: expiredSurvey.length
  };

  const state = useSelector(state => state.survey.previewsurvey)

  const now = new Date()

  useEffect(() => {
    setOngoingSurvey(state.filter((survey, index) => (Math.round((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) >= 0))
    setExpiredSurvey(state.filter((survey, index) => (Math.round((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) < 0))
  }, [])


  return (
    <div>
      <Wrapper>
        <TopWrapper>
          <Main>
            <DWrapper>
              <Text style={{ fontWeight: 'bold', marginRight: '15px', marginTop:'20px' }} tag="h3" size={400} medium m={0} >
                설문 현황
              </Text>

              <Plot width={250} height={250} data={donutdata} style={{ marginRight: '10px' }}>
                <Donut startAngle={90}
                  endAngle={-270}
                  innerRadius={70}
                  outerRadius={100} >
                  <Donut.Pie
                    dataKey="a"
                    color='#f5c525'
                    name="진행설문"
                  />
                  <Donut.Pie
                    dataKey="b"
                    color='#eb7830'
                    name="종료설문"
                  />
                  <Donut.Label x={0} y={0}>
                    <Text tag="tspan" size={500} bold>
                      {state.length}
                    </Text>
                    <br />
                    <Text tag="tspan" x={0} y={25} size={300}>
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
              <CheckboxWrapper>
                <Checkbox theme='#f5c525'>
                  <Checkbox.Value checked={true} />
                  <Checkbox.Text pr={3}>
                    <Text>진행중 설문    {ongoingSurvey.length}</Text>
                  </Checkbox.Text>
                </Checkbox>
                <Checkbox theme='#eb7830'>
                  <Checkbox.Value checked={true} />
                  <Checkbox.Text pr={3}>
                    <Text>만료된 설문    {expiredSurvey.length}</Text>
                  </Checkbox.Text>
                </Checkbox>
              </CheckboxWrapper>
            </DWrapper>
          </Main>
        </TopWrapper>
        <ItemWrapper>
          {itemsData.map((item, index) => {
            return (
              <NavItem className={({ isActive }) => (isActive ? "active" : "")} to={item.link} onClick="window.location.reload()">
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