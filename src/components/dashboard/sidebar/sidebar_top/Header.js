import React from 'react'
import styled from 'styled-components'
import Leftdiv from './Leftdiv'
import HeaderItems from './Items'




const Wrapper = styled.div`
  height: 250px;
  padding: 20px 20px 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 620px) {
    display: none;
  }

`
const Main = styled.div`
  height: 200px;
  width: 230px;
  border-bottom: 1px solid #f1f1f5;
`

const  Sidebarheader = () => {
  return (
    <Wrapper>
      <Main>
        <Leftdiv />
        {/* <HeaderItems/> */}
      </Main>
    </Wrapper>
  )
}

export default Sidebarheader