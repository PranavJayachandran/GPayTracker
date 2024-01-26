import React from "react";
import Chart from "react-google-charts";

export const Graph = ({ data, options }: { data: any; options: any }) => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};
