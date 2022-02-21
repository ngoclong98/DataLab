import Toolbar from "src/components/Toolbar";
import { useTranslation } from "react-i18next";
import styles from "./NotFound.module.scss";
import Button from "react-bootstrap/Button";
import notFoundImg from "src/assets/images/not-found.png";
import { useHistory } from "react-router";

const NotFound = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const _handleBack = () => {
    history.goBack();
  };

  return (
    <div className="screenContainer">
      <Toolbar title={t("app-name")} />
      <div className={`${styles.emptyStateContainer} screenScrollContainer`}>
        <img src={notFoundImg} className={styles.img} alt="Login error" />
        <div className="title18 text-center mb-4">{t("not-found-title")}</div>
        <div className="body14 textGray text-center mb48">
          {t("not-found-message")}
        </div>
        <Button variant="primary" onClick={_handleBack}>
          {t("go-back")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
