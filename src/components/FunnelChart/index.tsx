// @ts-ignore
import React from "react";
import { TableInfoItem } from "../TableInfo";
import Table from "src/components/Table";
import { Funnel } from "funnel-react";

interface FunnelChartProps {
  data: any[];
  title: string;
  tableData?: TableInfoItem[];
  tableTitle?: string;
}
const FunnelChart = ({
  data,
  title,
  tableData,
  tableTitle = "Metric",
}: FunnelChartProps) => {
  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>

      <Funnel
        height={300}
        labelKey="label"
        colors={{
          graph: ["#1890FF", "#BAE7FF"],
          percent: "#fff",
          label: "white",
          value: "white",
        }}
        colorPercent="#fff"
        colorLabel="#fff"
        valueKey="quantity"
        displayPercent={true}
        data={data}
        responsive={true}
      />

      <div className="textOnSurfaceLight body14 text-center">
        Overall Conversion Rate: 98%
      </div>
      {!!tableData && <Table tableTitle={tableTitle} data={tableData} />}
    </div>
  );
};
export default FunnelChart;
