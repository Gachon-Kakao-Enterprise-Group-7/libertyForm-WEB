import React from 'react'
import styled from 'styled-components'
import HeaderItem from './HeaderItem'
import IconTasks from '../icon/Tasks'
import IconMessages from '../icon/Messages'
import IconSchedule from '../icon/Schedule'
import IconActivity from '../icon/Activity'
import IconSettings from '../icon/Settings'
import IconDashboard from '../icon/Dashboard'


const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 620px) {
    margin-top: 40px;
  }
`

const itemsData = [
  {
    name: 'Dashboard',
    icon: IconDashboard(),
    link: '/content'
  },
  {
    name: '새로운 설문 생성',
    icon: IconMessages(),
    link: '/dcontent'
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
const Menu = () => {
    return (
        <Wrapper>{items}</Wrapper>
    )
  }

export default Menu
