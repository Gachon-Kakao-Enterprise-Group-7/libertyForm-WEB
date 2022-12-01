import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { Box, Card, CardContent, CardHeader, Divider, } from '@mui/material';

const DashboardLayoutRoot = styled.div` 
    display: flex;
    flex: 0 0 auto;
    max-width: 100%;
    padding-top: 64;
    padding-left: 200;
`

function Emotionquestion(props) {
    let question = props.question
    question = question.result

    useEffect(() => {
        const root = am5.Root.new(`chartdiv${props.question.number}`);

        root.setThemes([
        am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
        }));


        let series = chart.series.push(am5percent.PieSeries.new(root, {
        alignLabels: true,
        calculateAggregates: true,
        valueField: "value",
        categoryField: "category"
        }));

        series.slices.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xffffff)
        });

        series.labelsContainer.set("paddingTop", 30)

        series.slices.template.adapters.add("radius", function (radius, target) {
        let dataItem = target.dataItem;
        let high = series.getPrivate("valueHigh");

        if (dataItem) {
            let value = target.dataItem.get("valueWorking", 0);
            return radius * value / high
        }
        return radius;
        });

        series.data.setAll([{
        value: question[0].value,
        category: question[0].type
        }, {
        value: question[1].value,
        category: question[1].type
        }, {
        value: question[2].value,
        category: question[2].type
        }, {
        value: question[3].value,
        category: question[3].type
        }, {
        value: question[4].value,
        category: question[4].type
        }]);

        let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15
        }));

        legend.data.setAll(series.dataItems);

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

export default Emotionquestion;