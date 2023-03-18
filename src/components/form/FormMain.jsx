import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, clearErrors } from "../../app/formSlice";
import { setData } from "../../app/dataSlice";
import FormCO2 from "./CO2";
import FormTreePurchases from "./TreePurchases";
import FormInflationRate from "./InflationRate";
import ErrorMsgs from "./ErrorMsgs";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../api/API_URL";

export default function FormMain() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const errors = form.controls.errors;

  const handleClick = async () => {
    dispatch(clearErrors());
    sendFormData();
  };

  const sendFormData = async () => {
    try {
      // turn annualCO2 into KG (*1000) and remove controls
      const formatFormForAPI = (form) => {
        const formatedForm = JSON.parse(JSON.stringify(form));
        delete formatedForm.controls;
        formatedForm.annualCO2 = formatedForm.annualCO2 * 1000; // turn to kg
        return formatedForm;
      };

      // send to API
      const res = await axios.post(API_URL + "/", formatFormForAPI(form));

      // handle errors || store data
      if (res.data.result.errors)
        return dispatch(setErrors(res.data.result.errors));
      return dispatch(setData(res.data.result));
    } catch (errors) {
      console.log(errors);
    }
  };

  let hasErrs = Object.entries(errors).length > 0;

  return (
    <Form>
      <FormCO2 />
      <FormTreePurchases />
      <FormInflationRate />
      {hasErrs && <ErrorMsgs />}
      <div className="d-grid gap-2 mt-3 ">
        <Button
          onClick={handleClick}
          size="lg"
          variant="primary"
          className="shadow-lg mt-2 fw-bold"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
