import React from "react";
import { useSelector } from "react-redux";
import FormMain from "./components/form/FormMain";
import Summary from "./components/results/Summary";
import TreeIcon from "./assets/icons/TreeIcon";
import OffsetGraph from "./components/results/OffsetsChart";
import CostsGraph from "./components/results/CostsGraph";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ConfigControl from "./components/ConfigControl";

function App() {
  const data = useSelector((state) => state.data);
  const hasData = Object.keys(data).length > 0 ? true : false;
  return (
    <div className="App bg-light" style={{ minWidth: "100vh" }}>
      <Row>
        <Col className="d-flex p-2 mx-3 align-items-center mt-3">
          <TreeIcon />
          <h1 className="m-0 ms-1 fw-light text-muted">
            Carbon Offset Calculator
          </h1>
        </Col>
      </Row>
      <Container fluid className="">
        <ConfigControl />

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
