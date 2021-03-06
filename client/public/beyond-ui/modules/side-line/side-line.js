// https://react-charts.js.org/examples/bar
import React, { Fragment } from "react";
import useChartConfig from "hooks/useChartConfig";
import Box from "components/Box";
import { Chart } from "react-charts";
let sourceCode;
export default () => {
  const { data, randomizeData } = useChartConfig({
    series: 10,
    dataType: "ordinal",
  });
  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "left" },
      { position: "bottom", type: "linear", stacked: true },
    ],
    []
  );
  return (
    <Fragment>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <Box>
        <Chart data={data} series={series} axes={axes} tooltip />
      </Box>
      <br />
      <pre>
        <code>{sourceCode}</code>
      </pre>
    </Fragment>
  );
};
