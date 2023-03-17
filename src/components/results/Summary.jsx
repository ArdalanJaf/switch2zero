import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import dateUtils from "../../utils/dateUtils";
import numeral from "numeral";

export default function Summary() {
  const {
    totalTime,
    totalTrees,
    costs,
    treesNeeded,
    carbonNeutralDate,
    monthlyCO2Offset,
    monthlyCO2Emmissions,
  } = useSelector((state) => state.data);

  const hasNeutral = carbonNeutralDate === null ? false : true;

  let initial = costs.initial / 100;
  let upkeep = costs.upkeep / 100;
  let ongoingUpkeep = costs.ongoingUpkeep / 100;

  return (
    <div>
      <Alert variant="info">
        <ul>
          <li className="mb-3">
            {hasNeutral &&
              `You will achieve carbon neutrality in ${dateUtils.unixToMonth(
                carbonNeutralDate
              )} ${dateUtils.unixToYear(carbonNeutralDate)} with ${
                totalTrees + treesNeeded
              } planted!`}
            {!hasNeutral &&
              `You have not planted enough trees to achieve carbon neutrality. You need to purchase at least ${treesNeeded} more trees.`}
          </li>
          <li className="mb-3">
            {hasNeutral &&
              `Your monthly maintanence cost at this point is USD ${numeral(
                ongoingUpkeep
              ).format("0,000,000.00")}.`}{" "}
            {!hasNeutral &&
              `Your monthly maintance cost at this point is USD ${numeral(
                ongoingUpkeep
              ).format("0,000,000.00")}. With which you only offset ${(
                (monthlyCO2Offset / monthlyCO2Emmissions) *
                100
              ).toFixed(2)}% of your CO2 emissions.`}
          </li>
          <li className="mb-3">
            Your estimated expenditure over {totalTime.years} years{" "}
            {totalTime.months > 0 &&
              totalTime.months +
                " month" +
                (totalTime.months > 1 ? "s" : "")}{" "}
            is USD {numeral(initial + upkeep).format("0,000,000.00")}. This
            compromises USD {numeral(initial).format("0,000,000.00")} in initial
            purchase costs and USD {numeral(upkeep).format("0,000,000.00")} in
            maintenence fees.
          </li>
        </ul>
      </Alert>
    </div>
  );
}
