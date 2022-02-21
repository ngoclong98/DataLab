import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loading from "src/components/Loading";
import PullToRefresh from "react-simple-pull-to-refresh";
import Row from "react-bootstrap/Row";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import {
  fetchMerchantAndProfile,
  selectSelectedMerchant,
} from "src/redux/AuthSlice";
import DashboardToolbar from "src/components/DashboardToolbar";
import PaymentHubOverallDashboard from "./PaymentHubOverallDashboard";
// import DashboardAbstract from "./Dashboard";
import PaymentHubNoPaymentDashboard from "./PaymentHubNoPaymentDashboard";
import PaymentHubNonRecurringPaymentDashboard from "./PaymentHubNonRecurringPaymentDashboard";
import PaymentHubRecurringPaymentDashboard from "./PaymentHubRecurringPaymentDashboard";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const merchant = useAppSelector(selectSelectedMerchant);
  const _handleRefresh = async () => {
    console.log("Refreshing");
  };

  useEffect(() => {
    dispatch(fetchMerchantAndProfile());
  }, []);

  const _handleScroll = (e) => {};

  const _renderOverallDashboard = () => {
    return <PaymentHubOverallDashboard />;
  };

  const _renderNoPaymentDashboard = () => {
    return <PaymentHubNoPaymentDashboard />;
  };

  const _renderRecurringPaymentDashboard = () => {
    return <PaymentHubRecurringPaymentDashboard />;
  };

  const _renderNonRecurringPaymentDashboard = () => {
    return <PaymentHubNonRecurringPaymentDashboard />;
  };

  const _renderDashboard = () => {
    if (!merchant) {
      return _renderOverallDashboard();
    } else if (!merchant.useInstantPayment) {
      return _renderNoPaymentDashboard();
    } else if (merchant.useInstantPayment && !merchant.useAutoDebit) {
      return _renderNonRecurringPaymentDashboard();
    } else {
      return _renderRecurringPaymentDashboard();
    }
  };

  return (
    <div className="screenContainer">
      <DashboardToolbar title={merchant?.name || "MB Payment Hub"} />

      <PullToRefresh
        onRefresh={_handleRefresh}
        refreshingContent={<Loading containerClassName="columnCenter" />}
      >
        <div
          className="screenScrollContainer refreshContent"
          onScroll={_handleScroll}
        >
          <div className={"dashboardContent"}>
            <Row className="g-md-2">{_renderDashboard()}</Row>
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default Dashboard;
