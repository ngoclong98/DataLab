// @ts-ignore

import Utils from "src/utils/Utils";
import ChangeBadge from "../ChangeBadge";
import { useTranslation } from "react-i18next";
import ChartDataContainer from "src/components/ChartDataContainer";
import { COLORS } from "src/Constants";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";
import DropdownDataTooltip, { useShowTooltip } from "../DropdownDataTooltip";
export interface SingleNumberInfoProps {
  title: string;
  // value: number;
  // changePercent?: number;
  // previousPeriod?: any;
  data: any;
  valueKey: string;
  changePercentKey?: string;
  previousPeriodKey?: string;
  showPreviousPeriod?: boolean;
  loading?: boolean;
  error?: any;
  onRefresh?: () => void;
}
const SingleNumberInfo = ({
  title,
  data,
  valueKey,
  changePercentKey = "percent",
  previousPeriodKey,
  showPreviousPeriod = true,
  loading = false,
  error,
  onRefresh,
}: SingleNumberInfoProps) => {
  const { t } = useTranslation();
  const value = data?.[valueKey];
  const changePercent = changePercentKey ? data?.[changePercentKey] : null;
  const previousPeriod = previousPeriodKey ? data?.[previousPeriodKey] : null;
  const dateRange = useAppSelector(selectDateRange);
  const {
    showingTooltip,
    onClick: onClickDropdown,
    onMouseEnter: onMouseEnterDropdown,
    onMouseLeave: onMouseLeaveDropdown,
    onMouseUp: onMouseUpDropdown,
  } = useShowTooltip();
  return (
    <ChartDataContainer error={error} loading={loading} onRefresh={onRefresh}>
      <div
        onClick={onClickDropdown}
        onMouseLeave={onMouseLeaveDropdown}
        onMouseEnter={onMouseEnterDropdown}
        onMouseUp={onMouseUpDropdown}
      >
        <div className="chartTitle">{title}</div>
        <div className="rowCenter largeChartInfo">
          <DropdownDataTooltip
            showing={showingTooltip}
            toggle={
              <div className="largeChartInfoNumber">
                {Utils.isNullOrUndefined(value)
                  ? "-"
                  : Utils.formatNumber(value)}
              </div>
            }
            tooltipData={{
              title,
              data: !data
                ? data
                : {
                    ...data,
                    value,
                    previousValue: previousPeriod,
                  },
              currentColor: COLORS.PRIMARY,
              currentFromDate: dateRange.startDate,
              currentToDate: dateRange.endDate,
              previousFromDate: data?.previousFromDate,
              previousToDate: data?.previousToDate,
            }}
          />
        </div>
        {showPreviousPeriod && typeof changePercent !== "undefined" && (
          <div>
            <div className="rowCenter mt8 mb8">
              <ChangeBadge value={changePercent || 0} size={"normal"} />
            </div>
            <div className="textOnSurfaceLight body14 text-center">
              {t("comparison-period")}:{" "}
              {previousPeriod ? Utils.formatNumber(previousPeriod) : 0}
            </div>
          </div>
        )}
      </div>
    </ChartDataContainer>
  );
};
export default SingleNumberInfo;
