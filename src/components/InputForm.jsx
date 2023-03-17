import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormCO2 from "./FormCO2";
import Form from "react-bootstrap/Form";
import FormTreePurchases from "./FormTreePurchases";
import Button from "react-bootstrap/Button";
import FormInflationRate from "./FormInflationRate";
import axios from "axios";
import { API_URL } from "../api/API_URL";

export default function InputForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const sendFormData = async () => {
    // make sure you turn annualCO2 into KG (*1000), sort, etc
    const formatFormForAPI = (form) => {
      return (form.annualCO2 = form.annualCO2 * 1000); // turn to kg
    };

    // send to API
    const result = await axios.post(API_URL + "/", formatFormForAPI(form));

    // handle errors || store data

    // console.log(annualCO2);
    console.log(formCheck(form));
  };

  // checks form input is valid
  const formCheck = (form) => {
    const copyPurchases = JSON.parse(JSON.stringify(form.purchases));
    let purchaseErrors = [];

    // if purchase data is invalid, addeds error object with purchase index and erroneous fields. eg. [{index:0, months: true}]
    copyPurchases.map((p, i) => {
      let pError = {};
      if (typeof p.month !== "number") pError.month = true;
      if (typeof p.year !== "number") pError.year = true;
      if (typeof p.trees !== "number") pError.trees = true;
      if (Object.keys(pError).length > 0) {
        pError.index = i;
        purchaseErrors.push(pError);
      }
    });

    let annualCO2Error =
      typeof form.annualCO2 === "number" && form.annualCO2 > 0 ? false : true; // false = no error

    return purchaseErrors.length < 1 && !annualCO2Error
      ? true // true = no errors
      : { annualCO2Error, purchaseErrors };
  };

  return (
    <Form>
      <FormCO2 />
      <FormTreePurchases />
      <FormInflationRate />
      <Button
        onClick={sendFormData}
        disabled={formCheck(form) === true ? false : true}
        size="lg"
        variant="success"
      >
        Submit
      </Button>
    </Form>
  );
}
