import React from "react";
import { GlobalPopupConfirmRef } from "../components/GlobalPopupConfirm";
import { PopupConfirmProps } from "../components/PopupConfirm";
import { LoadingModalRef } from "src/components/LoadingModal";
import { LoadingChartRef } from "src/components/LoadingChart";
class UiService {
  static popupInstance: React.MutableRefObject<
    GlobalPopupConfirmRef | undefined
  >;
  static loadingInstance: React.MutableRefObject<LoadingModalRef | undefined>;
  static loadingChartInstance: React.MutableRefObject<
    LoadingChartRef | undefined
  >;

  static openPopup(data: PopupConfirmProps) {
    UiService.popupInstance?.current?.open(data);
  }

  static closePopup() {
    UiService.popupInstance?.current?.close();
  }

  static showLoading() {
    UiService.loadingInstance?.current?.open();
  }

  static hideLoading() {
    UiService.loadingInstance?.current?.close();
  }

  static showLoadingChart() {
    UiService.loadingChartInstance?.current?.open();
  }

  static hideLoadingChart() {
    UiService.loadingChartInstance?.current?.close();
  }
}

export default UiService;
