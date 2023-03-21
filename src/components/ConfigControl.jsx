import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig, setSetting, setShowConfig } from "../app/configSlice";
import axios from "axios";
import { API_URL } from "../api/API_URL";
import Login from "./Login";
import centsToDollars from "../utils/centsToDollars";
import objHasLength from "../utils/objHasLength";
import StyledPopout from "../styles/Popout.styled";
import { Card, Table, Form, Button, CloseButton } from "react-bootstrap";

export default function ConfigControl() {
  const dispatch = useDispatch();
  const { current, updates, login } = useSelector((state) => state.config);
  let configLoaded = objHasLength(current);

  const settings = [
    "Tree initial cost (US $)",
    "Tree upkeep cost (US $)",
    "Annual carbon offset of a fully grown tree (kg)",
    "Time for tree to fully grow (months)",
    "Maximum number of trees that can be purchased in 1 year",
    "Use fractional exponential to calculate offset of growing trees",
    "Apply inflation rate to upkeep cost",
  ];

  const needConverting = ["initial_cost", "upkeep_cost", "annual_offset"];

  const getConfigFromAPI = async () => {
    try {
      const res = await axios.get(API_URL + "/config", {
        headers: { token: login.token, userId: login.userId },
      });
      dispatch(setConfig(res.data.config));
    } catch (errors) {
      console.log(errors);
    }
  };

  const resetConfigOnAPI = async () => {
    try {
      await axios.post(API_URL + "/default_config", {
        headers: { token: login.token, userId: login.userId },
      });
      getConfigFromAPI();
    } catch (errors) {
      console.log(errors);
    }
  };

  const updateConfigOnAPI = async (config) => {
    // send updated config settings to API

    const prepConfig = (config) => {
      let newConfig = {};
      Object.keys(config).forEach((k) => {
        if (typeof config[k] === "number") {
          newConfig[k] = needConverting.includes(k)
            ? convertValues(config[k], k, true)
            : config[k];
        }
      });
      return newConfig;
    };

    try {
      const res = await axios.post(
        API_URL + "/update_config",
        prepConfig(config),
        {
          headers: { token: login.token, userId: login.userId },
        }
      );
      if (res.data.errors)
        return res.data.errors.forEach((e) => console.log("API Error: " + e));
      getConfigFromAPI();
    } catch (errors) {
      console.log(errors);
    }
  };

  const convertValues = (val, k, forAPI = false) => {
    // return user friendly display of values from API values or vice versa
    let newVal = val;

    // cents => dollars
    if (needConverting.slice(0, 2).includes(k)) {
      newVal = forAPI ? Number(val) * 100 : centsToDollars(val);
    }
    // g => kg
    if (k === needConverting[2]) {
      newVal = forAPI ? val * 1000 : val / 1000;
    }

    return newVal;
  };

  useEffect(() => {
    // get current config data on render
    if (login.token) getConfigFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <StyledPopout>
      <Card className="p-1">
        <div className="d-flex justify-content-end">
          <CloseButton onClick={() => dispatch(setShowConfig())} />
        </div>
        <h2 className="text-center">Admin Controls</h2>
        <Card.Body>
          {!login.token && <Login />}
          {login.token && !configLoaded && "Loading..."}
          {login.token && configLoaded && (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Setting</th>
                    <th>Current Value</th>
                    <th>New Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(current).map((k, i) => {
                    return (
                      <tr key={i}>
                        <td>{settings[i]}</td>
                        {i < 5 && (
                          <>
                            <td>{convertValues(current[k], k)}</td>
                            <td>
                              <Form.Control
                                value={updates[k]}
                                onChange={(e) => {
                                  dispatch(
                                    setSetting({
                                      key: k,
                                      value: Number(e.target.value),
                                    })
                                  );
                                }}
                                type="number"
                                aria-label="input new value"
                              />
                            </td>
                          </>
                        )}
                        {i >= 5 && (
                          <>
                            <td>{current[k] > 0 ? "True" : "False"}</td>
                            <td>
                              <Form.Check
                                key={i}
                                checked={updates[k] ? true : false}
                                type="switch"
                                onChange={() => {
                                  dispatch(
                                    setSetting({
                                      key: k,
                                      value: Number(updates[k] > 0 ? 0 : 1),
                                    })
                                  );
                                }}
                                aria-label="toggle on or off"
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="d-flex gap-1 justify-content-center ">
                <Button
                  onClick={() => updateConfigOnAPI(updates)}
                  size="md"
                  variant="primary"
                  className="shadow-md mt-2 fw-bold px-4"
                >
                  Submit
                </Button>
                <Button
                  onClick={resetConfigOnAPI}
                  size="md"
                  variant="secondary"
                  className="shadow-md mt-2 fw-bold px-4"
                >
                  Default
                </Button>
              </div>{" "}
            </>
          )}
        </Card.Body>
      </Card>
    </StyledPopout>
  );
}
