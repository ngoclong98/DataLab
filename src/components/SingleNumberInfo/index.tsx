// @ts-ignore

import Utils from "src/utils/Utils";
import ChangeBadge from "../ChangeBadge";
import { useTranslation } from "react-i18next";
import ChartDataContainer from "src/components/ChartDataContainer";
import CustomDropdownToggle from "src/components/CustomDropdownToggle";
import Dropdown from "react-bootstrap/Dropdown";
import DataTooltip from "../DataTooltip";
import { COLORS, TOOLTIP_TIMEOUT } from "src/Constants";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";
import { useState } from "react";
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
  const [showingTooltip, setShowingTooltip] = useState(false);
  const [lastTriggerTooltip, setLastTriggerTooltip] = useState<number>();
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout>();

  const _clearOldTooltipTimeout = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(undefined);
    }
  };

  const _toggleToolTip = () => {
    if (!showingTooltip) {
      _clearOldTooltipTimeout();
    }
    setShowingTooltip(!showingTooltip);
  };

  return (
    <ChartDataContainer error={error} loading={loading} onRefresh={onRefresh}>
      <div
        onClick={() => {
          const now = new Date().getTime();
          if (lastTriggerTooltip && now - lastTriggerTooltip < 100) {
            return;
          }
          _toggleToolTip();
        }}
        onMouseLeave={() => {
          setShowingTooltip(false);
        }}
        onMouseEnter={() => {
          setShowingTooltip(true);
          setLastTriggerTooltip(new Date().getTime());
          _clearOldTooltipTimeout();
        }}
        onMouseUp={(e) => {
          const timeout = setTimeout(() => {
            setShowingTooltip(false);
            setTooltipTimeout(undefined);
          }, TOOLTIP_TIMEOUT);
          setTooltipTimeout(timeout);
        }}
      >
        <div className="chartTitle">{title}</div>
        <div className="rowCenter largeChartInfo">
          <Dropdown
            onToggle={_toggleToolTip}
            show={showingTooltip}
            align={"end"}
          >
            <Dropdown.Toggle as={CustomDropdownToggle}>
              <div className="largeChartInfoNumber">
                {Utils.isNullOrUndefined(value)
                  ? "-"
                  : Utils.formatNumber(value)}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownDataTooltip">
              <DataTooltip
                title={title}
                data={
                  !data
                    ? data
                    : {
                        ...data,
                        value,
                        previousValue: previousPeriod,
                      }
                }
                currentColor={COLORS.PRIMARY}
                previousColor={COLORS.SEPERATOR}
                currentFromDate={dateRange.startDate}
                currentToDate={dateRange.endDate}
                previousFromDate={data?.previousFromDate}
                previousToDate={data?.previousToDate}
              />
            </Dropdown.Menu>
          </Dropdown>
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
