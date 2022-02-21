import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SingleNumberInfo from "src/components/SingleNumberInfo";
import ComposedChartInfo from "src/components/ComposedChartInfo";
import TableInfo from "src/components/TableInfo";
import Col from "react-bootstrap/Col";
import { CHART_TYPE, COLORS, DATE_RANGE_VALUE } from "src/Constants";
import { useAppSelector } from "src/redux/hook";
import { selectSelectedMerchantCode } from "src/redux/AuthSlice";
import { selectDateRange } from "src/redux/DashboardSlice";
import Utils from "src/utils/Utils";
import DonutChartInfo from "src/components/DonutChartInfo";
import UiService from "src/services/UiService";
import {
  useMerchantData,
  useUserData,
  useSessionData,
  usePurchaseData,
  useRevenueData,
  useRevenueByMethodData,
  useTopMerchantBySessionData,
  useTopMerchantByRevenueData,
} from "src/hooks/UseDashboard";

const PaymentHubOverallDashboard = () => {
  const { t } = useTranslation();
  const dateRange = useAppSelector(selectDateRange);
  const merchantCode = useAppSelector(selectSelectedMerchantCode);

  const {
    response: merchantData,
    loading: loadingMerchant,
    error: merchantError,
    refetch: refetchMerchant,
    refreshing: refreshingMerchant,
  } = useMerchantData();

  const {
    response: sessionData,
    loading: loadingSession,
    error: sessionError,
    refetch: refetchSession,
    refreshing: refreshingSession,
  } = useSessionData();

  const {
    response: usersData,
    loading: loadingUser,
    error: userError,
    refetch: refetchUser,
    refreshing: refreshingUser,
  } = useUserData();

  const {
    response: purchaseData,
    loading: loadingPurchase,
    error: purchaseError,
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

  const {
    response: topMerchantBySessionData,
    loading: loadingTopMerchantBySessionData,
    error: topMerchantBySessionError,
    refetch: refetchTopMerchantBySession,
    refreshing: refreshingTopMerchantBySession,
  } = useTopMerchantBySessionData();

  const {
    response: topMerchantByRevenueData,
    loading: loadingTopMerchantByRevenueData,
    error: topMerchantByRevenueError,
    refetch: refetchTopMerchantByRevenue,
    refreshing: refreshingTopMerchantByRevenue,
  } = useTopMerchantByRevenueData();

  useEffect(() => {
    if (
      loadingMerchant &&
      loadingSession &&
      loadingUser &&
      loadingPurchase &&
      loadingRevenue &&
      loadingRevenueByMethod &&
      loadingTopMerchantBySessionData &&
      loadingTopMerchantByRevenueData
    ) {
      UiService.showLoadingChart();
    }
    if (
      !loadingMerchant &&
      !loadingSession &&
      !loadingUser &&
      !loadingPurchase &&
      !loadingRevenue &&
      !loadingRevenueByMethod &&
      !loadingTopMerchantBySessionData &&
      !loadingTopMerchantByRevenueData
    ) {
      UiService.hideLoadingChart();
    }
  }, [
    loadingMerchant,
    loadingSession,
    loadingUser,
    loadingPurchase,
    loadingRevenue,
    loadingRevenueByMethod,
    loadingTopMerchantBySessionData,
    loadingTopMerchantByRevenueData,
  ]);

  return (
    <>
      {Utils.shouldShowChart(CHART_TYPE.NUMBER, dateRange) && !merchantCode && (
        <Col md={12} className="align-items-stretch">
          <SingleNumberInfo
            data={merchantData}
            title={t("active-merchants")}
            valueKey={"totalNbMerchant"}
            previousPeriodKey={"totalNbPreviousPeriodMerchant"}
            // value={merchantData?.totalNbMerchant}
            // changePercent={merchantData?.percent}
            // previousPeriod={merchantData?.totalNbPreviousPeriodMerchant}
            showPreviousPeriod={
              dateRange.rangeType !== DATE_RANGE_VALUE.ALL_TIME
            }
            loading={refreshingMerchant}
            error={merchantError}
            onRefresh={refetchMerchant}
          />
        </Col>
      )}

      {Utils.shouldShowChart(CHART_TYPE.AREA, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <ComposedChartInfo
            title={t("sessions")}
            // data={sessionData?.dailyDatas}
            // value={sessionData?.totalNbCurrentSessionLogin}
            // previousValue={sessionData?.totalNbPreviousPeriodSessionLogin}
            // changePercent={sessionData?.percent}
            data={sessionData}
            valueKey={"totalNbCurrentSessionLogin"}
            previousValueKey={"totalNbPreviousPeriodSessionLogin"}
            xAxisDataKey="date"
            lineType="monotone"
            lineDataKeys={[t("sessions")]}
            areaDataKeys={[t("comparison-period")]}
            lineColors={[COLORS.PRIMARY]}
            areaColors={[COLORS.LABEL]}
            persistDataKeys={[t("sessions")]}
            loading={refreshingSession}
            error={sessionError}
            onRefresh={refetchSession}
          />
        </Col>
      )}
      {Utils.shouldShowChart(CHART_TYPE.TABLE, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <TableInfo
            data={topMerchantBySessionData}
            title={t("top-merchants-by-session")}
            tableTitle={t("merchants")}
            error={topMerchantBySessionError}
            onRefresh={refetchTopMerchantBySession}
            loading={refreshingTopMerchantBySession}
          />
        </Col>
      )}
      {Utils.shouldShowChart(CHART_TYPE.AREA, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <ComposedChartInfo
            title={t("users")}
            // data={usersData?.dailyDatas}
            // value={usersData?.totalNbCurrentUser}
            // previousValue={usersData?.totalNbPreviousPeriodUser}
            // changePercent={usersData?.percent}
            data={usersData}
            valueKey={"totalNbCurrentUser"}
            previousValueKey={"totalNbPreviousPeriodUser"}
            xAxisDataKey="date"
            lineType="monotone"
            lineDataKeys={[t("users")]}
            areaDataKeys={[t("comparison-period")]}
            lineColors={[COLORS.SUCCESS]}
            areaColors={[COLORS.LABEL]}
            persistDataKeys={[t("users")]}
            loading={refreshingUser}
            error={userError}
            onRefresh={refetchUser}
          />
        </Col>
      )}
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
            error={purchaseError}
            onRefresh={refetchPurchase}
            loading={refreshingPurchase}
          />
        </Col>
      )}
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
      {Utils.shouldShowChart(CHART_TYPE.TABLE, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <TableInfo
            data={topMerchantByRevenueData}
            title={t("top-merchants-by-revenue")}
            tableTitle={t("merchants")}
            error={topMerchantByRevenueError}
            onRefresh={refetchTopMerchantByRevenue}
            loading={refreshingTopMerchantByRevenue}
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

export default PaymentHubOverallDashboard;
