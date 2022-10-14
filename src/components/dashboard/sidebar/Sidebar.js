import React from 'react'
import styled from 'styled-components'
import Menu from './Menu'
import  Sidebarheader from './Header'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  height: 92vh;
  min-height: 640px;
`

const Sidebar = () => {
  return (
    <Wrapper>
      < Sidebarheader />
      <Menu />
    </Wrapper>
  )
}

export default Sidebar