import { TriangleFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import Utils from "src/utils/Utils";
import { COLORS } from "src/Constants";
export type ChartTooltipType = "seperate" | "comparison";
interface ChartTooltipProps {
  type: ChartTooltipType;
  data: any[];
  title?: string;
}
const ChartTooltip = ({
  data,
  type = "comparison",
  title,
}: ChartTooltipProps) => {
  const { t } = useTranslation();

  const _renderComparisonTooltip = () => {
    return (
      <div className="tooltipBox">
        <div className="tooltipText ">{title?.toUpperCase()}</div>
        {data.map((entry, index) => {
          const isLast = index === data.length - 1;
          const isDecrease = entry.payload.percent < 0;

          return (
            <div
              key={entry.dataKey}
              className={`${!isLast && "tooltipItem"} pt8`}
            >
              <div className="tooltipItemColor pb4">
                <div
                  className="tooltipItemColorBox mr4"
                  style={{
                    backgroundColor:
                      entry.color === COLORS.LABEL
                        ? COLORS.SEPERATOR
                        : entry.color,
                  }}
                />
                <span className="tooltipText">
                  {Utils.formatToFullDayAndDate(
                    entry.dataKey === t("comparison-period")
                      ? entry.payload.datePreviousPeriod
                      : entry.payload.dateCurrent
                  )}
                </span>
              </div>
              <div className={`tooltipText body16 w700 ${!isLast && "pb4"}`}>
                {Utils.formatNumber(entry.value, false)}
              </div>
              {entry.dataKey !== t("comparison-period") && (
                <div className="pb8 rowStart">
                  <TriangleFill
                    className={
                      isDecrease ? "tooltipDecreaseItem" : "tooltipIncreaseItem"
                    }
                    style={{
                      transform: isDecrease ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                  <span
                    className={`subTitle12 ${
                      isDecrease ? "textDanger" : "textSuccess"
                    }`}
                  >
                    {Math.abs(entry.payload.percent)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const _renderSeperateTooltip = () => {
    return (
      <div className="tooltipBox">
        <div className="tooltipText ">
          {data && data[0]
            ? Utils.formatToFullDayAndDate(data[0].payload.dateCurrent)
            : title?.toUpperCase()}
        </div>
        {data.map((entry, index) => {
          const isLast = index === data.length - 1;
          const isDecrease = entry.payload[entry.name + "_percent"] < 0;

          return (
            <div
              key={entry.dataKey}
              className={`${!isLast && "tooltipItem"} pt8`}
            >
              <div className="tooltipItemColor pb4">
                <div
                  className="tooltipItemColorBox mr4"
                  style={{
                    backgroundColor: entry.color,
                  }}
                />
                <span className="tooltipText">{entry.name}</span>
              </div>
              <div className={`tooltipText body16 w700 ${!isLast && "pb4"}`}>
                {Utils.formatNumber(entry.value, false)}
              </div>
              {entry.dataKey !== t("comparison-period") && (
                <div className="pb8 rowStart">
                  <TriangleFill
                    className={
                      isDecrease ? "tooltipDecreaseItem" : "tooltipIncreaseItem"
                    }
                    style={{
                      transform: isDecrease ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                  <span
                    className={`subTitle12 ${
                      isDecrease ? "textDanger" : "textSuccess"
                    }`}
                  >
                    {Math.abs(entry.payload[entry.name + "_percent"])}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (type === "comparison") {
    return _renderComparisonTooltip();
  }
  return _renderSeperateTooltip();
};

export default ChartTooltip;
