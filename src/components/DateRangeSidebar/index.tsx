import DateInput from "src/components/DateInput";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DATE_RANGE_ITEMS,
  DATE_RANGE_VALUE,
  EXCHANGE_DATE_FORMAT,
} from "src/Constants";
import DateRangeItem from "src/models/DateRangeItem";
import Utils from "src/utils/Utils";
import DateRange from "src/models/DateRange";
import { CheckLg } from "react-bootstrap-icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./DateRangeSidebar.module.scss";
dayjs.extend(customParseFormat);
interface DateRangeSidebarProps {
  show: boolean;
  onHide: () => void;
  onSelectDateRange: (value: DateRange) => void;
  value?: DateRange;
}
const DateRangeSidebar = ({
  show,
  onHide,
  onSelectDateRange,
  value,
}: DateRangeSidebarProps) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [errorText, setErrorText] = useState<string>("");
  const [choosingCustomRange, setChoosingCustomRange] = useState<boolean>(
    value?.rangeType === DATE_RANGE_VALUE.CUSTOM
  );
  const [showingDatePicker, setShowingDatePicker] = useState<boolean>(false);
  const [showingDatePickerTimeout, setShowingDatePickerTimeout] = useState<
    NodeJS.Timeout | undefined
  >();
  const _handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
    setErrorText("");
  };

  const _handleClearStartDate = () => {
    setStartDate(undefined);
  };

  const _handleChangeEndDate = (newValue: Date) => {
    setEndDate(newValue);
    setErrorText("");
  };

  const _handleClearEndDate = () => {
    setEndDate(undefined);
  };

  const _handleApply = () => {
    if (!startDate || !endDate) {
      return;
    }
    const range = Math.abs(dayjs(startDate!).diff(dayjs(endDate), "day"));
    const yesterday = dayjs().subtract(1, "dayjs");
    const rangeFromYesterday = Math.abs(yesterday.diff(dayjs(startDate), "day"));
    if (endDate.getTime() < startDate.getTime()) {
      setErrorText(t("err-start-date-must-smaller-than-end-date"));
      return;
    } else if (rangeFromYesterday > 93) {
      setErrorText(t("err-maximun-support-date-range-yesterday"));
      return;
    } else if (range > 93) {
      setErrorText(t("err-maximun-support-date-range-yesterday"));
      return;
    } else {
      onHide();
      onSelectDateRange({
        rangeType: DATE_RANGE_VALUE.CUSTOM,
        startDate: Utils.formatDate(startDate, EXCHANGE_DATE_FORMAT),
        endDate: Utils.formatDate(endDate, EXCHANGE_DATE_FORMAT),
      });
    }
  };

  const _handleClickPredefineDateRangeItem = (item: DateRangeItem) => {
    console.log("_handleClickPredefineDateRangeItem", showingDatePicker);
    if (showingDatePicker) {
      return;
    }
    if (item.value === DATE_RANGE_VALUE.CUSTOM) {
      setChoosingCustomRange(true);
      if (value?.startDate) {
        setStartDate(
          Utils.covertToDate(value!.startDate!, EXCHANGE_DATE_FORMAT)
        );
      }
      if (value?.endDate) {
        setEndDate(Utils.covertToDate(value!.endDate!, EXCHANGE_DATE_FORMAT));
      }
    } else {
      setChoosingCustomRange(false);
      onHide();
      console.log("Date range", Utils.getPredefineDateRange(item.value));
      onSelectDateRange(Utils.getPredefineDateRange(item.value));
      setStartDate(undefined);
      setEndDate(undefined);
      setErrorText("");
    }
  };

  const _renderPredefineDateRange = (item: DateRangeItem, index: number) => {
    const selected =
      (!choosingCustomRange && item.value === value?.rangeType) ||
      (item.value === DATE_RANGE_VALUE.CUSTOM && choosingCustomRange);
    return (
      <div
        className={selected ? styles.rangeItemActive : styles.rangeItem}
        key={item.nameKey}
        onClick={() => _handleClickPredefineDateRangeItem(item)}
      >
        <div className="flex-fill">{t(item.nameKey)}</div>
        {selected && <CheckLg className={"checkIcon"} />}
      </div>
    );
  };

  const yesterday = useMemo(() => {
    return dayjs().subtract(1, "day").toDate();
  }, []);

  const _hide = () => {
    if (showingDatePicker) {
      return;
    }
    setChoosingCustomRange(false);
    setErrorText("");
    onHide();
  };

  const _toggleShowDatePicker = (newValue) => {
    console.log("_toggleShowDatePicker", newValue);
    if (newValue) {
      setShowingDatePicker(newValue);
      if (showingDatePickerTimeout) {
        clearTimeout(showingDatePickerTimeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setShowingDatePicker(newValue);
      }, 200);
      setShowingDatePickerTimeout(timeout);
    }
  };

  return (
    <Modal show={show} onHide={_hide} centered={true} keyboard={false}>
      {DATE_RANGE_ITEMS.map(_renderPredefineDateRange)}
      {choosingCustomRange && (
        <>
          <div className="bgBackground">
            <div className="mb-1">
              <DateInput
                placeholder={t("choose-start-date")}
                value={startDate}
                onChange={_handleChangeStartDate}
                onClear={_handleClearStartDate}
                maxDate={yesterday}
                hasError={!!errorText}
                onCalendarOpen={() => _toggleShowDatePicker(true)}
                onCalendarClose={() => _toggleShowDatePicker(false)}
              />
            </div>
            <div className="mb-1">
              <DateInput
                placeholder={t("choose-end-date")}
                value={endDate}
                onChange={_handleChangeEndDate}
                onClear={_handleClearEndDate}
                maxDate={yesterday}
                onCalendarOpen={() => _toggleShowDatePicker(true)}
                onCalendarClose={() => _toggleShowDatePicker(false)}
              />
            </div>
          </div>
          {!!errorText && (
            <div className="ps-3 pe-3 invalidText">{errorText}</div>
          )}

          <div className="m-3">
            <Button
              variant="primary"
              onClick={_handleApply}
              disabled={!startDate || !endDate || !!errorText}
            >
              {t("apply")}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DateRangeSidebar;
