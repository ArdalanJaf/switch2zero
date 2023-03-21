import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnnualCO2, setCustomCo2 } from "../../app/formSlice";
import Form from "react-bootstrap/Form";
import { formErrorBorder } from "../../config/formErrorBorder";
import { avgAnnualCO2ByCountry } from "../../config/avgAnnualCO2ByCountry";

export default function CO2() {
  const dispatch = useDispatch();
  const { annualCO2, controls } = useSelector((state) => state.form);

  return (
    <Form.Group className="mb-3">
      <h4>Annual CO2 Emmissions</h4>
      <p className="d-block mb-2">
        Select the country you live in to determine your average annual CO2
        output or input custom value.
      </p>
      <div>
        <Form.Label className="me-2">
          Country:
          <Form.Select
            onChange={(e) => dispatch(setAnnualCO2(Number(e.target.value)))}
            disabled={controls.customCo2 ? true : false}
            value={annualCO2}
          >
            <option value={""}>Select country</option>
            {avgAnnualCO2ByCountry.map((c, i) => {
              return (
                <option key={i} value={c.annualCO2PerCapita}>
                  {c.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Label>

        <Form.Label>
          Annual CO2 (metric tons):
          <Form.Control
            value={annualCO2}
            onChange={(e) => {
              e.target.value.length > 0
                ? dispatch(setCustomCo2(true))
                : dispatch(setCustomCo2(false)); // this could be more efficient by first checking if it needs to be changed, but negligible.
              dispatch(setAnnualCO2(Number(e.target.value)));
            }}
            type="number"
            className={controls.errors.annualCO2 && formErrorBorder}
          />
        </Form.Label>
      </div>
    </Form.Group>
  );
}
