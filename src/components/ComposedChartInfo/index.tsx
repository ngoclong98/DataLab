import { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Area,
  Tooltip,
  Bar,
  Brush,
} from "recharts";
import { COLORS, TOOLTIP_TIMEOUT } from "src/Constants";
import ChangeBadge from "../ChangeBadge";
import Table from "src/components/Table";
import { TableInfoItem, TableInfoMapping } from "../TableInfo";
import { useTranslation } from "react-i18next";
import { Check } from "react-bootstrap-icons";
import ChartDataContainer from "../ChartDataContainer";
import Utils from "src/utils/Utils";
import ChartTooltip, { ChartTooltipType } from "../ChartTooltip";
import { CurveType } from "recharts/types/shape/Curve";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";
import DropdownDataTooltip, { useShowTooltip } from "../DropdownDataTooltip";

export interface ComposedChartInfoProps {
  data: any;
  dataArrayKey?: string;
  title: string;
  // value?: any;
  // previousValue?: any;
  // changePercent?: number;
  valueKey?: string;
  previousValueKey?: string;
  changePercentKey?: string;
  xAxisDataKey: string;
  lineType?: CurveType;
  areaDataKeys?: string[];
  lineDataKeys?: string[];
  areaColors?: string[];
  areaOpacity?: number;
  lineColors?: string[];
  showLegend?: boolean;
  // tableData?: TableInfoItem[];
  persistDataKeys?: string[];
  barSize?: number;
  barDataKeys?: string[];
  barColors?: string[];
  loading?: boolean;
  error?: any;
  onRefresh?: () => void;
  tooltipType?: ChartTooltipType;
}

const ComposedChartInfo = ({
  data,
  title,
  dataArrayKey = "dailyDatas",
  valueKey,
  changePercentKey = "percent",
  // value,
  // changePercent,
  xAxisDataKey,
  lineType = "linear",
  areaDataKeys,
  lineDataKeys,
  areaColors,
  areaOpacity = 0.1,
  lineColors,
  showLegend = true,
  // tableData,
  // previousValue,
  previousValueKey,
  persistDataKeys,
  barSize,
  barDataKeys,
  barColors,
  loading = false,
  error,
  onRefresh,
  tooltipType = "comparison",
}: ComposedChartInfoProps) => {
  const { t } = useTranslation();
  const chartHeight = showLegend ? 300 : 270;
  const [showingGraphDataKey, setShowingGraphDataKey] = useState<any>({});
  const value = valueKey ? data?.[valueKey] : undefined;
  const previousValue = previousValueKey ? data?.[previousValueKey] : undefined;
  const changePercent = changePercentKey ? data?.[changePercentKey] : undefined;
  const dataArray = data?.[dataArrayKey];
  const [activeChartTooltip, setActiveChartTooltip] = useState(true);
  const [activeChartTooltipTimeout, setActiveChartTooltipTimeout] =
    useState<NodeJS.Timeout>();

  const {
    showingTooltip: showingNumberTooltip,
    onClick: onClickNumberDropdown,
    onMouseEnter: onMouseEnterNumberDropdown,
    onMouseLeave: onMouseLeaveNumberDropdown,
    onMouseUp: onMouseUpNumberDropdown,
  } = useShowTooltip();
  const dateRange = useAppSelector(selectDateRange);
  const tableTitle = "Metric";
  let tableData: TableInfoItem[] = [];
  if (tooltipType === "seperate") {
    const tableMapping: TableInfoMapping = {
      nameKeys: [t("new-users"), t("returning-users")],
      valueKeys: [
        Utils.formatNumber(data?.totalNbNewUser, false),
        Utils.formatNumber(data?.totalNbReturningUser, false),
      ],
      displayValueKeys: [
        Utils.formatNumber(data?.totalNbNewUser),
        Utils.formatNumber(data?.totalNbReturningUser),
      ],
      changePercentKeys: [data?.percentNewUser, data?.percentReturningUser],
      previousValueKeys: [
        Utils.formatNumber(data?.totalNbPreviousPeriodNewUser, false),
        Utils.formatNumber(data?.totalNbPreviousPeriodReturningUser, false),
      ],
      displayPreviousValueKeys: [
        Utils.formatNumber(data?.totalNbPreviousPeriodNewUser),
        Utils.formatNumber(data?.totalNbPreviousPeriodReturningUser),
      ],
      previousFromDateKey: data?.fromPreviousDate,
      previousToDateKey: data?.toPreviousDate,
    };
    tableData = Utils.mappingTableData(tableMapping);
  }

  useEffect(() => {
    const showingDataKey = {};
    if (lineDataKeys) {
      for (let lineDataKey of lineDataKeys) {
        showingDataKey[lineDataKey] = true;
      }
    }
    if (areaDataKeys) {
      for (let areaDataKey of areaDataKeys) {
        showingDataKey[areaDataKey] = true;
      }
    }
    setShowingGraphDataKey(showingDataKey);
  }, [lineDataKeys, areaDataKeys]);

  const _renderArea = (item: string, index: number) => {
    return (
      <Area
        key={"area" + index}
        type="monotone"
        dataKey={item}
        stroke={!!areaColors ? areaColors[index] : ""}
        fillOpacity={1}
        opacity={tooltipType === "comparison" ? areaOpacity : 1}
        fill={`url(#${!!areaColors && areaColors[index]})`}
        strokeWidth={tooltipType === "comparison" ? 0 : 2}
        hide={!showingGraphDataKey[item]}
      />
    );
  };

  const _renderLinearGradient = (item: string, index: number) => {
    return (
      <linearGradient
        id={item}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
        key={"areaGradient" + item}
      >
        <stop
          offset="5%"
          stopColor={item}
          stopOpacity={tooltipType === "comparison" ? 1 : areaOpacity}
        />
        <stop
          offset="95%"
          stopColor={item}
          stopOpacity={tooltipType === "comparison" ? 1 : areaOpacity}
        />
      </linearGradient>
    );
  };

  const _renderLine = (item: string, index: number) => {
    return (
      <Line
        key={"line" + index}
        type={lineType}
        dataKey={item}
        stroke={!!lineColors ? lineColors[index] : ""}
        strokeWidth={2.5}
        hide={!showingGraphDataKey[item]}
        dot={false}
      />
    );
  };

  const _renderBar = (item: string, index: number) => {
    return (
      <Bar
        key={"bar" + index}
        dataKey={item}
        barSize={barSize}
        fill={!!barColors ? barColors[index] : ""}
      />
    );
  };

  const _handleClickLengend = (item) => {
    if (persistDataKeys && persistDataKeys.includes(item.dataKey)) {
      return;
    }
    if (
      Object.values(showingGraphDataKey).filter((item) => !!item).length <= 1 &&
      showingGraphDataKey[item.dataKey] === true
    ) {
      return;
    }
    const newShowingGraphDataKey = { ...showingGraphDataKey };
    newShowingGraphDataKey[item.dataKey] =
      !newShowingGraphDataKey[item.dataKey];
    setShowingGraphDataKey(newShowingGraphDataKey);
  };

  const _renderLegendItem = (entry, index, payload) => {
    return (
      <div
        key={index}
        className={`legendText ${index < payload.length - 1 ? "me-4" : ""}`}
        style={{
          color: COLORS.LABEL,
          opacity: showingGraphDataKey[entry.dataKey] ? 1 : 0.4,
        }}
        onClick={(e) => {
          console.log("_handleClickLengend");
          _handleClickLengend(entry);
        }}
      >
        <div
          className="checkBoxLegend"
          style={{
            backgroundColor:
              entry.color === COLORS.LABEL ? COLORS.SEPERATOR : entry.color,
          }}
        >
          <Check className="checkLegend" />
        </div>
        {entry.value}
      </div>
    );
  };

  const _renderLegend = (props) => {
    const { payload } = props;
    const legendData = payload ? [...payload] : [];
    // Sort legend line display above area
    if (
      areaDataKeys &&
      lineDataKeys &&
      areaDataKeys.length > 0 &&
      lineDataKeys.length > 0
    ) {
      legendData.sort((a, b) => {
        const aIsArea = areaDataKeys.includes(a.dataKey);
        const aIsLine = lineDataKeys.includes(a.dataKey);
        const bIsArea = areaDataKeys.includes(b.dataKey);
        const bIsLine = lineDataKeys.includes(b.dataKey);
        if (aIsArea && bIsLine) {
          return 1;
        }
        if (aIsLine && bIsArea) {
          return -1;
        }
        return 0;
      });
    }
    return (
      <div className="d-flex flex-row align-items-center justify-content-center">
        {legendData.map((entry, index) =>
          _renderLegendItem(entry, index, payload)
        )}
      </div>
    );
  };

  const _renderTooltip = (props) => {
    const { payload } = props;
    if (!payload || !activeChartTooltip) {
      return <div />;
    }
    const tooltipData = payload ? [...payload] : [];
    // Sort legend line display above area
    if (
      areaDataKeys &&
      lineDataKeys &&
      areaDataKeys.length > 0 &&
      lineDataKeys.length > 0
    ) {
      tooltipData.sort((a, b) => {
        const aIsArea = areaDataKeys.includes(a.dataKey);
        const aIsLine = lineDataKeys.includes(a.dataKey);
        const bIsArea = areaDataKeys.includes(b.dataKey);
        const bIsLine = lineDataKeys.includes(b.dataKey);
        if (aIsArea && bIsLine) {
          return 1;
        }
        if (aIsLine && bIsArea) {
          return -1;
        }
        return 0;
      });
    }

    // console.log("tooltipData: ", tooltipData);
    return <ChartTooltip type={tooltipType} data={tooltipData} title={title} />;
  };

  const _checkShowChartTooltip = () => {
    if (activeChartTooltip) {
      return;
    }
    if (activeChartTooltipTimeout) {
      clearTimeout(activeChartTooltipTimeout);
      setActiveChartTooltipTimeout(undefined);
    }
    setActiveChartTooltip(true);
  };

  const _handleChartMouseLeave = () => {
    setActiveChartTooltip(false);
  };

  const _handleChartMouseUp = (e) => {
    setTimeout(() => {
      const timeout = setTimeout(() => {
        setActiveChartTooltip(false);
        setActiveChartTooltipTimeout(undefined);
      }, TOOLTIP_TIMEOUT);
      setActiveChartTooltipTimeout(timeout);
    }, 100);
  };

  const _renderComposedChart = () => {
    return (
      <ComposedChart
        data={dataArray}
        barCategoryGap={3}
        barGap={2}
        margin={{ top: 5, right: 5, bottom: 5, left: -27 }}
        onMouseEnter={_checkShowChartTooltip}
        onMouseLeave={_handleChartMouseLeave}
        onMouseDown={_checkShowChartTooltip}
        onMouseMove={_checkShowChartTooltip}
        onMouseUp={_handleChartMouseUp}
      >
        <XAxis
          dataKey={xAxisDataKey}
          stroke={COLORS.SEPERATOR}
          tick={{ fill: COLORS.LABEL, fontSize: 10 }}
          tickLine={false}
        />
        <YAxis
          stroke={COLORS.SEPERATOR}
          allowDecimals={false}
          tick={{ fill: COLORS.LABEL, fontSize: 10 }}
          tickFormatter={(value) =>
            Utils.formatNumber(value, false, "compact", 1)
          }
          domain={["auto", (dataMax) => Math.floor(dataMax * 1.1)]}
        />
        <CartesianGrid
          stroke={COLORS.SEPERATOR}
          strokeWidth={0.5}
          vertical={false}
        />
        <Tooltip cursor={activeChartTooltip} content={_renderTooltip} />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            height={30}
            onClick={_handleClickLengend}
            content={_renderLegend}
            wrapperStyle={{ bottom: -5 }}
          />
        )}

        {!!areaColors && <defs>{areaColors.map(_renderLinearGradient)}</defs>}
        {!!areaDataKeys && !!areaColors && areaDataKeys.map(_renderArea)}
        {!!lineDataKeys && !!lineColors && lineDataKeys.map(_renderLine)}
        {!!barDataKeys && !!barColors && barDataKeys.map(_renderBar)}
        {/* {!!dataArray && dataArray.length > 30 && (
          <Brush
            startIndex={dataArray.length - 31}
            endIndex={dataArray.length - 1}
            height={20}
            stroke={COLORS.PRIMARY}
            fill={COLORS.BACKGROUND}
            alwaysShowText={false}
            dataKey={xAxisDataKey}
          />
        )} */}
      </ComposedChart>
    );
  };

  const _renderNumberInfo = () => {
    if (typeof value === "undefined") {
      return <div />;
    }

    return (
      <DropdownDataTooltip
        showing={showingNumberTooltip}
        align={"start"}
        toggle={
          <div
            className="rowStart mb16"
            onClick={onClickNumberDropdown}
            onMouseEnter={onMouseEnterNumberDropdown}
            onMouseLeave={onMouseLeaveNumberDropdown}
            onMouseUp={onMouseUpNumberDropdown}
          >
            {typeof value !== "undefined" && (
              <div className="rowCenter largeChartInfo2 mr12">
                {Utils.formatNumber(value)}
              </div>
            )}
            {typeof previousValue !== "undefined" && (
              <div className="d-flex flex-column flex-start">
                <div className="mb2 d-flex flex-row">
                  <ChangeBadge value={changePercent || 0} size={"small"} />
                </div>
                <div className="textOnSurfaceLight body14">
                  {t("comparison-period")}: {Utils.formatNumber(previousValue)}
                </div>
              </div>
            )}
          </div>
        }
        tooltipData={{
          title,
          data: {
            ...data,
            value,
            previousValue,
          },
          currentFromDate: dateRange.startDate,
          currentToDate: dateRange.endDate,
          previousFromDate: data.previousFromDate,
          previousToDate: data.previousToDate,
        }}
      />
    );
  };

  return (
    <ChartDataContainer error={error} loading={loading} onRefresh={onRefresh}>
      <div className="chartTitle">{title}</div>
      {_renderNumberInfo()}
      <ResponsiveContainer width={"100%"} height={chartHeight} debounce={1}>
        {_renderComposedChart()}
      </ResponsiveContainer>
      {tableData.length > 0 && (
        <Table tableTitle={tableTitle} data={tableData} />
      )}
    </ChartDataContainer>
  );
};

export default ComposedChartInfo;
