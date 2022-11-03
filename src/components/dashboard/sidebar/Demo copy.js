//https://github.com/semrush/intergalactic/tree/master/website/docs/data-display/donut-chart/examples/complex-recharts.jsx
import React, { PureComponent } from 'react';

import { PieChart, Pie, Cell, Label, Tooltip as TooltipChart, getColor } from '@semcore/chart';

import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';






let data = [
  { domain: '진행설문', value: 5 },
  { domain: '완료설문', value: 3 },
]





class Demo extends PureComponent {
  
  
  
  render() {
    return (

      <div>
        <Flex mt={3} alignItems="center" justifyContent="center" flexWrap>
          <PieChart height={196} width={196} style={{ margin: 'auto' }}>
            <Pie
              activeIndex={activeIndex}
              activeShape={{ outerRadius: 98, style: { cursor: 'pointer' } }}
              data={dataPie}
              dataKey="value"
              nameKey="domain"
              startAngle={90}
              endAngle={-270}
              innerRadius={60}
              outerRadius={90}
            >
              {dataPie.map((entry, id) => (
                <Cell
                  fill={getColor(entry.domain)}
                  key={entry.domain}
                  fillOpacity={activeIndex !== null && activeIndex !== id ? 0.3 : 1}
                />
              ))}
              <Label
                position="center"
                content={({ viewBox: { cx, cy } }) => (
                  <>
                    <text x={cx} y={cy} textAnchor="middle" verticalAnchor="middle">
                      <Text tag="tspan" size={500} bold>
                      </Text>
                      <Text
                        tag="tspan"
                        cssProperty="fill"
                        color="gray-500"
                        x={cx}
                        y={cy + 25}
                        size={100}
                      >
                        전체 설문
                      </Text>
                    </text>
                  </>
                )}
              />
            </Pie>
            <TooltipChart
              label="Value"
              formatter={(value, name, props) => {
                const { percent } = props;
                return (
                  <>
                    <Box tag="span" style={{ color: '#6C6E79', fontWeight: 'normal' }}>
                      {percent.toFixed(0)}%
                    </Box>
                    <Box tag="span" ml={3}>
                      {value}
                    </Box>
                  </>
                );
              }}
            />
          </PieChart>
          <Text
            tag="table"
            size={100}
            style={{
              borderCollapse: 'separate',
              borderSpacing: '0 4px',
            }}
          >
            {domains.map((name, id) => {
              let { domain, value, opacity = 0.3 } = this.data[id];
              const chartId =
                name !== null ? dataPie.filter((entry) => entry.domain === name)[0].id : null;

              if (
                (activeIndex === null && chartId !== null) ||
                (chartId === activeIndex && activeIndex !== null)
              ) {
                opacity = 1;
              }

              return (
                <tr>
                  <td>
                    <Checkbox style={{ opacity, cursor: 'pointer' }} theme={getColor(domain)}>
                      <Checkbox.Value
                        checked={name !== null}
                        onChange={this.handleCheckedDomain(domain, id)}
                      />
                      <Checkbox.Text pr={3}>
                        <Text>{domain}</Text>
                      </Checkbox.Text>
                    </Checkbox>
                  </td>
                  <Text color="gray-500" pr={4} tag="td">
                    {((value / this.commonValue) * 100).toFixed(0)}%
                  </Text>
                  <Text tag="td">{formatThousands(value)}</Text>
                </tr>
              );
            })}
          </Text>
        </Flex>
      </div>
    );
  }
}

export default Demo;
