import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { avgAnnualCO2ByCountry } from "../config/avgAnnualCO2ByCountry";
import { setInflationRate, setCustomCo2 } from "../app/formSlice";
import Form from "react-bootstrap/Form";
import { formErrorBorder } from "../config/formErrorBorder";

export default function FormInflationRate() {
  const dispatch = useDispatch();
  const { inflationRate, controls } = useSelector((state) => state.form);

  return (
    <Form.Group className="mb-1">
      <h5>Inflation (optional)</h5>
      <Form.Text className="d-block mb-2">
        Add in inflation rate which will annually increase the cost of planting
        new trees.
      </Form.Text>

      <Form.Label>
        Rate (%):
        <Form.Control
          value={inflationRate}
          onChange={(e) => {
            dispatch(setInflationRate(Number(e.target.value)));
          }}
          type="number"
          className={controls.errors.inflationRate && formErrorBorder}
        />
      </Form.Label>
    </Form.Group>
  );
}
