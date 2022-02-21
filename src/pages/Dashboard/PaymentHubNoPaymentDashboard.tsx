import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ComposedChartInfo from "src/components/ComposedChartInfo";
import Col from "react-bootstrap/Col";

import { CHART_TYPE, COLORS } from "src/Constants";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";
import Utils from "src/utils/Utils";
import UiService from "src/services/UiService";
import {
  useNewReturningUserData,
  useSessionData,
  useUserData,
} from "src/hooks/UseDashboard";

const PaymentHubNoPaymentDashboard = () => {
  const { t } = useTranslation();
  const dateRange = useAppSelector(selectDateRange);
  const {
    response: sessionData,
    loading: loadingSession,
    error: sessionError,
    refetch: refetchSession,
    refreshing: refreshingSession,
  } = useSessionData();

  const {
    response: newReturningUserData,
    loading: loadingNewReturningUser,
    error: newReturningUserError,
    refetch: refetchNewReturningUser,
    refreshing: refreshingNewReturningUser,
  } = useNewReturningUserData();
  console.log("newReturningUserData: ", newReturningUserData);

  const {
    response: usersData,
    loading: loadingUser,
    error: userError,
    refetch: refetchUser,
    refreshing: refreshingUser,
  } = useUserData();

  useEffect(() => {
    if (loadingSession && loadingUser && loadingNewReturningUser) {
      UiService.showLoadingChart();
    }
    if (!loadingSession && !loadingUser && !loadingNewReturningUser) {
      UiService.hideLoadingChart();
    }
  }, [loadingSession, loadingUser, loadingNewReturningUser]);

  return (
    <>
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
      {Utils.shouldShowChart(CHART_TYPE.LINE, dateRange) && (
        <Col md={6} className="align-items-stretch">
          <ComposedChartInfo
            title={t("new-returning-user")}
            // data={newReturningUserData?.dailyDatas}
            data={newReturningUserData}
            xAxisDataKey="date"
            areaDataKeys={[t("new-users"), t("returning-users")]}
            areaColors={[COLORS.CORN_FLOWER_BLUE, COLORS.LIGHT_CORAL]}
            areaOpacity={0.3}
            // tableData={[
            //   {
            //     name: t("new-users"),
            //     value: newReturningUserData?.totalNbNewUser || 0,
            //     changePercent: newReturningUserData?.percentNewUser || 0,
            //   },
            //   {
            //     name: t("returning-users"),
            //     value: newReturningUserData?.totalNbReturningUser || 0,
            //     changePercent: newReturningUserData?.percentReturningUser || 0,
            //   },
            // ]}
            loading={refreshingNewReturningUser}
            error={newReturningUserError}
            onRefresh={refetchNewReturningUser}
            tooltipType={"seperate"}
          />
        </Col>
      )}
    </>
  );
};

export default PaymentHubNoPaymentDashboard;
