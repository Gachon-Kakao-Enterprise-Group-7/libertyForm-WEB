import React, { useState } from 'react';

import styled from 'styled-components';
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { Box, Card, CardContent, CardHeader, Divider, } from '@mui/material';
import { useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const DashboardLayoutRoot = styled.div` 
    display: flex;
    flex: 0 0 auto;
    max-width: 100%;
    padding-top: 64;
    padding-left: 200;
    margin: 10px;
`

const ShowBtn = styled.button`
    border: 0px;
    background-color: ${props => props.show ? '#ffbb29' : 'black'};
    color:white;
    border-radius: 5px;
    height: 40px;
    margin-right: 20px;
        

    &:hover{
        background-color: #e7a61b;
    }
`

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

function Subjectivequestion(props) {
    let text = ''
    props.question.responses.forEach((item) => (text += ' ' + item))
    let question = { ...props.question, text: text }
    let emotions = props.question.emotions
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [show, setShow] = useState(false)

    if (emotions === null || emotions[0] === null || emotions === undefined) {
        console.log('작동!')
        emotions = emotions.fill('감정분석은 설문 만료후에 보여집니다')
    }
    const columns = [
        { id: 'index', label: '보기', minWidth: 10 },
        { id: 'response', label: '응답', minWidth: 50 },
        { id: 'emotion', label: '감정분석' },
    ];

    function createData(index, response, emotion) {
        return { index, response, emotion };
    }

    const rows = question.responses.map((item, index) => ( // 데이터 매핑 여기다가 하면됨!
        createData(`${index + 1}`, `${item}`, `${emotions[index]}`)
    ))





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };




    useEffect(() => {
        let root = am5.Root.new(`chartdiv${question.question.number}`);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let series = root.container.children.push(am5wc.WordCloud.new(root, {
            maxCount: 100,
            minWordLength: 2,
            minFontSize: am5.percent(8),
            maxFontSize: am5.percent(25),
            randomness: 0,
            text: text, // 위에서 문자열을 하나의 text로 합쳐준다
            colors: am5.ColorSet.new(root, {
                colors: [
                    am5.color(0x095256),
                    am5.color(0x087f8c),
                    am5.color(0x5aaa95),
                    am5.color(0x86a873),
                    am5.color(0xbb9f06),
                ]
            })

        }));

        series.labels.template.setAll({
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            fontFamily: "Courier New"
        });
    }, []
    )





    return (
        <DashboardLayoutRoot>
            <Box
                sx={{
                    display: 'flex',
                    flex: '0 0 auto',
                    flexDirection: 'column',
                    width: '100%'
                }}
            >
                <Card>
                    <FlexDiv>
                        <CardHeader title={`${question.question.name}`} />
                        <ShowBtn show={show} onClick={() => { setShow(!show) }}>{`원본데이터 ${show ? `닫기` : `보기`}`}</ShowBtn>
                    </FlexDiv>

                    <Divider />
                    <CardContent>
                        <Box
                            sx={{
                                height: 150,
                                position: 'relative'
                            }}
                        >
                            <div id={`chartdiv${question.question.number}`} style={{ width: "100%", height: "150px" }}></div>
                        </Box>
                    </CardContent>
                    <img src={question.wordCloudImgUrl} width="100px"></img>
                    {show === true
                        ? <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                        : null
                    }
                </Card>
            </Box>


        </DashboardLayoutRoot>
    );
}

export default Subjectivequestion;