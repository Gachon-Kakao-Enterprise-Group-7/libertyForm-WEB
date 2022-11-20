import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Donut, Plot, Tooltip } from "@semcore/d3-chart";
import { Flex } from "@semcore/flex-box";
import { Text } from "@semcore/typography";
import Checkbox from "@semcore/checkbox";


const IconActivity = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 22 22'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM11 4C11.5523 4 12 4.44772 12 5V10.5109L16.1139 13.7106C16.5499 14.0497 16.6284 14.678 16.2894 15.1139C15.9503 15.5499 15.322 15.6284 14.8861 15.2894L10.3861 11.7894C10.1425 11.5999 10 11.3086 10 11V5C10 4.44772 10.4477 4 11 4Z'
      />
    </svg>
  )
}

const IconTasks = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 22 22'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 0H15C18.866 0 22 3.13401 22 7V15C22 18.866 18.866 22 15 22H7C3.13401 22 0 18.866 0 15V7C0 3.13401 3.13401 0 7 0ZM7 2C4.23858 2 2 4.23858 2 7V15C2 17.7614 4.23858 20 7 20H15C17.7614 20 20 17.7614 20 15V7C20 4.23858 17.7614 2 15 2H7ZM7.69164 10.2784L9.96275 12.5203L14.2178 7.36355C14.5693 6.93756 15.1996 6.87718 15.6256 7.22868C16.0516 7.58018 16.1119 8.21046 15.7604 8.63645L10.8096 14.6364C10.4357 15.0895 9.75378 15.1243 9.33576 14.7117L6.28661 11.7018C5.89356 11.3138 5.88946 10.6806 6.27745 10.2876C6.66544 9.89453 7.29859 9.89043 7.69164 10.2784Z'
      />
    </svg>
  )
}

const IconSchedule = () => {
  return (
    <svg
      width='21'
      height='20'
      viewBox='0 0 22 21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 2V1C16 0.447715 16.4477 0 17 0C17.5523 0 18 0.447715 18 1V2H19C20.6569 2 22 3.34315 22 5V8V10V15C22 18.3137 19.3137 21 16 21H6C2.68629 21 0 18.3137 0 15V10V8V5C0 3.34315 1.34315 2 3 2H5V1C5 0.447715 5.44772 0 6 0C6.55228 0 7 0.447715 7 1V2H16ZM2 8H20V5C20 4.44772 19.5523 4 19 4H18C18 4.55228 17.5523 5 17 5C16.4477 5 16 4.55228 16 4H7C7 4.55228 6.55228 5 6 5C5.44772 5 5 4.55228 5 4H3C2.44772 4 2 4.44772 2 5V8ZM2 10V15C2 17.2091 3.79086 19 6 19H16C18.2091 19 20 17.2091 20 15V10H2Z'
      />
    </svg>
  )
}


const IconMessages = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 22 22'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.7831 21.9762C21.4976 22.135 22.135 21.4976 21.9762 20.7831L20.8786 15.8439C21.6123 14.3503 22 12.7022 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C12.7022 22 14.3503 21.6123 15.8439 20.8786L20.7831 21.9762ZM18.9424 15.2373C18.8296 15.4481 18.7961 15.6924 18.848 15.9258L19.6829 19.6829L15.9258 18.848C15.6924 18.7961 15.4481 18.8296 15.2373 18.9424C13.9449 19.6335 12.5 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 12.5 19.6335 13.9449 18.9424 15.2373ZM8 13C9.10457 13 10 12.1046 10 11C10 9.89543 9.10457 9 8 9C6.89543 9 6 9.89543 6 11C6 12.1046 6.89543 13 8 13ZM16 11C16 12.1046 15.1046 13 14 13C12.8954 13 12 12.1046 12 11C12 9.89543 12.8954 9 14 9C15.1046 9 16 9.89543 16 11Z'
      />
    </svg>
  )
}

const IconSettings = () => {
  return (
    <svg
      width='20'
      height='22'
      viewBox='0 0 20 22'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.09429 2.33907C7.38357 0.97584 8.59581 0 10 0C11.4042 0 12.6164 0.97584 12.9057 2.33907L12.962 2.60457C14.0187 2.97101 14.9989 3.53018 15.8497 4.2566L16.1074 4.17298C17.442 3.73991 18.9 4.29353 19.6021 5.5C20.3042 6.70647 20.0585 8.23593 19.0131 9.16609L18.8113 9.3457C19.02 10.4399 19.018 11.5617 18.8095 12.6528L19.0131 12.8339C20.0585 13.7641 20.3042 15.2935 19.6021 16.5C18.9 17.7065 17.442 18.2601 16.1074 17.827L15.8489 17.7431C15.4276 18.1021 14.971 18.4234 14.4827 18.7031C13.9945 18.9827 13.4857 19.2144 12.9617 19.3969L12.9057 19.6609C12.6164 21.0242 11.4042 22 10 22C8.59581 22 7.38357 21.0242 7.09429 19.6609L7.03795 19.3954C5.98129 19.029 5.00107 18.4698 4.1503 17.7434L3.8926 17.827C2.55798 18.2601 1.10004 17.7065 0.397941 16.5C-0.304156 15.2935 -0.05845 13.7641 0.986893 12.8339L1.18874 12.6543C0.980025 11.5601 0.982019 10.4383 1.19048 9.34725L0.986893 9.16609C-0.05845 8.23593 -0.304156 6.70647 0.397941 5.5C1.10004 4.29353 2.55798 3.73991 3.8926 4.17298L4.1511 4.25686C4.57236 3.89792 5.02899 3.5766 5.51725 3.29693C6.00551 3.01726 6.51431 2.78559 7.03826 2.60311L7.09429 2.33907ZM10 2C9.5491 2 9.15985 2.31335 9.06696 2.75109L8.88929 3.58834C8.81147 3.95506 8.53351 4.24784 8.16917 4.34682C7.59911 4.50169 7.04777 4.72966 6.52521 5.02898C6.00265 5.3283 5.52798 5.68802 5.10776 6.10038C4.83919 6.36392 4.44464 6.45636 4.0856 6.33986L3.26593 6.07388C2.83737 5.93482 2.36922 6.1126 2.14377 6.5C1.91832 6.8874 1.99722 7.37852 2.33289 7.6772L2.97653 8.24993C3.25789 8.50029 3.37444 8.88578 3.27841 9.24845C2.97456 10.396 2.97134 11.6029 3.27656 12.7524C3.37291 13.1152 3.25641 13.501 2.97486 13.7516L2.33289 14.3228C1.99722 14.6215 1.91832 15.1126 2.14377 15.5C2.36922 15.8874 2.83737 16.0652 3.26593 15.9261L4.08555 15.6602C4.44502 15.5435 4.84005 15.6363 5.10861 15.9005C5.95939 16.7375 7.01454 17.3382 8.16816 17.6509C8.53275 17.7497 8.81098 18.0426 8.88884 18.4095L9.06696 19.2489C9.15985 19.6867 9.5491 20 10 20C10.4509 20 10.8402 19.6867 10.933 19.2489L11.1107 18.4117C11.1885 18.0449 11.4665 17.7522 11.8308 17.6532C12.4009 17.4983 12.9522 17.2703 13.4748 16.971C13.9974 16.6717 14.472 16.312 14.8922 15.8996C15.1608 15.6361 15.5554 15.5436 15.9144 15.6601L16.7341 15.9261C17.1626 16.0652 17.6308 15.8874 17.8562 15.5C18.0817 15.1126 18.0028 14.6215 17.6671 14.3228L17.0235 13.7501C16.7421 13.4997 16.6256 13.1142 16.7216 12.7516C17.0254 11.604 17.0287 10.3971 16.7234 9.24763C16.6271 8.88479 16.7436 8.49897 17.0251 8.24844L17.6671 7.6772C18.0028 7.37852 18.0817 6.8874 17.8562 6.5C17.6308 6.1126 17.1626 5.93482 16.7341 6.07388L15.9144 6.33984C15.555 6.45649 15.1599 6.36367 14.8914 6.09947C14.0406 5.2625 12.9855 4.6618 11.8318 4.3491C11.4672 4.25027 11.189 3.95739 11.1112 3.59046L10.933 2.75109C10.8402 2.31335 10.4509 2 10 2ZM10 14.6316C12.0216 14.6316 13.6605 13.0057 13.6605 11C13.6605 8.99433 12.0216 7.36842 10 7.36842C7.97838 7.36842 6.33953 8.99433 6.33953 11C6.33953 13.0057 7.97838 14.6316 10 14.6316ZM10 12.6316C9.09174 12.6316 8.35544 11.9011 8.35544 11C8.35544 10.0989 9.09174 9.36842 10 9.36842C10.9083 9.36842 11.6446 10.0989 11.6446 11C11.6446 11.9011 10.9083 12.6316 10 12.6316Z'
      />
    </svg>
  )
}
const IconDashboard = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 22 22'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 12H7C9.20914 12 11 13.7909 11 16V18C11 20.2091 9.20914 22 7 22H6C3.79086 22 2 20.2091 2 18V16C2 13.7909 3.79086 12 6 12ZM6 14C4.89543 14 4 14.8954 4 16V18C4 19.1046 4.89543 20 6 20H7C8.10457 20 9 19.1046 9 18V16C9 14.8954 8.10457 14 7 14H6ZM5.5 2C7.433 2 9 3.567 9 5.5V6.5C9 8.433 7.433 10 5.5 10C3.567 10 2 8.433 2 6.5V5.5C2 3.567 3.567 2 5.5 2ZM5.5 4C4.67157 4 4 4.67157 4 5.5V6.5C4 7.32843 4.67157 8 5.5 8C6.32843 8 7 7.32843 7 6.5V5.5C7 4.67157 6.32843 4 5.5 4ZM17 11H18C20.2091 11 22 12.7909 22 15V18C22 20.2091 20.2091 22 18 22H17C14.7909 22 13 20.2091 13 18V15C13 12.7909 14.7909 11 17 11ZM17 13C15.8954 13 15 13.8954 15 15V18C15 19.1046 15.8954 20 17 20H18C19.1046 20 20 19.1046 20 18V15C20 13.8954 19.1046 13 18 13H17ZM14.5 2H18.5C20.433 2 22 3.567 22 5.5C22 7.433 20.433 9 18.5 9H14.5C12.567 9 11 7.433 11 5.5C11 3.567 12.567 2 14.5 2ZM14.5 4C13.6716 4 13 4.67157 13 5.5C13 6.32843 13.6716 7 14.5 7H18.5C19.3284 7 20 6.32843 20 5.5C20 4.67157 19.3284 4 18.5 4H14.5Z'
      />
    </svg>
  )
}


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

  const itemsData = [
    {
      name: 'Dashboard',
      icon: IconDashboard(),
      link: '/home/dashboard'
    },
    {
      name: '새로운 설문 생성',
      icon: IconMessages(),
      link: '/home/mksurvey'
    },
    {
      name: '설문결과 분석',
      icon: IconTasks(),
      link: '/ansurvey'
    },
    {
      name: '설문 이메일 발송',
      icon: IconSchedule(),
      link: '/home/surveysend'
    },
    {
      name: 'Activity',
      icon: IconActivity(),
      link: '/default'
    },
    {
      name: '발송자 관리',
      icon: IconSettings(),
      link: '/home/sendermanagement'
    }
  ]

  const state = useSelector(state => state.survey.previewsurvey)

  const now = new Date()

  const donutdata = {
    a: state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) >= 0).length,
    b: state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) < 0).length
  };

  return (
    <div>
      <Wrapper>
        <TopWrapper>
          <Main>
            <DWrapper>
              <Text style={{ fontWeight: 'bold', paddingRight: '10px', paddingTop: '15px' }} tag="h3" size={400}  >
                설문 현황
              </Text>

              <Plot width={250} height={250} data={donutdata} style={{ marginRight: '10px' }}>
                <Donut startAngle={90}
                  endAngle={-270}
                  innerRadius={70}
                  outerRadius={100} >
                  <Donut.Pie
                    dataKey="a"
                    color='#ffcd00'
                    name="진행설문"
                  />
                  <Donut.Pie
                    dataKey="b"
                    color='#ff7800'
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
                    <Text>진행중 설문    {state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) >= 0).length}</Text>
                  </Checkbox.Text>
                </Checkbox>
                <Checkbox theme='#eb7830' style={{marginBottom: '10px' }}>
                  <Checkbox.Value checked={true} />
                  <Checkbox.Text pr={3}>
                    <Text>만료된 설문    {state.filter((survey, index) => (Math.ceil((new Date(`${survey.expirationDate}:00:00:00`) - now) / (1000 * 60 * 60 * 24))) < 0).length}</Text>
                  </Checkbox.Text>
                </Checkbox>
              </CheckboxWrapper>
            </DWrapper>
          </Main>
        </TopWrapper>
        <ItemWrapper>
          {itemsData.map((item, index) => {
            return (
              <NavItem key={index}className={({ isActive }) => (isActive ? "active" : "")} to={item.link} onClick="window.location.reload()">
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