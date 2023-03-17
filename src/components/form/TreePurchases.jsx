import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPurchase } from "../../app/formSlice";
import FormTreePurchase from "./TreePurchase";
import { Table, Form, Button } from "react-bootstrap";

export default function TreePurchases() {
  const dispatch = useDispatch();
  const { purchases } = useSelector((state) => state.form);
  let totalTrees = 0;
  purchases.map((p) => (totalTrees += Number(p.trees)));

  return (
    <>
      <Form.Group className="mb-4 border-top pt-3">
        <h4>Tree Purchases</h4>
        <p className="d-block mb-2">
          Plan your tree purchases by adding a purchase at different times. You
          may only purchase a maximum of 55 trees per year.
        </p>
        <Table className="mb-1">
          <thead>
            <tr>
              <th>#</th>
              <th>Month & Year</th>
              <th>Number of Trees</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, i) => {
              return <FormTreePurchase key={i} treePurchase={p} index={i} />;
            })}
            <tr>
              <td />
              <td />
              <td>
                <span className="ms-2 ">Total: {totalTrees}</span>{" "}
              </td>
              <td />
            </tr>
          </tbody>
        </Table>
        <Button
          variant="success"
          onClick={() => dispatch(addPurchase())}
          className="shadow-md fw-bold w-25 text-light "
          size="sm"
          // style={{ marginTop: "-1em" }}
        >
          Add purchase
        </Button>
      </Form.Group>
    </>
  );
}
