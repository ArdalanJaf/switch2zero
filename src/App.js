import React from "react";
import { useSelector } from "react-redux";
import FormMain from "./components/form/FormMain";
import Summary from "./components/results/Summary";
// import { Container, Row, Col, Accordion } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OffsetGraph from "./components/results/OffsetsChart";

function App() {
  const data = useSelector((state) => state.data);
  const hasData = Object.keys(data).length > 0 ? true : false;
  return (
    <div className="App bg-light" style={{ minWidth: "100vh" }}>
      <Container fluid className="p-4">
        <Row>
          <Col md={6}>
            {" "}
            <div className="bg-light rounded-5 p-3">
              <FormMain />
            </div>
          </Col>
          {/* </Row> */}
          {hasData && (
            // <Row>
            <Col>
              <Summary />
              <OffsetGraph />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
