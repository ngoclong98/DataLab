// @ts-ignore
// @ts-nocheck
import React, { useState } from "react";
import Toolbar from "src/components/Toolbar";
import { ListUl, Calendar3 } from "react-bootstrap-icons";
import MerchantSidebar from "src/components/MerchantSidebar";
import DateRangeSidebar from "src/components/DateRangeSidebar";
import DateRange from "src/models/DateRange";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { selectDateRange, saveDateRange } from "src/redux/DashboardSlice";
import { logout } from "src/redux/AuthSlice";
import Dropdown from "react-bootstrap/Dropdown";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import styles from "./DashboardToolbar.module.scss";
import { useTranslation } from "react-i18next";
import UiService from "src/services/UiService";
interface DashboardToolbarProps {
  title: string;
}

const TheeDotTrigger = React.forwardRef(({ onClick }, ref) => (
  <a
    href="/logout"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <ThreeDotsVertical className={styles.threeDotIcon} />
  </a>
));

const DashboardToolbar = ({ title }: DashboardToolbarProps) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [showDateRangeSidebar, setShowDateRangeSidebar] =
    useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector(selectDateRange);

  const _handleShowChooseMerchant = () => {
    console.log("_handleShowChooseMerchant");
    _toggleSideBar();
  };

  const _toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const _toggleDateRangeSideBar = () => {
    setShowDateRangeSidebar(!showDateRangeSidebar);
  };

  const _handleShowChooseDateRange = () => {
    _toggleDateRangeSideBar();
  };

  const _handleSelectDateRange = (value: DateRange) => {
    dispatch(saveDateRange(value));
  };

  const _handleLogout = async (e) => {
    console.log("_handleLogout");
    e.preventDefault();
    try {
      UiService.showLoading();
      await dispatch(logout()).unwrap();
      UiService.hdieLoading();
    } catch (e) {
      // handle error here
      console.log("Dispatch logout err", e);
      UiService.hdieLoading();
    }
  };

  const _renderMore = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle
          variant=""
          id="dropdown-basic"
          as={TheeDotTrigger}
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={_handleLogout}>
            {t("logout")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div>
      <MerchantSidebar show={showSideBar} onHide={_toggleSideBar} />
      <DateRangeSidebar
        show={showDateRangeSidebar}
        onHide={_toggleDateRangeSideBar}
        onSelectDateRange={_handleSelectDateRange}
        value={dateRange}
      />
      <Toolbar
        title={title}
        onClickPrefixIcon={_handleShowChooseMerchant}
        onClickSuffixIcon={_handleShowChooseDateRange}
        prefixIcon={<ListUl className="toolbarIcon" />}
        suffixIcon={<Calendar3 className="toolbarIcon" />}
        suffixIcon2={_renderMore()}
      />
    </div>
  );
};

export default DashboardToolbar;
