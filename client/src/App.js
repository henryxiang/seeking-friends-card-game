import React from "react";
import HeartA from "./components/cards/HeartA";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <svg
        width="400"
        height="600"
        style={{
          border: "1px solid black",
          position: "absolute",
          top: 100,
          left: 150,
          backgroundColor: 'palegreen',
        }}
      >
        <HeartA x={0} y={30} scale={0.5} />
        <HeartA x={30} y={30} scale={0.5} />
      </svg>
    </div>
  );
}

export default App;
