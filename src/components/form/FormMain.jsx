import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  clearErrors,
  sortPurchasesByDate,
} from "../../app/formSlice";
import { setData } from "../../app/dataSlice";
import FormCO2 from "./CO2";
import FormTreePurchases from "./TreePurchases";
import FormInflationRate from "./InflationRate";
import ErrorMsgs from "./ErrorMsgs";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../api/API_URL";
import formatFormForAPI from "../../utils/formatFormForAPI";
import objHasLength from "../../utils/objHasLength";

export default function FormMain() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const handleClick = async () => {
    dispatch(clearErrors());
    sendFormData();
  };

  const sendFormData = async () => {
    try {
      // sort purchases (for user experience only)
      dispatch(sortPurchasesByDate());

      // send to API
      const res = await axios.post(API_URL + "/", formatFormForAPI(form));

      console.log(res.data.result);

      // handle errors || store data
      if (res.data.result.errors)
        return dispatch(setErrors(res.data.result.errors));

      return dispatch(setData(res.data.result));
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <Form>
      <FormCO2 />
      <FormTreePurchases />
      <FormInflationRate />
      {objHasLength(form.controls.errors) && <ErrorMsgs />}
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
