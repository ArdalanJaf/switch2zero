import styled from "styled-components";

const StyledGraph = styled.div`
  background-color: #fff;
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
    font-size: 0.7em;
    tspan {
      /* rotate: 90; */
    }
  }

  .referenceLine {
    z-index: 100;
    font-size: 1.5em;
    color: black;
  }
`;

export default StyledGraph;
