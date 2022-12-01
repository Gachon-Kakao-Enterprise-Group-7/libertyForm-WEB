import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Card, CardContent, CardHeader, Divider, } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`

const Text1 = styled.span`
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #171725;
  @media (max-width: 450px) {
    display: none;
  }
`
const Text2 = styled.span`
  font-size: 18px;
  letter-spacing: 0.1px;
  color: #92929d;
  margin-left: 10px;
  font-family: 'Roboto', sans-serif;
`
const DashboardLayoutRoot = styled.div` 
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
    padding-top: 64;
    padding-left: 200;
`

function Analyzesurvey() {

    useEffect(() => {
        const root = am5.Root.new("chartdiv");

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
            category: "Search engines",
            negative1: -0.1,
            negative2: -0.9,
            positive1: 5,
            positive2: 94
        }, {
            category: "Online encyclopedias",
            negative1: -2,
            negative2: -4,
            positive1: 19,
            positive2: 75
        }, {
            category: "Peers",
            negative1: -2,
            negative2: -10,
            positive1: 46,
            positive2: 42
        }, {
            category: "Social media",
            negative1: -2,
            negative2: -13,
            positive1: 33,
            positive2: 52
        }, {
            category: "Study guides",
            negative1: -6,
            negative2: -19,
            positive1: 34,
            positive2: 41
        }, {
            category: "News websites",
            negative1: -3,
            negative2: -23,
            positive1: 49,
            positive2: 25
        }, {
            category: "Textbooks",
            negative1: -5,
            negative2: -28,
            positive1: 49,
            positive2: 18
        }, {
            category: "Librarian",
            negative1: -14,
            negative2: -34,
            positive1: 37,
            positive2: 16
        }, {
            category: "Printed books",
            negative1: -9,
            negative2: -41,
            positive1: 38,
            positive2: 12
        }, {
            category: "Databases",
            negative1: -18,
            negative2: -36,
            positive1: 29,
            positive2: 17
        }, {
            category: "Student search engines",
            negative1: -17,
            negative2: -39,
            positive1: 34,
            positive2: 10
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

        createSeries("negative2", "Unlikely", am5.Color.lighten(negativeColor, 0.5));
        createSeries("negative1", "Never", negativeColor);
        createSeries("positive1", "Sometimes", am5.Color.lighten(positiveColor, 0.5));
        createSeries("positive2", "Very often", positiveColor);

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
    }, []);

    return (
        <>
            <HeaderContent>
                <div>
                    <Text1>환영합니다,</Text1>
                    <Text2>설문 결과 분석 페이지입니다.</Text2>
                </div>
            </HeaderContent>
            <br />
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <Card>
                        <CardHeader
                            action={(
                                <Button
                                    endIcon={<ArrowDropDownIcon fontSize="small" />}
                                    size="small"
                                >
                                    Last 7 days
                                </Button>
                            )}
                            title="Latest Sales"
                        />
                        <Divider />
                        <CardContent>
                            <Box
                                sx={{
                                    height: 500,
                                    position: 'relative'
                                }}
                            >
                                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                            </Box>
                        </CardContent>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                            <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
                                Overview
                            </Button>
                        </Box>
                    </Card>
                    <Card>
                        <CardHeader title="Traffic by Device" />
                        <Divider />
                        <CardContent>
                            <Box sx={{ height: 300, position: 'relative' }}></Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}></Box>
                        </CardContent>
                    </Card>
                </Box>
            </DashboardLayoutRoot>
        </>
    );
}

export default Analyzesurvey;