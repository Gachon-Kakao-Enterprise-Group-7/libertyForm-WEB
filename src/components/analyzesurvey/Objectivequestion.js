import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { Box, Card, CardContent, CardHeader, Divider, } from '@mui/material';

const DashboardLayoutRoot = styled.div` 
    display: flex;
    flex: 0 0 auto;
    max-width: 100%;
    padding-top: 64;
    padding-left: 200;
    margin: 10px;
`

function Objectivequestion(props) {

    let question = props.question
    question = question.result
    console.log(question,'qs')


    useEffect(() => {
        const root = am5.Root.new(`chartdiv${props.question.number}`);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout
            })
        );

        // const data = [{
        //     value: question[0].count,
        //     choice: question[0].choice
        // }, {
        //     value: question[1].count,
        //     choice: question[1].choice
        // }, {
        //     value: question[2].count,
        //     choice: question[2].choice
        // }, {
        //     value: question[3].count,
        //     choice: question[3].choice
        // }, {
        //     value: question[4].count,
        //     choice: question[4].choice
        // }];

        const data = question.map((item)=>(
            {
                value:item.count,
                choice:item.choice
            }
        ))


        const yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "choice",
                renderer: am5xy.AxisRendererY.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9
                }),
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        yAxis.data.setAll(data);

        let xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "누적 카운트",
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "value",
            categoryYField: "choice",
            sequencedInterpolation: true,
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
            })
        }));

        series.columns.template.setAll({
            height: am5.percent(70)
        });

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomY"
        }));
        cursor.lineX.set("visible", false);

        series.data.setAll(data);

        series.appear();

        return () => {
            root.dispose();
        };

    }, []);


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
                    <CardHeader title={props.question.title} />
                    <Divider />
                    <CardContent>
                        <Box
                            sx={{
                                height: 500,
                                position: 'relative'
                            }}
                        >
                            <div id={`chartdiv${props.question.number}`} style={{ width: "100%", height: "500px" }}></div>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </DashboardLayoutRoot>
    );
}

export default Objectivequestion;