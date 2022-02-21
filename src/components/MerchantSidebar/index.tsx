import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Routes from "src/Routes";
import Toolbar from "../Toolbar";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import {
  selectListMerchant,
  saveSelectedMerchant,
  selectSelectedMerchantCode,
} from "src/redux/AuthSlice";
import Merchant from "src/models/Merchant";
import { Search } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import Input from "src/components/Input";
import Utils from "src/utils/Utils";
import { ACTIVE_STATUS, EMPTY_ARRAY } from "src/Constants";
import Button from "react-bootstrap/Button";
import ExpandableList from "src/components/ExpandableList";
interface MerchantSidebarGroup {
  header: MerchantSidebarHeader;
  data: MerchantSidebarItem[];
}

interface MerchantSidebarHeader {
  id: number;
  name: string;
}
interface MerchantSidebarItem {
  path?: string;
  name: string;
  merchant?: Merchant;
  isAll?: boolean;
}
interface MerchantSidebarProps {
  show: boolean;
  onHide: () => void;
}
const MerchantSidebar = ({ show, onHide }: MerchantSidebarProps) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const dispatch = useAppDispatch();
  const listMerchant = useAppSelector(selectListMerchant);
  const selectedMerchantCode = useAppSelector(selectSelectedMerchantCode);
  const [localSelectedMerchantCode, setLocalSelectedMerchantCode] =
    useState(selectedMerchantCode);
  // const [isExpanded, setExpanded] = useState(true);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const originSidebarData: MerchantSidebarGroup[] = [
    {
      header: {
        name: t("mb-payment-hub"),
        id: 1,
      },
      data: [
        {
          name: t("mb-payment-hub-all"),
          isAll: true,
          path: Routes.dashboard.path,
        },
        ...(!!listMerchant
          ? listMerchant?.map((item) => ({
              name: item.name,
              path: `${Routes.dashboard.path}?merchantCode=${item.code}`,
              merchant: item,
              isAll: false,
            }))
          : EMPTY_ARRAY),
      ],
    },
  ];

  const _buildSidebarData = (): MerchantSidebarGroup[] => {
    if (!keyword || !keyword.trim) {
      return originSidebarData;
    }
    const normalizedKeyword = Utils.removeAccent(keyword.toLowerCase());
    const filterData = originSidebarData
      .map((item) => ({
        ...item,
        data: item.data.filter((subItem) => {
          const normalizedName = Utils.removeAccent(subItem.name.toLowerCase());
          return normalizedName.indexOf(normalizedKeyword) > -1;
        }),
      }))
      .filter((item) => item.data.length > 0);
    return filterData;
  };

  const merchantSidebarData = _buildSidebarData();

  const _handleClickSidebarItem = (item: MerchantSidebarItem) => {
    setLocalSelectedMerchantCode(item?.merchant?.code || null);
  };

  const _handleChangeKeyword = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
  };

  const _handleClearKeyword = () => {
    setKeyword("");
  };

  const _handleApply = () => {
    _hide(false);
    dispatch(saveSelectedMerchant(localSelectedMerchantCode));
  };

  const _handleCancel = () => {
    _hide();
  };

  const _hide = (abort = true) => {
    setKeyword("");
    onHide();
    if (abort) {
      setLocalSelectedMerchantCode(selectedMerchantCode);
    }
  };

  const _isGroupSelected = (headerId: number): boolean => {
    const groupItem = originSidebarData.find(
      (item) => item.header.id === headerId
    );
    if (!groupItem) {
      return false;
    }
    return (
      groupItem.data.findIndex(
        (item) =>
          item?.merchant?.code === localSelectedMerchantCode ||
          (item.isAll && !localSelectedMerchantCode)
      ) > -1
    );
  };

  const _buildSidebarContent = () => {
    return merchantSidebarData.map((item, index) => {
      const isGroupSelected = _isGroupSelected(item.header.id);
      return (
        <ExpandableList
          key={item.header.id}
          id={item.header.id}
          title={item.header.name}
          selected={isGroupSelected}
        >
          {item.data.map((subItem, index) => {
            const isSubItemSelected =
              subItem.merchant?.code === localSelectedMerchantCode ||
              (subItem.isAll && !localSelectedMerchantCode);
            return (
              <div
                className={"sidebarItem"}
                onClick={() => _handleClickSidebarItem(subItem)}
                key={subItem.merchant?.code + "_" + index}
              >
                <div
                  className={
                    subItem.isAll ||
                    subItem.merchant?.activeStatus === ACTIVE_STATUS.ACTIVE
                      ? "sidebarActiveDot"
                      : "sidebarInactiveDot"
                  }
                />
                <div
                  className={`flex-fill ellipsisOne ${
                    isSubItemSelected ? "textPrimary" : "textOnSurface"
                  }`}
                >
                  {subItem.name}
                </div>
              </div>
            );
          })}
        </ExpandableList>
      );
    });
  };

  return (
    <Offcanvas show={show} onHide={_hide}>
      <Toolbar onClickPrefixIcon={_hide} title="" fixed={false} />
      <div className="sidebarTitleContaier">
        <div className="sidebarTitle">{t("merchants")}</div>
        <Input
          placeholder={t("search")}
          value={keyword}
          onChange={_handleChangeKeyword}
          leftComponent={<Search className={"sideBarSearchIcon"} />}
          onClear={_handleClearKeyword}
        />
      </div>
      <Offcanvas.Body className={"sidebarBody scrollable"}>
        <div>
          {merchantSidebarData.length === 0 && !!keyword?.trim() ? (
            <div className="sidebarNoResult">{t("no-result-found")}</div>
          ) : (
            _buildSidebarContent()
          )}
        </div>
        <div className="bottomButtonAbsoluteSpacer" />
        <div className="bottomButtonBlockAbsolute">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <Button
              variant="light"
              className="me-3 flex-fill"
              onClick={_handleCancel}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="primary"
              className="flex-fill"
              onClick={_handleApply}
            >
              {t("apply")}
            </Button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MerchantSidebar;
