import React from 'react'
import styled from 'styled-components'

import Sidebar from '.././sidebar/Sidebar'
import Mksurvey from '../../Mksurvey'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
  @media (max-width: 450px) {
    padding: 10px;
  }

`

const MainWrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`


const Content = () => {
  return (
    <>
      <>
        <MainWrapper>
          <Sidebar />
          <Wrapper>
            <Mksurvey />
          </Wrapper>
        </MainWrapper>
      </>
    </>
  )
}

export default Content
