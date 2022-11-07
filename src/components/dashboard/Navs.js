import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import Actions from 'components/Common/Header/Actions'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  max-width: 1600px;
  margin: 0 auto;
  box-shadow: inset 0px -1px 0px #e2e2ea;
`
const LogoWrapper = styled.div`
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;

  }
`
const ActionsWrapper = styled.div`
  margin-right: 25px;
`

const Title = styled.div`
    size: 20;
    color: 'rgb(235,120,48)';
`

const Navs = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Link to='/'>
          <Title>LibertyFroms</Title>
        </Link>
      </LogoWrapper>
      {/* <ActionsWrapper>g_
        <Actions />
      </ActionsWrapper> */}
    </Wrapper>
  )
}

export default Navs
