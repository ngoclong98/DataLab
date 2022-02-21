import React, { useState, useImperativeHandle } from "react";
import styles from "./LoadingChart.module.scss";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useTranslation } from "react-i18next";

export interface LoadingChartRef {
  open: () => void;
  close: () => void;
}
const LoadingChart = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));
  if (!visible) {
    return <div />;
  }
  return (
    <Modal show={visible} animation={false}>
      <div className={styles.popupModal}>
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
    </Modal>
  );
});
export default LoadingChart;
