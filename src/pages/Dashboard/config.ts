import { ComposedChartInfoProps } from "src/components/ComposedChartInfo";
import { DashboardChartItemProps } from "src/components/DashboardChartItem";
import { SingleNumberInfoProps } from "src/components/SingleNumberInfo";
import { CHART_TYPE, COLORS } from "src/Constants";
import { TFunction } from "react-i18next";

export const getPaymentHubOverallDashboardConfig = (
  t: TFunction<"translation", undefined>
): DashboardChartItemProps[] => {
  return [
    {
      index: 0,
      colNum: 12,
      url: "/api/frontend/paymenthub/merchant",
      chartType: CHART_TYPE.NUMBER,
      chartProps: {
        title: t("active-merchants"),
        valueKey: "totalNbMerchant",
        previousPeriodKey: "totalNbPreviousPeriodMerchant",
      } as SingleNumberInfoProps,
    },
    {
      index: 1,
      colNum: 6,
      url: "/api/frontend/paymenthub/session",
      chartType: CHART_TYPE.AREA,
      chartProps: {
        title: t("users"),
        valueKey: "totalNbCurrentSessionLogin",
        previousValueKey: "totalNbPreviousPeriodSessionLogin",
        xAxisDataKey: "date",
        lineType: "monotone",
        lineDataKeys: [t("sessions")],
        areaDataKeys: [t("comparison-period")],
        lineColors: [COLORS.PRIMARY],
        areaColors: [COLORS.SEPERATOR],
        persistDataKeys: [t("sessions")],
      } as ComposedChartInfoProps,
      mappingFn: (item) => ({
        ...item,
        [t("sessions")]: item.nbCurrent,
        [t("comparison-period")]: item.nbPreviousPeriod,
      }),
    },
  ];
};
