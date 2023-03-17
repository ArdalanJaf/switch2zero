import React from "react";
import InputForm from "./components/InputForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <InputForm />
        </Row>
      </Container>
    </div>
  );
}

export default App;
