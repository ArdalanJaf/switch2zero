import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import GraphTooltip from "./GraphTooltip";
import dateUtils from "../../utils/dateUtils";
import StyledGraph from "../../styles/Graph.styled";

export default function OffsetGraph() {
  const { graphData, monthlyCO2Emmissions } = useSelector(
    (state) => state.data
  );
  let domainMax =
    graphData[graphData.length - 1].offset >= monthlyCO2Emmissions
      ? graphData[graphData.length - 1].offset
      : monthlyCO2Emmissions + 100;
  return (
    <StyledGraph>
      <ResponsiveContainer width="99%" height="99%">
        <AreaChart data={graphData}>
          <defs>
            <linearGradient id="offsetGradient" x1="1" x2="0" y1="0" y2="0">
              <stop offset="10%" stopColor="#1c99ff" stopOpacity={1} />
              <stop offset="75%" stopColor="#1c99ff" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <Area
            dataKey="offset"
            stroke="#008bfc"
            fill="url(#offsetGradient)"
            fillOpacity={1}
          />

          <ReferenceLine
            y={monthlyCO2Emmissions}
            stroke="red"
            strokeWidth={2}
            ifOverflow="extendDomain"
            label="Monthly CO2 Emmissions"
            className="referenceLine"
          />

          <XAxis
            dataKey="date"
            interval={Number((graphData.length / 7).toFixed(0))}
            tickFormatter={(date) => {
              return dateUtils.unixToMonthYear(date);
            }}
            tickMargin="6"
          />

          <YAxis
            // domain={[0, domainMax]}
            type="number"
            dataKey="offset"
            axisLine={false}
            tickFormatter={(value) => `${value}kg`}
          />
          <Tooltip
            content={
              <GraphTooltip
                type="offset"
                monthlyEmissions={graphData.monthlyCO2Emmissions}
              />
            }
          />
          <CartesianGrid vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </StyledGraph>
  );
}