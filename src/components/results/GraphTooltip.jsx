import React from "react";
import { useSelector } from "react-redux";
import dateUtils from "../../utils/dateUtils";
import centsToDollars from "../../utils/centsToDollars";
import styled from "styled-components";

const StyledTooltip = styled.div`
  font-weight: 600;
  background-color: #f5f5f599;
  ul {
    list-style: none;
  }

  .co2Span {
    color: #dc3545;
  }

  .offsetSpan {
    color: #1c99ff;
  }

  .costSpan {
    color: #227f22;
  }
`;

export default function GraphTooltip({ active, payload, label, type }) {
  const { monthlyCO2Emmissions } = useSelector((state) => state.data);

  if (active) {
    return (
      <StyledTooltip className="rounded p-2">
        {type === "offset" && (
          <ul className="list-group list-group-flush">
            <li>{dateUtils.unixToMonthYear(label)}</li>

            <li>
              <span className="co2Span"> Emissions:</span>{" "}
              {monthlyCO2Emmissions} kgCO<sub>2</sub>{" "}
            </li>
            <li>
              <span className="offsetSpan">Offset:</span> {payload[0].value}{" "}
              kgCO<sub>2</sub>{" "}
            </li>
          </ul>
        )}

        {type === "cost" && (
          <ul className="list-group list-group-flush">
            <li>{dateUtils.unixToMonthYear(label)}</li>
            <li>
              <span className="costSpan"> Cost:</span> USD{" "}
              {centsToDollars(payload[0].value)}
            </li>
          </ul>
        )}
      </StyledTooltip>
    );
  }
}
