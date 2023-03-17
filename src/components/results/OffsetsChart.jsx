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

  return (
    <div className="border-top pt-4 mb-4">
      <h4 className="text-center mb-0">
        CO<sub>2</sub> Offset
      </h4>
      <StyledGraph>
        <ResponsiveContainer width="99%" height="99%">
          <AreaChart data={graphData}>
            <defs>
              <linearGradient id="offsetGradient" x1="1" x2="0" y1="0" y2="0">
                <stop offset="15%" stopColor="#2ed4e7" stopOpacity={1} />
                <stop offset="35%" stopColor="#1c99ff" stopOpacity={1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="offset"
              stroke="#008bfc"
              fill="url(#offsetGradient)"
              fillOpacity={1}
            />

            <XAxis
              dataKey="date"
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

            <ReferenceLine
              y={monthlyCO2Emmissions}
              stroke="#dc3545"
              strokeWidth={2}
              // ifOverflow="extendDomain"
              className="referenceLine"
              label="Monthly CO2 Emmissions"
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
    </div>
  );
}

function ReferenceLineLabel() {
  return <div></div>;
}
