import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { avgAnnualCO2ByCountry } from "../config/avgAnnualCO2ByCountry";
import { setAnnualCO2, setCustomCo2 } from "../app/formSlice";
import Form from "react-bootstrap/Form";

export default function FormCO2() {
  const dispatch = useDispatch();
  const { annualCO2, controls } = useSelector((state) => state.form);

  return (
    <>
      <Form.Group>
        <p>
          Select the country you live in to determine your average annual CO2
          output or input custom value:
        </p>
        <div>
          <Form.Label>
            Country:
            <Form.Select
              onChange={(e) => dispatch(setAnnualCO2(Number(e.target.value)))}
              disabled={controls.customCo2 ? true : false}
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
            Annual CO2 Output (metric tons):
            <Form.Control
              value={annualCO2}
              onChange={(e) => {
                e.target.value.length > 0
                  ? dispatch(setCustomCo2(true))
                  : dispatch(setCustomCo2(false)); // this could be more efficient by first checking if it needs to be changed, but negligible.
                dispatch(setAnnualCO2(Number(e.target.value)));
              }}
              type="number"
            />
          </Form.Label>
        </div>
      </Form.Group>
    </>
  );
}
