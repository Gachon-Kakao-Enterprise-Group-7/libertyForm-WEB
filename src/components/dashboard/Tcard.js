import React, { useState } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Cards from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';
import AlarmIcon from '@mui/icons-material/Alarm';
import IconActivity from './sidebar/icon/Activity'


const ScoreLineTitle = styled.div`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #696974;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-left: 10px;
`

const ScoreLine = styled.div`
  background-color: #e2e2ea;
  width: 100%;
  height: 3px;
  border-radius: 2.5px;
  min-width: 150px;
  div {
    height: 3px;
    background-color: #3dd598;
  }
`

const TWrapper = styled.div`
  margin: 20px;
  width: 300px;
  color : white;
  &:hover {
    color : pink;
    cursor: pointer;
  }
`

const Icon = styled.div `
    margin-right : 4px;
    display: flex;
    align-items: center;
`

const ShowLeftDate = styled.div`
  font-weight: 600;
  color: var(--soft-blue);
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
  /* margin: 0; */
  margin-bottom: 5px; 

  display: flex;
  align-items: left;
`
const styles = (muiBaseTheme) => ({
    card: {
        transition: "0.3s",
        borderRadius: "20px",
        border: "1px dashed white",
    },
    media: { //사진
        paddingTop: "56.25%",
        width: "100%",
    },
    content: {
        textAlign: "left",
        padding: muiBaseTheme.spacing.unit * 3
    },
    divider: {
        margin: "15px 0",
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    button: {
        borderRadius: "5px",
        width: "100%",
        fontSize: '13px'
    }
});


function Scard(props) {

    const [expireDateCheck, setExpireDateCheck] = useState(false)

    const { classes } = props

    const now = new Date()
    // const now = new Date('2022.11.01') //생성일
    const expireDate = new Date(props.expirationDate)
    // const axnow = new Date('2022.11.05') //현재날짜

    const DayCount = Math.round((expireDate - now) / (1000 * 60 * 60 * 24)); // 남은 날짜
    // const nowDayCount = Math.round((expireDate - now) / (1000 * 60 * 60 * 24)); // 전체 날짜

    // const Pday = Math.round(DayCount/nowDayCount * 100)

    // console.log(DayCount)
    // console.log(nowDayCount)
    // console.log(Pday)
    return (
        <div>
            <TWrapper>
                <Cards className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={
                            "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                        }
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"h6"}
                            gutterBottom
                        >   {DayCount < 0
                            ? <div style={{ textDecoration: 'line-through', fontWeight: 'bold' }}>{props.title}</div>
                            : <div style={{ fontWeight: 'bold' }}>{props.title}</div>
                            }


                        </Typography>
                        <Typography
                            className={"MuiTypography--subheading"}
                            variant={"caption"}
    
                        >
                        </Typography>
                        <Divider className={classes.divider} light />
                        <ShowLeftDate>
                            <Icon>
                                <AlarmIcon  fontSize="small" />
                            </Icon>
                            {DayCount >= 1 && <> {DayCount} Days Left</>}
                            {DayCount === 0 && <>Today is deadline</>}
                            {DayCount < 0 && <>Expired</>}
                        </ShowLeftDate>
                        <ScoreLine>
                        <div> </div></ScoreLine>
                    </CardContent>
                </Cards>
            </TWrapper>
        </div>
    );
}

Scard.defaltProps = {
    title: '제목 없음'
}


const Tcards = withStyles(styles)(Scard);
export default Tcards;