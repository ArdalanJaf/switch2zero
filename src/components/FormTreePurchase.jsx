import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPurchase, delPurchase } from "../app/formSlice";
import months from "../config/months";
import years from "../config/years";
import DeleteIcon from "../assets/icons/DeleteIcon";
import Form from "react-bootstrap/Form";

export default function FormTreePurchase({ treePurchase, index }) {
  const dispatch = useDispatch();
  const { purchases } = useSelector((state) => state.form);

  return (
    <tr>
      <td>{index + 1}</td>
      <td className="d-flex">
        <Form.Select
          value={purchases[index].month}
          onChange={(e) =>
            dispatch(
              setPurchase({
                index,
                key: "month",
                value: Number(e.target.value),
              })
            )
          }
          className="me-2"
          aria-label="months"
        >
          <option value={""}>Month</option>
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          value={purchases[index].year}
          onChange={(e) =>
            dispatch(
              setPurchase({
                index,
                key: "year",
                value: Number(e.target.value),
              })
            )
          }
          aria-label="year"
        >
          <option value={""}>Year</option>
          {years.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Control
          value={purchases[index].trees}
          type="number"
          min="0"
          onChange={(e) =>
            dispatch(
              setPurchase({
                index,
                key: "trees",
                value: Number(e.target.value),
              })
            )
          }
          aria-label="Number of trees"
        ></Form.Control>
      </td>
      <td>
        <div
          onClick={() => dispatch(delPurchase(index))}
          style={{ cursor: "pointer" }}
        >
          <DeleteIcon />
        </div>
      </td>
    </tr>
  );
}
