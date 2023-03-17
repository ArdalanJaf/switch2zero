import React from "react";
import { useSelector } from "react-redux";
import MainForm from "./components/form/MainForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Summary from "./components/results/Summary";

function App() {
  const data = useSelector((state) => state.data);
  const hasData = Object.keys(data).length > 0 ? true : false;
  return (
    <div className="App">
      <Container>
        <Row>
          <MainForm />
        </Row>
        {hasData && (
          <Row>
            <Summary />
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
