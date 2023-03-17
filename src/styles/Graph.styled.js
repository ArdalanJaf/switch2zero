import styled from "styled-components";

const StyledGraph = styled.div`
  /* background-color: #fff; */
  padding: 0.5em;
  padding-top: 1.5em;
  border-radius: 5px;
  /* width: 100%; */
  /* min-height: 400px; */
  height: 300px;
  /* max-width: 700px; */
  /* max-width:  */

  /* @media (max-width: ${({ theme }) => theme.mobile}) {
  } */

  text {
    font-size: 0.8em;
  }

  .referenceLine {
    z-index: 100;
    font-size: 1.5em;
    tspan {
      /* fill: black !important;
      stroke: black !important; */
    }
  }
`;

export default StyledGraph;
