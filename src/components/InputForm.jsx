import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormCO2 from "./FormCO2";
import { avgAnnualCO2ByCountry } from "../config/avgAnnualCO2ByCountry";
import { setCO2Con, setCustomCo2 } from "../app/formSlice";
import Form from "react-bootstrap/Form";
import FormTreePurchases from "./FormTreePurchases";

export default function InputForm() {
  const dispatch = useDispatch();
  const { co2Consumption, controls } = useSelector((state) => state.form);

  return (
    <Form>
      <FormCO2 />
      <FormTreePurchases />
    </Form>
  );
}
