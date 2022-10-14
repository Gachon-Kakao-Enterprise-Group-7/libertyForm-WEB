import React from 'react'
import styled from 'styled-components'
import Item from './HeaderItem'
import IconTasks from './icon/Tasks'
import IconMessages from './icon/Messages'
import IconSchedule from './icon/Schedule'
import IconActivity from './icon/Activity'
import IconSettings from './icon/Settings'
import IconDashboard from './icon/Dashboard'

const Main = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

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
    link: '/'
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


const items = itemsData.map((item, idx) => (React.createElement(Item, Object.assign({ key: idx }, item))));
const Menu = () => {
    return (
      <Main>
        <Wrapper>{items}</Wrapper>
      </Main>
    )
  }

export default Menu
