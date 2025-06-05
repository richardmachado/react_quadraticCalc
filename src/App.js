import React, { useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import "./styles.css";

// Styled Components
const Page = styled.div`
  box-sizing: border-box;
  background-color: #9fc5cc;
  min-height: 100vh;
  padding: 2rem;
`;

const Header = styled.h1`
  margin: auto;
  width: 80%;
  padding: 1rem;
  text-align: center;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  display: block;
  margin: 0.75rem 0 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const Response = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.5rem 0;
`;

const Invalid = styled(Response)`
  color: red;
`;

export default function App() {
  const [coefA, setCoefA] = useState("1");
  const [coefB, setCoefB] = useState("1");
  const [coefC, setCoefC] = useState("-56");
  const [root1, setRoot1] = useState(null);
  const [root2, setRoot2] = useState(null);
  const [graphData, setGraphData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const a = parseFloat(coefA);
    const b = parseFloat(coefB);
    const c = parseFloat(coefC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      setRoot1(null);
      setRoot2(null);
      setGraphData([]);
      return;
    }

    const discriminant = b ** 2 - 4 * a * c;

    if (discriminant < 0) {
      setRoot1(NaN);
      setRoot2(NaN);
    } else {
      const sqrtDisc = Math.sqrt(discriminant);
      setRoot1((-b + sqrtDisc) / (2 * a));
      setRoot2((-b - sqrtDisc) / (2 * a));
    }

    // Generate graph data points
    const data = [];
    for (let x = -20; x <= 20; x++) {
      const y = a * x * x + b * x + c;
      data.push({ x, y });
    }
    setGraphData(data);
  };
  const formatTerm = (coef, variable, isFirst = false) => {
    if (coef === 0 || coef === "0") return "";

    const n = parseFloat(coef);

    if (isNaN(n)) return "";

    const abs = Math.abs(n);
    const sign = n > 0 ? (isFirst ? "" : "+ ") : "- ";

    if (abs === 1 && variable) {
      return `${sign}${variable}`;
    }

    return `${sign}${abs}${variable}`;
  };

  const formattedEquation = `${formatTerm(coefA, "x²", true)} ${formatTerm(
    coefB,
    "x",
  )} ${formatTerm(coefC, "", false)}`.trim();

  return (
    <Page>
      <Header>Quadratic: {formattedEquation}</Header>

      <form onSubmit={handleSubmit}>
        <Label>Coefficient A</Label>
        <Input
          type="text"
          value={coefA}
          onChange={(e) => {
            setCoefA(e.target.value);
            setRoot1(null);
            setRoot2(null);
          }}
        />

        <Label>Coefficient B</Label>
        <Input
          type="text"
          value={coefB}
          onChange={(e) => {
            setCoefB(e.target.value);
            setRoot1(null);
            setRoot2(null);
          }}
        />

        <Label>Coefficient C</Label>
        <Input
          type="text"
          value={coefC}
          onChange={(e) => {
            setCoefC(e.target.value);
            setRoot1(null);
            setRoot2(null);
          }}
        />

        <Button type="submit">Get Roots & Graph</Button>

        {root1 !== null &&
          (isNaN(root1) ? (
            <Invalid>No real roots or invalid input.</Invalid>
          ) : (
            <>
              <Response>x = {root1}</Response>
              <Response>x = {root2}</Response>
            </>
          ))}
      </form>

      {graphData.length > 0 && (
        <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
          <ResponsiveContainer>
            <LineChart data={graphData}>
              <CartesianGrid stroke="#666" strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                stroke="#333"
                label={{
                  value: "x",
                  position: "insideBottomRight",
                  offset: -5,
                }}
                tick={{ fill: "#111", fontSize: 12 }}
              />
              <YAxis
                stroke="#333"
                label={{
                  value: "y = ax² + bx + c",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                }}
                tick={{ fill: "#111", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f0f0f0",
                  borderColor: "#999",
                }}
                itemStyle={{ color: "#222" }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#0a0a0a"
                strokeWidth={3}
                dot={false}
              />

              {/* Highlight roots safely */}
              {typeof root1 === "number" && !isNaN(root1) && (
                <ReferenceDot
                  x={Number(root1.toFixed(2))}
                  y={0}
                  r={6}
                  fill="red"
                  stroke="black"
                  label={{ value: `x = ${root1.toFixed(2)}`, position: "top" }}
                />
              )}
              {typeof root2 === "number" &&
                !isNaN(root2) &&
                root2 !== root1 && (
                  <ReferenceDot
                    x={Number(root2.toFixed(2))}
                    y={0}
                    r={6}
                    fill="red"
                    stroke="black"
                    label={{
                      value: `x = ${root2.toFixed(2)}`,
                      position: "top",
                    }}
                  />
                )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Page>
  );
}
