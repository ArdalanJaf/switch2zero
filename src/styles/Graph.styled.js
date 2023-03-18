import styled from "styled-components";

const StyledGraph = styled.div`
  padding: 0.5em;
  padding-top: 1.5em;
  border-radius: 5px;
  height: 300px;

  text {
    font-size: 0.9em;
  }

  .referenceLine {
    z-index: 100;
    font-size: 1.3em;
    tspan {
      fill: #000 !important;
    }
  }
`;

export default StyledGraph;
