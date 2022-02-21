import { ArrowLeft } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import styles from "./Toolbar.module.scss";
import React from "react";

type ToolbarProps = {
  title: string;
  onClickPrefixIcon?: () => void;
  showPrefixIcon?: boolean;
  type?: "normal" | "gradient";
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  suffixIcon2?: React.ReactNode;
  onClickSuffixIcon?: () => void;
  toolbarClassName?: string;
  fixed?: boolean;
};

const Toolbar = (props: ToolbarProps) => {
  const {
    title,
    onClickPrefixIcon,
    showPrefixIcon = true,
    suffixIcon,
    onClickSuffixIcon,
    toolbarClassName,
    prefixIcon,
    fixed = true,
    suffixIcon2,
  } = props;
  const history = useHistory();

  const _handleBack = useCallback(() => {
    if (onClickPrefixIcon) {
      onClickPrefixIcon();
      return;
    }
    if (history.length >= 2) {
      history.goBack();
    }
  }, [history, onClickPrefixIcon]);

  return (
    <div
      className={`toolbarContainerTop ${
        fixed ? styles.fixedToolbarContainer : styles.toolbarContainer
      }`}
    >
      <div
        className={
          !!toolbarClassName
            ? toolbarClassName + " " + styles.toolbar
            : styles.toolbar
        }
      >
        {!!showPrefixIcon ? (
          <div onClick={_handleBack}>
            {prefixIcon ? prefixIcon : <ArrowLeft className={"toolbarIcon"} />}
          </div>
        ) : (
          <div className={styles.backIconPlaceholder}></div>
        )}
        <div className={styles.titleContainer}>
          <div className={"ellipsisOne toolbarTitle textOnSurface"}>
            {title}
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          {!!suffixIcon && <div onClick={onClickSuffixIcon}>{suffixIcon}</div>}
          {!!suffixIcon2 && suffixIcon2}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
