import React, { useState, useImperativeHandle } from "react";
import styles from "./LoadingModal.module.scss";
import Modal from "react-bootstrap/Modal";

export interface LoadingModalRef {
  open: () => void;
  close: () => void;
}
const LoadingModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));

  if (!visible) return <div />;
  return (
    <Modal show={visible} animation={false}>
      <div className={styles.popupModal}>
        <div className="loadingSmall-spinner-rolling">
          <div className="loadingSmall">
            <div></div>
          </div>
        </div>
      </div>
    </Modal>
  );
});
export default LoadingModal;
