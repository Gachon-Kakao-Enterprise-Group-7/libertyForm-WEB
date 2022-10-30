import React, { useState } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Cards from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import { fontSize } from '@mui/system';

const TWrapper = styled.div`
  /* background: black; */
  margin: 20px;
  width: 300px;
  color : white;
  &:hover {
    color : pink;
    cursor: pointer;
  }
`

const ShowLeftDate = styled.div`
  border: 1px solid gray;
  color: black;
  padding: 5px;
  border-radius: 5px;
  margin: 0;
  width: fit-content;
  
  
  
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
        margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
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
    const expireDate = new Date(props.expirationDate)

    const DayCount = Math.round((expireDate - now) / (1000 * 60 * 60 * 24));
    console.log(DayCount)
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
                            ? <div style={{ textDecoration: 'line-through', }}>{props.title}</div>
                            : <div>{props.title}</div>
                            }


                        </Typography>
                        <Typography
                            className={"MuiTypography--subheading"}
                            variant={"caption"}
                        >
                        </Typography>
                        <Divider className={classes.divider} light />
                        <ShowLeftDate><AlarmIcon />
                            {DayCount >= 1 && <> {DayCount} Days Left</>}
                            {DayCount === 0 && <>Today is deadline</>}
                            {DayCount < 0 && <>Expired</>}
                        </ShowLeftDate>
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