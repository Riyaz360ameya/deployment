"use client";
import React from "react";
import CardDataStats from "../components/CardDataStats";
import ChartOne from "../components/ChartOne";
import ChartTwo from "../components/ChartTwo";
import ChartThree from "../components/ChartThree";

const page = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        DASHBOARD
        {/* <ChartOne />
        <ChartTwo />
        <ChartThree/> */}
      </div>
    </>
  );
};

export default page;
