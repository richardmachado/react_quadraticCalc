import React, { useState } from "react";
import styled from "styled-components";

import "./styles.css";

const Page = styled.div`
  box-sizing: border-box;
`;

// const MainBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   //border: 9px solid red;
// `;

const Label = styled.label`
  //border: 3px solid green;
  //width: 12;
  font-size:18px;
 background-color: blue;
`;
const Heading = styled.h1`
   margin: auto;
  width: 50%;
 // border: 3px solid green;
  padding: 10px;
`;
export default  function App() {

  const [a, setNum1] = useState(1);
  const [b, setNum2] = useState(1);
  const [c, setNum3] = useState(-56);
  const [plus, setPlus] = useState(0);
  const [minus, setMinus] = useState(0);


  const fourAC = 4 * a * c;
  const squareRoot = Math.sqrt((b * b) - fourAC);
  const plusTotal = ((b * -1) + squareRoot) / (2 * a);
  const minusTotal = ((b * -1) - squareRoot) / (2 * a);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPlus(plusTotal);
    setMinus(minusTotal);
  };
  return (
    <Page className="App-header">
      <Heading> Testing : Enter quadratic equation Ax² + Bx + C</Heading>
      <form className="form" onSubmit={handleSubmit}>
        <Label>A</Label>
        <input
          // className="input"
          type="number"
          value={a}
          onChange={(event) => setNum1(event.target.value)}
        />
        <Label>B</Label>
        <input
          // className="input"
          type="number"
          value={b}
          onChange={(event) => setNum2(event.target.value)}
        />
        <Label>C</Label>
        <input
          //className="input"
          type="number"
          value={c}
          onChange={(event) => setNum3(event.target.value)}
        />
        <button className="button" type="submit">
          Get Zeroes
        </button>
        <b>
          {isNaN(plus) ? (
            <p>Not a valid equation </p>
          ) : (
            <>
        
              <div>x = {plus}</div>
              <div>x = {minus}</div>
            </>
          )}
        </b>
      </form>
    </Page>
  );
  ;
};


