import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Input from "src/components/Input";
import styles from "./Login.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Utils from "src/utils/Utils";
import AuthApi from "src/api/auth";
import UiService from "src/services/UiService";
import AuthInfoService from "src/services/AuthInfoService";
import Routes from "src/Routes";
import { useAppDispatch } from "src/redux/hook";
import { fetchMerchantAndProfile } from "src/redux/AuthSlice";
const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errUsername, setErrUsername] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");

  const _handleChangeUsername = (e) => {
    setErrUsername("");
    setUsername(e.target.value);
  };

  const _handleChangePassword = (e) => {
    setErrPassword("");
    setPassword(e.target.value);
  };

  const _handleLogin = async () => {
    if (Utils.isNullOrEmpty(username)) {
      setErrUsername(t("err-email-required"));
      return;
    }
    if (Utils.isNullOrEmpty(password)) {
      setErrPassword(t("err-password-required"));
      return;
    }
    try {
      UiService.showLoading();
      const loginRes = await AuthApi.login(username, password);
      console.log("loginRes", loginRes);
      AuthInfoService.setTokenInfo(loginRes?.data);
      await dispatch(fetchMerchantAndProfile());
      history.replace(Routes.dashboard.path);
      UiService.hideLoading();
    } catch (err: any) {
      console.log("Login err", err, err?.response);
      UiService.hideLoading();
      if (err?.response?.data?.error_code === "invalid-email") {
        setErrUsername(t("err-invalid-email"));
      } else if (err?.response?.data?.error_code === "bad-credential") {
        setErrPassword(t("err-bad-credential"));
      }
    }
  };

  return (
    <div className="screenContainer">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className={styles.loginFormCard}>
            <div className={styles.loginTitle}>{t("app-name")}</div>
            <div className="mb-4">
              <Input
                label={t("username")}
                value={username}
                onChange={_handleChangeUsername}
                errorText={errUsername}
              />
            </div>
            <div className="mb-5">
              <Input
                label={t("password")}
                value={password}
                onChange={_handleChangePassword}
                type="password"
                errorText={errPassword}
              />
            </div>
            <Button variant="primary" onClick={_handleLogin}>
              {t("login")}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
