import ChangeBadge from "../ChangeBadge";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { COLORS } from "src/Constants";

interface LineChartInfoProps {
  title: string;
  value?: any;
  changePercent?: number;
  previousValue?: any;
  data: any[];
  xAxisDataKey: string;
  dataKeys: string[];
  colors: string[];
}

const LineChartInfo = ({
  title,
  value,
  changePercent,
  data,
  xAxisDataKey,
  dataKeys,
  colors,
  previousValue,
}: LineChartInfoProps) => {
  const _renderLineChart = (item: string, index: number) => {
    return (
      <Line
        key={index}
        type="monotone"
        dataKey={item}
        stroke={colors[index]}
        strokeWidth={2}
        dot={false}
      />
    );
  };

  return (
    <div className="chartContainer">
      <div className="chartTitle">{title}</div>
      <div className="rowStart mb16">
        {!!value && (
          <div className="rowCenter largeChartInfo2 mr12">{value}</div>
        )}
        {!!changePercent && (
          <div className="d-flex flex-column flex-start">
            <div className="mb2 d-flex flex-row">
              <ChangeBadge value={changePercent} size={"small"} />
            </div>
            <div className="textOnSurfaceLight body14 text-center">
              Comparison period: {previousValue}
            </div>
          </div>
        )}
      </div>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart data={data}>
          {/* <defs>{colors.map(_renderLinearGradient)}</defs> */}
          <CartesianGrid stroke={COLORS.ON_SURFACE} />
          <XAxis
            dataKey={xAxisDataKey}
            stroke={COLORS.ON_SURFACE}
            style={{ fontSize: 12 }}
          />
          <YAxis stroke={COLORS.ON_SURFACE} style={{ fontSize: 12 }} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          {dataKeys.map(_renderLineChart)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartInfo;
