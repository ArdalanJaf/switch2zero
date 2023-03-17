import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { avgAnnualCO2ByCountry } from "../config/avgAnnualCO2ByCountry";
import { setInflationRate, setCustomCo2 } from "../app/formSlice";
import Form from "react-bootstrap/Form";

export default function FormInflationRate() {
  const dispatch = useDispatch();
  const { inflationRate, controls } = useSelector((state) => state.form);

  return (
    <Form.Group className="mb-5">
      <h4>Interest Rate (optional)</h4>
      <Form.Text className="d-block mb-2">
        Add in inflation rate which will annually increase the cost of planting
        new trees (but not the upkeep), otherwise leave empty.
      </Form.Text>
      <div>
        <Form.Label>
          Inflation rate (%):
          <Form.Control
            value={inflationRate}
            onChange={(e) => {
              dispatch(setInflationRate(Number(e.target.value)));
            }}
            type="number"
          />
        </Form.Label>
      </div>
    </Form.Group>
  );
}
