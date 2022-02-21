import { Suspense, useRef } from "react";
import "./styles/globals.scss";
import "./styles/chart.scss";
import "./styles/sidebar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/bootstrap.scss";
import "./styles/DatePicker.scss";
import "./styles/react-datepicker.css";
import GlobalPopupConfirm, {
  GlobalPopupConfirmRef,
} from "./components/GlobalPopupConfirm";
import UiService from "./services/UiService";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import LoadingModal, { LoadingModalRef } from "src/components/LoadingModal";
import LoadingChart, { LoadingChartRef } from "src/components/LoadingChart";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  UiService.popupInstance = useRef<GlobalPopupConfirmRef>();
  UiService.loadingInstance = useRef<LoadingModalRef>();
  UiService.loadingChartInstance = useRef<LoadingChartRef>();

  const _renderLoading = () => {
    return (
      <div className="columnCenter mt56">
        <div className="loadingSmall-spinner-rolling">
          <div className="loadingSmall">
            <div></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Suspense fallback={_renderLoading()}>
          <GlobalPopupConfirm ref={UiService.popupInstance} />
          <LoadingModal ref={UiService.loadingInstance} />
          <LoadingChart ref={UiService.loadingChartInstance} />
          <AppRouter />
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
