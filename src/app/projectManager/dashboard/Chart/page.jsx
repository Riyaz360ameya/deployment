"use client";
import React from "react";
import ChartOne from "../../components/ChartOne";
import ChartTwo from "../../components/ChartTwo";
import ChartThree from "../../components/ChartThree";

const Chart = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne/>
        <ChartTwo/>
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
