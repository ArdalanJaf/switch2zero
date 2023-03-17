import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, clearErrors } from "../app/formSlice";
import FormCO2 from "./FormCO2";
import Form from "react-bootstrap/Form";
import FormTreePurchases from "./FormTreePurchases";

import Button from "react-bootstrap/Button";
import FormInflationRate from "./FormInflationRate";
import ErrorMsgs from "./ErrorMsgs";

import axios from "axios";
import { API_URL } from "../api/API_URL";

export default function InputForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const errors = form.controls.errors;

  const handleClick = async () => {
    dispatch(clearErrors());
    sendFormData();
  };

  const sendFormData = async () => {
    // make sure you turn annualCO2 into KG (*1000), sort, etc
    const formatFormForAPI = (form) => {
      const formatedForm = JSON.parse(JSON.stringify(form));
      delete formatedForm.controls;
      formatedForm.annualCO2 = formatedForm.annualCO2 * 1000; // turn to kg
      return formatedForm;
    };

    // console.log(formatFormForAPI(form));

    // send to API
    const res = await axios.post(API_URL + "/", formatFormForAPI(form));
    console.log(res.data.result);
    if (res.data.result.errors)
      return dispatch(setErrors(res.data.result.errors));

    // handle errors || store data
  };

  const checkForErr = (errors, field = false, index = false) => {
    if (errors[field]) {
      return errors[field].find((err) => err.index === index);
    } else {
      return false;
    }
  };

  let hasErrs = Object.entries(errors).length > 0;

  return (
    <Form>
      <FormCO2 />
      <FormTreePurchases />
      <FormInflationRate />
      {hasErrs && <ErrorMsgs />}
      <div className="d-grid gap-2 mt-3">
        <Button
          onClick={handleClick}
          size="lg"
          variant="success"
          className="shadow-lg"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
