import React, { useRef, useState } from "react";
import { ArrowRepeat, ExclamationTriangleFill } from "react-bootstrap-icons";
import styles from "./ChartDataContainer.module.scss";
import { useTranslation } from "react-i18next";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import ProgressBar from "react-bootstrap/ProgressBar";
interface ChartDataContainerProps {
  error: any;
  children: React.ReactNode;
  loading: boolean;
  onRefresh?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ChartDataContainer = ({
  error,
  children,
  loading,
  onRefresh,
  onMouseEnter,
  onMouseLeave,
}: ChartDataContainerProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef<any>(null);
  const { t } = useTranslation();
  const _handleRefresh = () => {
    console.log("_handleRefresh");
    if (onRefresh) {
      onRefresh();
    }
  };

  const _handleClickExclamation = () => {
    setShowTooltip(!showTooltip);
  };

  const _renderLoadingOverlay = () => {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingContent}>
          <div className="text-center body14 mb-2">
            {t("loading-pleases-wait")}
          </div>
          <ProgressBar
            animated
            now={100}
            striped
            style={{ height: 6, borderRadius: 4 }}
          />
        </div>
      </div>
    );
  };

  const _handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter();
    }
  };

  const _hanldeMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  const _getErrorText = () => {
    console.log("Error", error?.response, error?.data);
    if (
      error?.response?.data?.error_code ===
      "period-is-93-day-older-than-current"
    ) {
      return t("err-maximun-support-date-range-yesterday");
    }
    return t("err-general-chart-data");
  };

  return (
    <div
      className="chartContainer"
      onMouseEnter={_handleMouseEnter}
      onMouseLeave={_hanldeMouseLeave}
    >
      <div className="position-relative">
        {children}
        {!!loading && _renderLoadingOverlay()}
        {!!error && (
          <div className={styles.refreshContainer}>
            <div
              className="d-flex flex-row align-items-center"
              onClick={_handleRefresh}
            >
              <ArrowRepeat className={styles.reloadIcon} />
              <div className="body14">{t("refresh")}</div>
            </div>
            <div ref={target}>
              <ExclamationTriangleFill
                className={styles.exclamationIcon}
                onClick={_handleClickExclamation}
              />
            </div>
            <Overlay target={target.current} show={showTooltip} placement="top">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  {_getErrorText()}
                </Tooltip>
              )}
            </Overlay>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChartDataContainer;
