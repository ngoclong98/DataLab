import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import styles from "./PopupConfirm.module.scss";
import HighlightText from "../HighlightText";
import Utils from "src/utils/Utils";
export interface PopupConfirmProps {
  visible?: boolean;
  children?: React.ReactNode;
  title?: string;
  content?: string;
  onOk?: () => void;
  okTitle?: string;
  onCancel?: () => void;
  cancelTitle?: string;
  showIcon?: boolean;
  onlyCancelButton?: boolean;
  onlyOkButton?: boolean;
  showClose?: boolean;
  image?: React.ReactNode;
  titleClassName?: string;
  showContactNow?: boolean;
  hotline?: string;
  replaceText?: Array<string>;
  largePopup?: boolean;
  behind?: boolean;
  fullscreen?: boolean;
}

const PopupConfirm = (props: PopupConfirmProps) => {
  const { t } = useTranslation();
  const {
    visible,
    children,
    onOk,
    onCancel,
    title,
    content,
    okTitle,
    cancelTitle,
    onlyCancelButton,
    onlyOkButton,
    titleClassName,
    showContactNow = false,
    hotline = t("hotline"),
    behind = false,
    fullscreen = false,
  } = props;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  const _renderFooter = () => {
    if (onlyOkButton) {
      return (
        <div className={styles.footer}>
          <Button variant="primary" onClick={onOk} className="flex1 fullWidth">
            {okTitle || t("confirm")}
          </Button>
        </div>
      );
    }
    if (onlyCancelButton) {
      return (
        <div className={styles.footer}>
          <Button
            variant="light"
            onClick={onCancel}
            className="flex1 fullWidth"
          >
            {cancelTitle || t("go-back")}
          </Button>
        </div>
      );
    }
    return (
      <div className={styles.footer}>
        <div className="rowStart fullWidth mb-3">
          <Button
            variant="light"
            onClick={onCancel}
            className="flex1 fullWidth"
          >
            {cancelTitle || t("go-back")}
          </Button>
        </div>

        {showContactNow ? (
          <div className="rowStart fullWidth">
            <a href={`tel:${hotline}`} className={styles.linkButton}>
              <Button
                variant="primary"
                onClick={onOk}
                className="flex1 fullWidth"
              >
                {okTitle || t("contact-now")}
              </Button>
            </a>
          </div>
        ) : (
          <div className="rowStart fullWidth">
            <Button
              variant="primary"
              onClick={onOk}
              className="flex1 fullWidth"
            >
              {okTitle || t("confirm")}
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (!visible) return <div />;
  if (fullscreen) {
    return (
      <Modal show={visible} centered fullscreen>
        {children}
      </Modal>
    );
  }
  return (
    <Modal
      show={visible}
      centered
      className={behind ? styles.behind : ""}
      contentClassName={styles.dialogContent}
    >
      <div className={styles.contentContainer}>
        <div
          className={
            titleClassName || "popupTitle textOnSurface text-center mb-4"
          }
        >
          {title || t("notification")}
        </div>
        {!!children ? (
          children
        ) : showContactNow ? (
          <HighlightText
            text={content ?? ""}
            replaceText={[Utils.formatPhoneNumber(hotline!) ?? ""]}
            className={"popupBody textOnSurface text-center"}
            highlightClassName={"w600"}
          />
        ) : (
          <div className="popupBody textOnSurface text-center">{content}</div>
        )}
      </div>
      {_renderFooter()}
    </Modal>
  );
};

export default PopupConfirm;
