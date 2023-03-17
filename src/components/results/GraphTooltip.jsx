import numeral from "numeral";
import React from "react";
import { useSelector } from "react-redux";
import dateUtils from "../../utils/dateUtils";
import StyledGraphTooltip from "../../styles/GraphTooltip.Styled";

export default function GraphTooltip({ active, payload, label, type }) {
  const { monthlyCO2Emmissions } = useSelector((state) => state.data);

  if (active) {
    return (
      <div>
        <h5>{dateUtils.unixToMonth(label).substring(0, 3)}</h5>
        {type === "offset" && (
          <>
            <p>
              Offset:{" "}
              <span style={{ color: "#4188a4" }}>
                {payload[0].value} kgCO<sub>2</sub>{" "}
              </span>
            </p>
            <p>
              Emissions:{" "}
              <span style={{ color: "#c62c31" }}>
                {monthlyCO2Emmissions} kgCO<sub>2</sub>{" "}
              </span>
            </p>
          </>
        )}
        {/* : (
          <p>
            Cost:{" "}
            <span style={{ color: "#b88802" }}>
              ${numeral(payload[0].value).format("0,000,000.00")}
            </span>
          </p>
        )} */}
      </div>
    );
  }
}
