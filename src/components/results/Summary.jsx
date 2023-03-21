import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import dateUtils from "../../utils/dateUtils";
import centsToDollars from "../../utils/centsToDollars";

export default function Summary() {
  const {
    totalTime,
    totalTrees,
    costs: { initial, upkeep, ongoingUpkeep },
    treesNeeded,
    carbonNeutralDate,
    monthlyCO2Offset,
    monthlyCO2Emmissions,
  } = useSelector((state) => state.data);
  const { unixToMonth, unixToYear } = dateUtils;

  const hasNeutral = carbonNeutralDate === null ? false : true;

  const alertColor = hasNeutral ? "success" : "danger";

  return (
    <div className="">
      <ul className="ps-0" style={{ listStyle: "none" }}>
        <li className="mb-3">
          <Alert variant={`${alertColor} shadow-sm`}>
            {hasNeutral &&
              `You will achieve carbon neutrality in  ${unixToMonth(
                carbonNeutralDate
              )} ${unixToYear(carbonNeutralDate)} with ${
                totalTrees + treesNeeded
              } trees planted!`}
            {!hasNeutral &&
              `You have not planted enough trees to achieve carbon neutrality. You need to purchase at least ${treesNeeded} more trees.`}
          </Alert>
        </li>

        <li className="mb-3">
          <Alert variant={`${alertColor} shadow-sm`}>
            {hasNeutral &&
              `Your monthly maintanence cost at this point is USD${centsToDollars(
                ongoingUpkeep
              )}.`}{" "}
            {!hasNeutral &&
              `Your monthly maintance cost at this point is USD ${centsToDollars(
                ongoingUpkeep
              )}. With which you only offset ${(
                (monthlyCO2Offset / monthlyCO2Emmissions) *
                100
              ).toFixed(2)}% of your CO2 emissions.`}
          </Alert>
        </li>

        <li className="mb-3 ">
          <Alert variant={`${alertColor} shadow-sm`}>
            Your estimated expenditure over {totalTime.years} years
            {totalTime.months > 0 &&
              " " +
                totalTime.months +
                " month" +
                (totalTime.months > 1 ? "s" : "")}{" "}
            is USD {centsToDollars(initial + upkeep)}. This compromises USD{" "}
            {centsToDollars(initial)} in initial purchase costs and USD{" "}
            {centsToDollars(upkeep)} in maintenence fees.
          </Alert>
        </li>
      </ul>
    </div>
  );
}
