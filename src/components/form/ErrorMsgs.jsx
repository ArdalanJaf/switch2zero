import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
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
          if (found) msgs.push(found[pk]);
        });
      } else {
        msgs.push(errors[k]);
      }
    });
    return msgs;
  };

  msgs = getMsgs(errors, msgs);

  return (
    <Alert variant="danger">
      {msgs.map((m, i) => {
        return <ErrorMsg key={i} msg={m} />;
      })}
    </Alert>
  );
}
