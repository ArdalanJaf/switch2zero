import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPurchase } from "../app/formSlice";
import FormTreePurchase from "./FormTreePurchase";
import Table from "react-bootstrap/table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function FormTreePurchases() {
  const dispatch = useDispatch();
  const { purchases } = useSelector((state) => state.form);
  let totalTrees = 0;
  purchases.map((p) => (totalTrees += Number(p.trees)));

  return (
    <>
      <Form.Group className="mb-4">
        <h4>Tree Purchases</h4>
        <Form.Text className="d-block mb-2">
          Plan your tree purchases by adding a purchase at different times. You
          may only purchase a maximum of 55 trees per year.
        </Form.Text>
        <Table>
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
              <td>Total: {totalTrees} </td>
              <td />
            </tr>
          </tbody>
        </Table>
        <Button
          variant="primary"
          size="sm"
          onClick={() => dispatch(addPurchase())}
        >
          Add purchase
        </Button>
      </Form.Group>
    </>
  );
}
