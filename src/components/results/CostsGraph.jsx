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
} from "recharts";
import GraphTooltip from "./GraphTooltip";
import dateUtils from "../../utils/dateUtils";
import centsToDollars from "../../utils/centsToDollars";
import StyledGraph from "../../styles/Graph.styled";

export default function CostsGraph() {
  const { graphData } = useSelector((state) => state.data);

  return (
    <div className="border-top pt-4 mb-4">
      <h4 className="text-center mb-0">Expenditure</h4>
      <StyledGraph>
        <ResponsiveContainer width="99%" height="99%">
          <AreaChart data={graphData}>
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="25%" stopColor="#0f8a3c" stopOpacity={1} />
                <stop offset="100%" stopColor="#4ddc2d" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area dataKey="cost" stroke="#e0a604" fill="url(#gradient)" />

            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                return dateUtils.unixToMonthYear(date);
              }}
              tickMargin="6"
            />

            <YAxis
              dataKey="cost"
              axisLine={false}
              tickLine={false}
              tickFormatter={(cost) => `$${centsToDollars(cost, "k")}`}
            />

            <Tooltip content={<GraphTooltip type="cost" />} />
            <CartesianGrid vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </StyledGraph>
    </div>
  );
}
