import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ComposedChartInfo from "src/components/ComposedChartInfo";
import Col from "react-bootstrap/Col";
import { CHART_TYPE, COLORS } from "src/Constants";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";
import Utils from "src/utils/Utils";
import DonutChartInfo from "src/components/DonutChartInfo";
import UiService from "src/services/UiService";
import {
  usePurchaseData,
  useRevenueData,
  useRevenueByMethodData,
} from "src/hooks/UseDashboard";

const PaymentHubRecurringPaymentDashboard = () => {
  const { t } = useTranslation();
  const dateRange = useAppSelector(selectDateRange);
  const {
    response: purchaseData,
    loading: loadingPurchase,
    error: purcharseError,
    refetch: refetchPurchase,
    refreshing: refreshingPurchase,
  } = usePurchaseData();
  const {
    response: revenueData,
    loading: loadingRevenue,
    error: revenueError,
    refetch: refetchRevenue,
    refreshing: refreshingRevenue,
  } = useRevenueData();
  const {
    response: revenueByMethodData,
    loading: loadingRevenueByMethod,
    error: revenueByMethodError,
    refetch: refetchRevenueByMethod,
    refreshing: refreshingRevenueByMethod,
  } = useRevenueByMethodData();

  useEffect(() => {
    if (loadingPurchase && loadingRevenue && loadingRevenueByMethod) {
      UiService.showLoadingChart();
    }
    if (!loadingPurchase && !loadingRevenue && !loadingRevenueByMethod) {
      UiService.hideLoadingChart();
    }
  }, [loadingPurchase, loadingRevenue, loadingRevenueByMethod]);

  return (
    <>
      {/* {Utils.shouldShowChart(CHART_TYPE.FUNNEL, dateRange) && (
        <Col md={12} className="align-items-stretch">
          <FunnelChart
            data={FUNNEL_DATA}
            title="CONVERSION RATE"
            // tableData={SUBCRIPTION_DATA}
          ></FunnelChart>
        </Col>
      )} */}
      {Utils.shouldShowChart(CHART_TYPE.AREA, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <ComposedChartInfo
            title={t("purchases")}
            // data={purchaseData?.dailyDatas}
            // value={purchaseData?.totalNbCurrentPurchases}
            // previousValue={purchaseData?.totalNbPreviousPeriodPurchases}
            // changePercent={purchaseData?.percent}
            data={purchaseData}
            valueKey={"totalNbCurrentPurchases"}
            previousValueKey={"totalNbPreviousPeriodPurchases"}
            xAxisDataKey="date"
            lineType="monotone"
            lineDataKeys={[t("purchases")]}
            areaDataKeys={[t("comparison-period")]}
            lineColors={[COLORS.AMBER]}
            areaColors={[COLORS.LABEL]}
            persistDataKeys={[t("purchases")]}
            error={purcharseError}
            onRefresh={refetchPurchase}
            loading={refreshingPurchase}
          />
        </Col>
      )}
      {/* {Utils.shouldShowChart(CHART_TYPE.NUMBER, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <SingleNumberInfo
            title={t("active-subcription")}
            value={1456}
            changePercent={39.4}
            previousPeriod={1010}
            showPreviousPeriod={
              dateRange.rangeType !== DATE_RANGE_VALUE.ALL_TIME
            }
          />
        </Col>
      )}
      {Utils.shouldShowChart(CHART_TYPE.NUMBER, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <TableInfo
            title={t("subcription-overview")}
            tableTitle={t("metric")}
            data={SUBCRIPTION_DATA}
          />
        </Col>
      )} */}
      {Utils.shouldShowChart(CHART_TYPE.AREA, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <ComposedChartInfo
            title={t("revenue")}
            // data={revenueData?.dailyDatas}
            // value={revenueData?.totalNbCurrent}
            // previousValue={revenueData?.totalNbPrevious}
            // changePercent={revenueData?.percent}
            data={revenueData}
            valueKey={"totalNbCurrent"}
            previousValueKey={"totalNbPrevious"}
            xAxisDataKey="date"
            lineType="monotone"
            lineDataKeys={[t("revenue")]}
            areaDataKeys={[t("comparison-period")]}
            lineColors={[COLORS.LIGHT_CORAL]}
            areaColors={[COLORS.LABEL]}
            persistDataKeys={[t("revenue")]}
            error={revenueError}
            onRefresh={refetchRevenue}
            loading={refreshingRevenue}
          />
        </Col>
      )}
      {Utils.shouldShowChart(CHART_TYPE.PIE, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <DonutChartInfo
            data={revenueByMethodData}
            title={t("revenue-by-method")}
            colors={[COLORS.CORN_FLOWER_BLUE, COLORS.SANDY_BROWN]}
            loading={refreshingRevenueByMethod}
            error={revenueByMethodError}
            onRefresh={refetchRevenueByMethod}
          />
        </Col>
      )}
    </>
  );
};

export default PaymentHubRecurringPaymentDashboard;
