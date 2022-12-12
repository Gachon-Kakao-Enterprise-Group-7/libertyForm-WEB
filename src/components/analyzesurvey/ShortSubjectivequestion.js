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
const WordCloudWarp = styled.div`
    margin: 30px;
    text-align: center;
`


function Subjectivequestion(props) {
    let text = ''
    props.question.responses.forEach((item) => (text += ' ' + item))
    let question = { ...props.question, text: text }


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [show, setShow] = useState(false)

    // const question = props.question
    // let text = ''
    // question.result.forEach((item)=>( // result값을 하나의 text로 합쳐주는 작업
    //     text += ' ' +item
    // ))



    const columns = [
        { id: 'index', label: '보기', minWidth: 10 },
        { id: 'response', label: '응답', minWidth: 100 },
    ];

    function createData(index, response) {
        return { index, response };
    }

    const rows = question.responses.map((item, index) => ( // 데이터 매핑 여기다가 하면됨!
        createData(`${index + 1}`, `${item}`)
    ))





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };






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
                    <WordCloudWarp><img src={question.wordCloudImgUrl} width="300px"></img></WordCloudWarp>
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