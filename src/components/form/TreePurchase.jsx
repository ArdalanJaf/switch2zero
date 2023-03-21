import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPurchase, delPurchase } from "../../app/formSlice";
import Form from "react-bootstrap/Form";
import { formErrorBorder } from "../../config/formErrorBorder";
import months from "../../config/months";
import years from "../../config/years";
import DeleteIcon from "../../assets/icons/DeleteIcon";

export default function TreePurchase({ index }) {
  const dispatch = useDispatch();
  const {
    purchases,
    controls: { errors },
  } = useSelector((state) => state.form);

  // needed because purchase errors are in an array
  const checkForErr = (errors, field, index) => {
    if (errors[field]) {
      return errors[field].find((err) => err.index === index);
    } else {
      return false;
    }
  };

  let err = checkForErr(errors, "purchases", index) || {
    month: "",
    year: "",
    trees: "",
  };

  return (
    <tr>
      {/* # */}
      <td>{index + 1}</td>

      {/* month & year */}
      <td className="d-flex tableFix">
        <div className="d-flex flex-column pe-2 flex-grow-1">
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
            aria-label="months"
            className={err.month && formErrorBorder}
          >
            <option value={""}>Month</option>
            {months.map((m, i) => (
              <option key={i} value={i}>
                {m.substring(0, 3)}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="d-flex flex-column flex-grow-1">
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
            className={err.year && formErrorBorder}
          >
            <option value={""}>Year</option>
            {years.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
        </div>
      </td>

      {/* number of trees */}
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
          className={err.trees && formErrorBorder}
        ></Form.Control>
      </td>

      {/* delete row */}
      <td>
        <div
          onClick={() => dispatch(delPurchase(index))}
          style={{ cursor: "pointer" }}
          aria-label="delete purchase"
        >
          <DeleteIcon />
        </div>
      </td>
    </tr>
  );
}
