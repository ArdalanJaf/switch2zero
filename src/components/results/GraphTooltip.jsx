import numeral from "numeral";
import React from "react";
import { useSelector } from "react-redux";
import dateUtils from "../../utils/dateUtils";
import StyledGraphTooltip from "../../styles/GraphTooltip.Styled";
import { Alert } from "react-bootstrap";
import styled from "styled-components";

const StyledTooltip = styled.div`
  font-weight: 600;
  background-color: #f5f5f57a;
  ul {
    list-style: none;
  }

  li:nth-of-type(2) span {
    color: #dc3545;
  }

  span:last-of-type {
    color: #1c99ff;
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
              <span> Emissions:</span> {monthlyCO2Emmissions} kgCO<sub>2</sub>{" "}
            </li>
            <li>
              <span>Offset:</span> {payload[0].value} kgCO<sub>2</sub>{" "}
            </li>
          </ul>
        )}

        {/* : (
          <p>
            Cost:{" "}
            <span style={{ color: "#b88802" }}>
              ${numeral(payload[0].value).format("0,000,000.00")}
            </span>
          </p>
        )} */}
      </StyledTooltip>
    );
  }
}
