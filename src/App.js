import React, { useState } from "react";
import styled from "styled-components";

import "./styles.css";

const Page = styled.div`
  box-sizing: border-box;
  background-color: #b0bed6;
`;

const Header = styled.h1`
  margin: auto;
  width: 50%;
  // border: 3px solid green;
  padding: 10px;
`;

const Label = styled.label`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.25;
`;

const Invalid = styled.p`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.25;
`;
const Responses = styled.p`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.25;
`;

export default function App() {
  const [a, setNum1] = useState(1);
  const [b, setNum2] = useState(1);
  const [c, setNum3] = useState(-56);
  const [plus, setPlus] = useState(0);
  const [minus, setMinus] = useState(0);

  if (a > 0 && c > 0) {
    setNum3(c * -1);
  }
  if (a < 0 && c < 0) {
    setNum3(c * -1);
  }
  const fourAC = 4 * a * c;
  const squareRoot = Math.sqrt(b * b - fourAC);
  const plusTotal = (b * -1 + squareRoot) / (2 * a);
  const minusTotal = (b * -1 - squareRoot) / (2 * a);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPlus(plusTotal);
    setMinus(minusTotal);
  };
  return (
    <Page className="App-header">
      <Header> Enter quadratic equation Ax² + Bx + C</Header>
      <form className="form" onSubmit={handleSubmit}>
        <Label>A</Label>
        <input
          // className="input"
          type="number"
          value={a}
          onChange={(e) => setNum1((e = e.target.value))}
        />
        <Label>B</Label>
        <input
          // className="input"
          type="number"
          value={b}
          onChange={(e) => setNum2(e.target.value)}
        />
        <Label>C</Label>
        <input
          //className="input"
          type="number"
          value={c}
          onChange={(e) => setNum3(e.target.value)}
        />
        <button className="button" type="submit">
          Get Zeroes
        </button>
        <b>
          {isNaN(plus) ? (
            <Invalid>A and C must have opposite signs </Invalid>
          ) : (
            <>
              <Responses>x = {plus}</Responses>
              <Responses>x = {minus}</Responses>
            </>
          )}
        </b>
      </form>
    </Page>
  );
}
