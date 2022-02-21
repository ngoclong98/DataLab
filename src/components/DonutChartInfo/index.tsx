import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Utils from "src/utils/Utils";
import ChangeBadge from "../ChangeBadge";
import { TableInfoItem } from "../TableInfo";
import Table from "src/components/Table";
import { COLORS, TOOLTIP_TIMEOUT } from "src/Constants";
import { useTranslation } from "react-i18next";
import ChartDataContainer from "src/components/ChartDataContainer";
import DataTooltip from "../DataTooltip";
import Dropdown from "react-bootstrap/Dropdown";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";

// const renderActiveShape = (props: any) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 25) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 15;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text x={cx} y={cy} dy={4} textAnchor="middle" fill={fill}>
//         {/* {payload.value} */}
//         {totalAmount}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 7}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 10}
//         y={ey}
//         textAnchor={textAnchor}
//         fill="#ccC"
//       >{`${payload.name}`}</text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 10}
//         y={ey}
//         dy={15}
//         textAnchor={textAnchor}
//         fill="#999"
//       >
//         {` ${value} (${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

interface DonutChartInfoProps {
  data: any;
  title: string;
  colors?: string[];
  loading?: boolean;
  error?: any;
  onRefresh?: () => void;
}
const DonutChartInfo = ({
  data,
  title,
  colors,
  loading = false,
  error,
  onRefresh,
}: DonutChartInfoProps) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const onPieEnter = useCallback(
  //   (_, index) => {
  //     setActiveIndex(index);
  //   },
  //   [setActiveIndex]
  // );

  const [noData, setNoData] = useState<boolean>(false);
  const checkData = () => {
    // for (let i = 0; i < data?.dailyDatas.length; i++) {
    //   if (data?.dailyDatas[i].value !== 0) return false;
    // }
    if (data?.total && data?.total !== 0) return false;
    return true;
  };

  useEffect(() => {
    setNoData(checkData());
  }, [data]);

  const noDataArr = [{ name: "No Data", value: 1 }];
  const { t } = useTranslation();
  const tableTitle = "Metric";
  let tableData: TableInfoItem[] = [];
  data?.dailyDatas.map((item) =>
    tableData.push({
      name: item.name,
      value: Utils.formatNumber(item.value, false),
      displayValue: Utils.formatNumber(item.value),
      previousValue: Utils.formatNumber(item.previousValue, false),
      displayPreviousValue: Utils.formatNumber(item.previousValue),
      changePercent: item.changePercent,
      previousFromDate: item.previousFromDate,
      previousToDate: item.previousToDate,
    })
  );

  // const totalData = {
  //   name: t("total"),
  //   value: Utils.formatNumber(data?.total),
  //   displayValue: Utils.formatNumber(data?.total),
  //   previousValue: Utils.formatNumber(data?.totalPrevious),
  //   displayPreviousValue: Utils.formatNumber(data?.totalPrevious),
  //   changePercent: data?.totalPreviousPeriodPercent,
  //   previousFromDate: data?.fromPreviousDate,
  //   previousToDate: data?.fromPreviousDate,
  // };
  const totalAmount = data?.total;

  const _renderLabel = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, outerRadius, fill, payload, percent, value } =
      props;
    // console.log("payload: ", payload);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const x = cx + (outerRadius + 30) * cos;
    const y = cy + (outerRadius + 50) * sin;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          fill={COLORS.LABEL}
          className="body24 w500"
        >
          {Utils.isNullOrUndefined(totalAmount)
            ? "-"
            : Utils.formatNumber(totalAmount)}
        </text>
        <text
          x={cx}
          y={cy}
          dy={24}
          textAnchor="middle"
          fill={COLORS.LABEL}
          className="body16"
        >
          {t("total")}
        </text>
        {!noData && (
          <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            fill={fill}
            className="body16"
          >
            {`${payload.name}`}
          </text>
        )}
        {!noData && (
          <text
            x={x}
            y={y}
            dy={20}
            textAnchor={textAnchor}
            fill={COLORS.LABEL}
            className="body16 w500"
          >
            {` ${Utils.formatNumber(value)} (${percent}%)`}
          </text>
        )}
      </g>
    );
  };

  const _renderTooltip = (props) => {
    const { payload } = props;
    const tooltipData = payload ? [...payload] : [];
    if (tooltipData.length === 0) return null;
    // console.log("tooltipData: ", tooltipData);
    return (
      <DataTooltip
        data={tooltipData[0].payload}
        title={tooltipData[0].name}
        currentColor={tooltipData[0].payload.fill}
        previousColor={COLORS.SEPERATOR}
        currentFromDate={tooltipData[0].payload.currentFromDate}
        currentToDate={tooltipData[0].payload.currentToDate}
        previousFromDate={tooltipData[0].payload.previousFromDate}
        previousToDate={tooltipData[0].payload.previousToDate}
      />
    );
  };

  return (
    <ChartDataContainer error={error} loading={loading} onRefresh={onRefresh}>
      <div className="chartTitle">{title}</div>
      <ResponsiveContainer width={"100%"} height={noData ? 250 : 300}>
        <PieChart margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
          {/* <div onClick={() => alert("Click center")}> */}
          <Pie
            data={noData ? noDataArr : data?.dailyDatas}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            stroke={COLORS.BACKGROUND}
            label={_renderLabel}
            labelLine={!noData}
            isAnimationActive={false}
            startAngle={-45}
          >
            {noData ? (
              <Cell fill={COLORS.WHITE_SMOKE} opacity={0.3} />
            ) : (
              data?.dailyDatas.map((entry, index) => (
                <Cell
                  key={`cell-${entry}-${index}`}
                  fill={!!colors ? colors[index % colors.length] : ""}
                />
              ))
            )}
          </Pie>
          {/* </div> */}
          {!noData && <Tooltip content={_renderTooltip} />}
          {/* <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie> */}
        </PieChart>
      </ResponsiveContainer>
      {tableData.length > 0 && (
        <Table tableTitle={tableTitle} data={tableData} />
      )}
    </ChartDataContainer>
  );
};
export default DonutChartInfo;
