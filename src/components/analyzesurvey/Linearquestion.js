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

function Linearquestion(props) {

    const question = {
        ...props.question,
        result:[
            {
                type:'verybad',
                count:0,
                percentage:0
            },
            {
                type:'bad',
                count:0,
                percentage:0
            },
            {
                type:'soso',
                count:0,
                percentage:0
            },
            {
                type:'good',
                count:0,
                percentage:0
            },
            {
                type:'verygood',
                count:0,
                percentage:0
            }
        ]
    }
    question.responses.forEach((response)=>(
        question.result[response-1].count +=1
    )) // 질문 결과 누적 카운트
    const sum = question.result[0].count + question.result[1].count + question.result[3].count + question.result[4].count //sum값을 구하는 과정

    question.result.forEach((item, index)=>(
        question.result[index].percentage = (question.result[index].count / sum) * 100
    ))



    console.log(sum)
    console.log(question)



    // let question = props.question
    // let sum = 0;
    // question.result.forEach((item)=>(sum += item.value)) // sum값을 구하려고 하는 반복문
    // question = question.result.map((item)=>(
    //     { ...item, percentage : (item.value/sum)*100 }
    // ))
    



    useEffect(() => {
        const root = am5.Root.new(`chartdiv${question.question.number}`);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.horizontalLayout,
                arrangeTooltips: false
            })
        );

        root.numberFormatter.set("numberFormat", "#.#s'%");

        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        const data = [{
            category: "",
            negative1: -question.result[0].percentage,
            negative2: -question.result[1].percentage,
            positive1: question.result[3].percentage,
            positive2: question.result[4].percentage
        }];

        const yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "category",
                renderer: am5xy.AxisRendererY.new(root, {
                    inversed: true,
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9
                })
            })
        );

        yAxis.data.setAll(data);

        let xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                calculateTotals: true,
                min: -100,
                max: 100,
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 50
                })
            })
        );

        const xRenderer = yAxis.get("renderer");
        xRenderer.axisFills.template.setAll({
            fill: am5.color(0x000000),
            fillOpacity: 0.05,
            visible: true
        });

        function createSeries(field, name, color) {
            const series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    name: name,
                    valueXField: field,
                    valueXShow: "valueXTotalPercent",
                    categoryYField: "category",
                    sequencedInterpolation: true,
                    stacked: true,
                    fill: color,
                    stroke: color,
                    calculateAggregates: true
                })
            );

            series.columns.template.setAll({
                height: am5.p100
            });

            series.bullets.push(function (root, series) {
                return am5.Bullet.new(root, {
                    locationX: 0.5,
                    locationY: 0.5,
                    sprite: am5.Label.new(root, {
                        fill: am5.color(0xffffff),
                        centerX: am5.p50,
                        centerY: am5.p50,
                        text: "{valueX}",
                        populateText: true,
                        oversizedBehavior: "hide"
                    })
                });
            });

            series.data.setAll(data);
            series.appear();

            return series;
        }

        const positiveColor = root.interfaceColors.get("positive");
        const negativeColor = root.interfaceColors.get("negative");

        createSeries("negative2", "그렇지 않다", am5.Color.lighten(negativeColor, 0.5));
        createSeries("negative1", "매우 그렇지 않다", negativeColor);
        createSeries("positive1", "약간 그렇다", am5.Color.lighten(positiveColor, 0.5));
        createSeries("positive2", "매우 그렇다", positiveColor);

        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerY: am5.p50,
                y: am5.p50,
                layout: root.verticalLayout,
                marginLeft: 50
            })
        );

        legend.data.setAll(chart.series.values);

        root.current = root;

        return () => {
            root.dispose();
        };

    },[]);


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
                <CardHeader title={question.question.name} />
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
            </Card>
        </Box>
    </DashboardLayoutRoot>
  );
}

export default Linearquestion;