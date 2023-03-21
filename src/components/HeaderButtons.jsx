import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../app/dataSlice";
import { loadForm } from "../app/formSlice";
import { Button, Form, CloseButton, Table } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../api/API_URL";
import { setShowConfig } from "../app/configSlice";
import formatFormForAPI from "../utils/formatFormForAPI";
import objHasLength from "../utils/objHasLength";
import dateUtils from "../utils/dateUtils";
import StyledPopout from "../styles/Popout.styled";

export default function HeaderButtons({ hasData }) {
  const dispatch = useDispatch();
  const { data, form } = useSelector((state) => state);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [saveList, setSaveList] = useState("");

  const getSavesListFromAPI = async () => {
    try {
      let result = await axios.get(API_URL + "/get_saves_list");
      console.log(result.data.saveList);
      return setSaveList(result.data.saveList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loadingOpen) getSavesListFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingOpen]);

  const saveToAPI = async () => {
    try {
      let result = await axios.post(API_URL + "/save", {
        name: saveName,
        formData: formatFormForAPI(form),
        resultData: data,
      });

      if (result.data.status === 1) {
        setSaveName("");
        setSaveOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoad = async (id) => {
    try {
      let result = await axios.post(API_URL + "/load", { id: id });
      const { loaded } = result.data;

      Object.keys(loaded).forEach((k) => {
        loaded[k] = JSON.parse(loaded[k]);
      });
      console.log("Simulator configuration: ", loaded.config);
      dispatch(setData(loaded.data));
      dispatch(loadForm(loaded.form));
      setLoadingOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(API_URL + "/delete", { id: id });
      getSavesListFromAPI();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center gap-1">
      {objHasLength(data) && (
        <Button onClick={() => setSaveOpen(true)}>Save</Button>
      )}
      {saveOpen && (
        <StyledPopout className="bg-light p-3 rounded border">
          <div className="d-flex justify-content-end">
            <CloseButton
              onClick={() => {
                setSaveName("");
                setSaveOpen(false);
              }}
            />
          </div>
          <Form.Group>
            <Form.Label>
              Name:{" "}
              <Form.Control onChange={(e) => setSaveName(e.target.value)} />
            </Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-center mt-2">
            <Button
              onClick={() => saveToAPI()}
              disabled={saveName.length ? false : true}
            >
              Save
            </Button>
          </div>
        </StyledPopout>
      )}
      <Button onClick={() => setLoadingOpen(true)}>Load</Button>
      {loadingOpen && (
        <StyledPopout className="bg-light p-3 rounded border">
          <div className="d-flex justify-content-end">
            <CloseButton
              onClick={() => {
                setLoadingOpen(false);
              }}
            />
          </div>
          {!saveList && <p>Loading...</p>}
          {saveList && !saveList.length && <p>There are no saved files.</p>}
          {saveList && saveList.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Saved</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {saveList.map((s) => {
                  return (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{dateUtils.dateToLocalString(s.dateSaved)}</td>
                      <td>
                        <Button size="sm" onClick={() => handleLoad(s.id)}>
                          Load
                        </Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(s.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </StyledPopout>
      )}

      <Button onClick={() => dispatch(setShowConfig())}>Admin Controls</Button>
    </div>
  );
}
