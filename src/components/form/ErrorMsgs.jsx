import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

function ErrorMsg({ msg }) {
  return (
    <Form.Text className="text-danger text-center d-block fw-bold">
      {msg}
    </Form.Text>
  );
}

export default function ErrorMsgs() {
  const { errors } = useSelector((state) => state.form.controls);
  let msgs = [];

  const getMsgs = (errors) => {
    let msgs = [];
    Object.keys(errors).forEach((k) => {
      if (k === "purchases") {
        let pKeys = ["month", "year", "trees"];
        pKeys.forEach((pk) => {
          let found = errors.purchases.find((p) => {
            return Object.keys(p).includes(pk) === true;
          });
          // console.log(pk);
          if (found) msgs.push(found[pk]);
        });
      } else {
        msgs.push(errors[k]);
      }
    });
    return msgs;
  };

  msgs = getMsgs(errors, msgs);
  // console.log(getMsgs(errors));
  // let treesMsg = errors.purchases.find((e)=>e)

  return (
    <Alert variant="danger">
      {msgs.map((m, i) => {
        return <ErrorMsg key={i} msg={m} />;
      })}
    </Alert>
  );
}
