import Toolbar from "src/components/Toolbar";
import { useTranslation } from "react-i18next";
import styles from "./NoInternet.module.scss";
import noInternetImg from "src/assets/images/no-internet.png";
import Button from "react-bootstrap/Button";
import UiService from "src/services/UiService";
import Image from "src/components/Image";
const NoInternet = () => {
  const { t } = useTranslation();

  const _handleBack = () => {
    UiService.closePopup();
  };

  const _handleRetry = () => {
    UiService.closePopup();
  };

  return (
    <div className="screenContainer">
      <Toolbar title={t("no-internet-title")} onClickPrefixIcon={_handleBack} />
      <div className={`${styles.emptyStateContainer} screenScrollContainer`}>
        <Image src={noInternetImg} className={styles.noInternetImg} alt="No " />
        <div className="title18 text-center mb-4">{t("no-internet")}</div>
        <div className="body14 textGray text-center mb48">
          {t("no-internet-detail")}
        </div>
        <Button variant="primary" onClick={_handleRetry}>
          {t("retry")}
        </Button>
      </div>
    </div>
  );
};

export default NoInternet;
