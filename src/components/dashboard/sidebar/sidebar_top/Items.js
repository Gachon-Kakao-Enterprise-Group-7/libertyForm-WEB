import React from 'react'
import styled from 'styled-components'

/// 설문지 추가하기
const TextButton = styled.button`
  display: flex;
  margin-top: 30px;
  align-items: center;
  position: relative;
  font-size: 12px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #0062ff;
  border: none;
  /* cursor: not-allowed; */
  background-color: white;
  :focus {
    outline: none;
  }
`
const Cross = styled.div`
  width: 7px;
  height: 7px;
  :before,
  :after {
    position: absolute;
    left: 2px;
    content: '';
    height: 7px;
    width: 1px;
    background-color: #0062ff;
  }
  :before {
    transform: rotate(90deg);
  }
  :after {
    transform: rotate(180deg);
  }
`
////

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Block = styled.div`
  display: flex;
  justify-content: space-between;
`
const Arrow = styled.div`
  border: solid #92929d;
  border-width: 0 2px 2px 0;
  display: flex;
  padding: 3px;
  cursor: pointer;
`
const ArrowDown = styled(Arrow)`
  transform: rotate(45deg);
`
const ArrowUp = styled(Arrow)`
  transform: rotate(135deg);
`
const TeamsTitle = styled.span`
  text-transform: uppercase;
  font-size: 14px;
  color: #92929d;
  letter-spacing: 1px;
`

const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
`
const TeamAvatar = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`
const TeamName = styled.span`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #171725;
`

const HeaderItems = () => {
  const [opened, setOpened] = React.useState(true);

  const handleOpened = () => {
    setOpened(prevState => !prevState)
  }

  return (
    <Wrapper>
      <Block onClick={handleOpened}>
        <TeamsTitle>Teams</TeamsTitle>
        <div>{opened ? <ArrowDown /> : <ArrowUp />}</div>
      </Block>
      {opened && <TeamWrapper>
        <TeamAvatar
          src={require('../../../../img/team1.png')}
          alt='Team avatar'
        />
        <TeamName>Iconspace Team</TeamName>
      </TeamWrapper> }
      <TextButton>
        <Cross />
        <span>설문지 그룹 추가하기</span>
      </TextButton>
      {/* // +Add new Team */}
    </Wrapper>
  )
}

export default HeaderItems
