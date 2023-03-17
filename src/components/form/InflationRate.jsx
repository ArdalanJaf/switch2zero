import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { setInflationRate } from "../../app/formSlice";
import { formErrorBorder } from "../../config/formErrorBorder";

export default function InflationRate() {
  const dispatch = useDispatch();
  const { inflationRate, controls } = useSelector((state) => state.form);

  return (
    <Form.Group className="mb-3 py-3 border-top border-bottom ">
      <h4>Inflation (optional)</h4>
      <p className="d-block mb-2">
        Add in inflation rate which will annually increase the cost of planting
        new trees.
      </p>

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
