import { TriangleFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { COLORS } from "src/Constants";
import Utils from "src/utils/Utils";

interface DataTooltipProps {
  data: any;
  title?: string;
  currentColor?: string;
  previousColor?: string;
  currentFromDate?: string | null;
  currentToDate?: string | null;
  previousFromDate?: string | null;
  previousToDate?: string | null;
}

const DataTooltip = ({
  data,
  title,
  currentColor = COLORS.PRIMARY,
  previousColor = COLORS.SEPERATOR,
  currentFromDate,
  currentToDate,
  previousFromDate,
  previousToDate,
}: DataTooltipProps) => {
  const { t } = useTranslation();
  const isDecrease = data?.changePercent < 0;
  return (
    <div className="tooltipBox">
      <div className="tooltipText">{title?.toUpperCase()}</div>
      <div className={"tooltipItemNoMaxWidth pt8"}>
        <div className="tooltipItemColor pb4">
          <div
            className="tooltipItemColorBox mr4"
            style={{
              backgroundColor: currentColor,
            }}
          />
          <span className="tooltipText">
            {Utils.getDisplayDateRange2(
              currentFromDate || "",
              currentToDate || ""
            )}
          </span>
        </div>
        <div className={"tooltipText body16 w700 pb4"}>
          {Utils.formatNumber(data?.value, false)}
        </div>

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
            {Math.abs(data?.changePercent)}%
          </span>
        </div>
      </div>
      <div className={"pt8"}>
        <div className="tooltipItemColor pb4">
          <div
            className="tooltipItemColorBox mr4"
            style={{
              backgroundColor: previousColor,
            }}
          />
          <span className="tooltipText">
            {Utils.getDisplayDateRange2(
              previousFromDate || "",
              previousToDate || ""
            )}
          </span>
        </div>
        <div className={"tooltipText body16 w700 pb4"}>
          {Utils.formatNumber(data?.previousValue, false)}
        </div>
      </div>
    </div>
  );
};

export default DataTooltip;
