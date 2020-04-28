import React, { useMemo } from "react";
import { Chart } from "react-charts";

function LineChart({ data }) {
  const memoData = useMemo(() => data, []);
  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  const lineChart = (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <Chart data={memoData} axes={axes} />
    </div>
  );

  return lineChart;
}

export default LineChart;
