import React, { useEffect } from "react";
import styles from "./BottomSheet.module.scss";
import closeWhiteImg from "src/assets/images/close-white.svg";

export interface BottomSheetProps {
  visible: boolean;
  children?: React.ReactNode;
  showIndicator?: boolean;
  onClose?: () => void;
  darkOverlay?: boolean;
  showHeader?: boolean;
  title?: string;
}

const BottomSheet = (props: BottomSheetProps) => {
  const {
    visible,
    children,
    showHeader = true,
    darkOverlay = true,
    title,
    onClose,
  } = props;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  if (!visible) return <div />;
  return (
    <div
      className={styles.bottomSheetOverlay}
      style={{
        backgroundColor: darkOverlay ? "rgba(0, 0, 0, 0.2)" : "transparent",
      }}
    >
      <div className="flex1" />
      <div className={styles.bottomSheetContainer}>
        {showHeader && (
          <div className={styles.header}>
            <img
              src={closeWhiteImg}
              className={styles.closeImg}
              alt="Close"
              onClick={onClose}
            />
            {title && (
              <div className={styles.headerTitleContainer}>
                <div className="body14 textOnPrimary w600">{title}</div>
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
export default BottomSheet;
