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
    margin: 10px;
`

function Emotionquestion(props) {
    let question = props.question
    let result = [0, 0, 0, 0, 0]
    question.responses.forEach((response)=>{
        if(response>=0 && response<21){
            result[0] +=1
        }
        else if(response>=21 && response<41){
            result[1] +=1
        }
        else if(response>=41 && response<61){
            result[2] +=1
        }
        else if(response>=61 && response<81){
            result[3] +=1
        }
        else{
            result[4] +=1
        }
    })

    console.log(result)




    useEffect(() => {
        const root = am5.Root.new(`chartdiv${question.question.number}`);

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
        value: result[0],
        category: '매우나쁨😫'
        }, {
        value: result[1],
        category: '나쁨😑'
        }, {
        value: result[2],
        category: '보통😶'
        }, {
        value: result[3],
        category: '좋음😊'
        }, {
        value: result[4],
        category: '매우좋음😍'
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
                <CardHeader title={question.question.name} />
                <Divider />
                <CardContent>
                    <Box
                        sx={{
                            height: 500,
                            position: 'relative'
                        }}
                    >
                        <div id={`chartdiv${question.question.number}`} style={{ width: "100%", height: "500px" }}></div>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </DashboardLayoutRoot>
  );
}

export default Emotionquestion;