import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowConfig } from "./app/configSlice";
import FormMain from "./components/form/FormMain";
import Summary from "./components/results/Summary";
import TreeIcon from "./assets/icons/TreeIcon";
import OffsetGraph from "./components/results/OffsetsChart";
import CostsGraph from "./components/results/CostsGraph";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ConfigControl from "./components/ConfigControl";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const hasData = Object.keys(data).length > 0 ? true : false;
  const showConfig = useSelector((state) => state.config.showConfig);
  return (
    <div className="App bg-light" style={{ minWidth: "100vh" }}>
      <Row>
        <Col className="d-flex p-2 mx-3  mt-1 justify-content-between">
          <div className="d-flex align-items-center">
            <TreeIcon />
            <h1 className="m-0 ms-1 fw-light text-muted">
              Carbon Offset Calculator
            </h1>
          </div>
          <div className="d-flex align-items-center">
            <Button onClick={() => dispatch(setShowConfig())}>
              Admin Controls
            </Button>
          </div>
        </Col>
      </Row>
      <Container fluid className="">
        {showConfig && <ConfigControl />}

        <Row>
          <Col md={6}>
            <div className="shadow p-4 rounded">
              <FormMain />
            </div>
          </Col>
          {hasData && (
            <Col md={6} className="border-left">
              <div className="shadow p-4  rounded">
                <Summary />
                <OffsetGraph />
                <CostsGraph />
              </div>
            </Col>
          )}
        </Row>
        <footer className="text-center mb-1 mt-5">© Ardalan Al-Jaf 2023</footer>
      </Container>
    </div>
  );
}

export default App;
