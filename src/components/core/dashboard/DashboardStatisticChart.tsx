"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const DashboardStatisticChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    // Data Processing
    const data: [string, number][] = [
      ["2000-06-05", 116],
      ["2000-06-06", 129],
      ["2000-06-07", 135],
      ["2000-06-08", 86],
      ["2000-06-09", 73],
      ["2000-06-10", 85],
      ["2000-06-11", 73],
      ["2000-06-12", 68],
      ["2000-06-13", 92],
      ["2000-06-14", 130],
      ["2000-06-15", 245],
      ["2000-06-16", 139],
    ];

    const dateList = data.map((item) => item[0]);
    const valueList = data.map((item) => item[1]);

    const option: echarts.EChartsOption = {
      title: {
        left: "center",
        text: "",
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        borderRadius: 20,
        textStyle: {
          color: "#333",
          fontSize: 14,
        },
        padding: 10,
        formatter: function (params) {
          return `
            <div style="display: flex; align-items: center; gap: 8px; padding: 5px;">
            <div style="padding: 4px; border-radius: 50%; background: #f0fdf4;">
              <svg stroke="currentColor" fill="green" stroke-width="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"></path></svg>
              </div>
              <strong>$${params[0].value.toFixed(2)}</strong>
            </div>
          `;
        },
      },
      xAxis: {
        type: "category",
        data: dateList,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "line",
          showSymbol: false,
          data: valueList,
          lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(34, 197, 94, 0.8)" }, // Green
              { offset: 1, color: "rgba(240, 255, 240, 0)" }, // Transparent
            ]),
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(34, 197, 94, 0.5)" }, // Green
                { offset: 1, color: "rgba(240, 255, 240, 0)" }, // Fully Transparent
              ],
            },
          },
          smooth: true,
        },
      ],
    };

    chartInstance.setOption(option);

    // Cleanup on unmount
    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-72" />;
};

export default DashboardStatisticChart;
