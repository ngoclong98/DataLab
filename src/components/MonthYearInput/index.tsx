import { useRef, useState } from "react";
import styles from "./MonthYearInput.module.scss";
import ModalBottomSheet from "src/components/ModalBottomSheet";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import calendarImg from "src/assets/images/calendar.svg";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import Image from "src/components/Image";

const NUM_OF_YEAR = 40;
const MONTH_DATA: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const YEAR_DATA: number[] = Array.from(Array(NUM_OF_YEAR), (_, i) => i + 1).map(
  (i) => dayjs().year() - (NUM_OF_YEAR / 2 - i)
);
const WHEEL_ITEM_HEIGHT = 48;
interface MonthYearInputProps {
  label: string;
  value?: string;
  labelHelperIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  placeholder?: string;
  errorText?: string;
}

const MonthYearInput = ({
  value,
  label,
  labelHelperIcon,
  onChange,
  placeholder,
  errorText,
}: MonthYearInputProps) => {
  const { t } = useTranslation();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const monthWheelRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const yearWheelRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const _openDateBottomSheet = () => {
    setShowBottomSheet(true);
    _listenMonthWheelScroll();
    _listenYearWheelScroll();
    setTimeout(() => {
      let month = _getMonthValueFromValueStr();
      let year = _getYearValueFromValueStr();
      if (!month || !year) {
        month = dayjs().month() + 1;
        year = dayjs().year();
      }
      const monthIndexOnWheel = MONTH_DATA.findIndex((item) => item === month);
      const yearIndexOnWheel = YEAR_DATA.findIndex((item) => item === year);
      const monthWheel = monthWheelRef.current;
      const yearWheel = yearWheelRef.current;
      monthWheel.scrollTo({
        top: monthIndexOnWheel * WHEEL_ITEM_HEIGHT,
        behavior: "auto",
      });
      yearWheel.scrollTo({
        top: yearIndexOnWheel * WHEEL_ITEM_HEIGHT,
        behavior: "auto",
      });
    }, 250);
  };

  const _closeDateBottomSheet = () => {
    setShowBottomSheet(false);
    _removeListenMonthWheelScroll();
    _removeListenYearWheelScroll();
  };

  const _handleClickInput = () => {
    _openDateBottomSheet();
  };

  const _handleCloseBottomSheet = () => {
    _closeDateBottomSheet();
  };

  const _handleAgreeDate = () => {
    _closeDateBottomSheet();
    const month = _getMonthValueFromWheel();
    const year = _getYearValueFromWheel();
    console.log("Month year value", { month, year });
    if (onChange) {
      onChange(_getMonthYearValue(month, year));
    }
  };

  const _getRefineScrollPosition = (scrollTop: number): number => {
    const floorPosition =
      Math.floor(scrollTop / WHEEL_ITEM_HEIGHT) * WHEEL_ITEM_HEIGHT;
    if (scrollTop < floorPosition + WHEEL_ITEM_HEIGHT / 2) {
      return floorPosition;
    } else {
      return floorPosition + WHEEL_ITEM_HEIGHT;
    }
  };

  const _renderWheelItem = (item: string, index: number) => {
    return (
      <div className={styles.wheelItem} key={item + "_" + index}>
        <span className="body24 w600 textBlack">{item}</span>
      </div>
    );
  };

  const _handleScrollMonthWheel = (e) => {
    _checkScrollMonthPosition(e.target.scrollTop);
  };

  const _checkScrollMonthPosition = debounce((scrollTop: number) => {
    const monthWheel = monthWheelRef.current;
    monthWheel?.scrollTo({
      top: _getRefineScrollPosition(scrollTop),
      behavior: "smooth",
    });
  }, 300);

  const _listenMonthWheelScroll = () => {
    setTimeout(() => {
      const monthWheel = monthWheelRef.current;
      monthWheel?.addEventListener("scroll", _handleScrollMonthWheel);
    }, 200);
  };

  const _removeListenMonthWheelScroll = () => {
    const monthWheel = monthWheelRef.current;
    monthWheel?.removeEventListener("scroll", _handleScrollMonthWheel);
  };

  const _handleScrollYearWheel = (e) => {
    _checkScrollYearPosition(e.target.scrollTop);
  };

  const _checkScrollYearPosition = debounce((scrollTop: number) => {
    const yearWheel = yearWheelRef.current;
    yearWheel?.scrollTo({
      top: _getRefineScrollPosition(scrollTop),
      behavior: "smooth",
    });
  }, 300);

  const _listenYearWheelScroll = () => {
    setTimeout(() => {
      const yearWheel = yearWheelRef.current;
      yearWheel?.addEventListener("scroll", _handleScrollYearWheel);
    }, 200);
  };

  const _removeListenYearWheelScroll = () => {
    const yearWheel = yearWheelRef.current;
    yearWheel?.removeEventListener("scroll", _handleScrollYearWheel);
  };

  const _getMonthValueFromWheel = () => {
    const monthWheel = monthWheelRef.current;
    return MONTH_DATA[Math.floor(monthWheel.scrollTop / WHEEL_ITEM_HEIGHT)];
  };

  const _getYearValueFromWheel = () => {
    const yearWheel = yearWheelRef.current;
    return YEAR_DATA[Math.floor(yearWheel.scrollTop / WHEEL_ITEM_HEIGHT)];
  };

  const _getMonthValueFromValueStr = (): number | null => {
    if (!value) return null;
    const splitMonthYear = value.split("-");
    if (splitMonthYear.length !== 2) return null;
    return +splitMonthYear[1];
  };

  const _getMonthYearValue = (month: number, year: number) => {
    return `${year}-${month < 10 ? "0" + month : month}`;
  };

  const _getYearValueFromValueStr = (): number | null => {
    if (!value) return null;
    const splitMonthYear = value.split("-");
    if (splitMonthYear.length !== 2) return null;
    return +splitMonthYear[0];
  };

  const _getMonthYearDisplay = (value: string) => {
    const splitMonthYear = value.split("-");
    if (splitMonthYear.length !== 2) return "";
    return splitMonthYear[1] + "/" + splitMonthYear[0].substr(-2);
  };

  const _renderWheel = (
    data: number[],
    ref: React.MutableRefObject<HTMLDivElement>
  ) => {
    return (
      <div className={styles.wheelContainerOuter}>
        <div className={styles.selectedWheel}></div>
        <div className={styles.wheelContainer} ref={ref}>
          {["", "", ...data.map((item) => item + ""), "", ""].map(
            _renderWheelItem
          )}
        </div>
      </div>
    );
  };

  const _renderBottomSheet = () => {
    return (
      <ModalBottomSheet
        visible={showBottomSheet}
        showHeader={true}
        title={t("choose-date")}
        onClose={_handleCloseBottomSheet}
      >
        <div className={styles.bottomSheetContent}>
          <div className={styles.monthYearContainer}>
            <div className="rowStart">
              <div className="flex1 me-3">
                <div className="form-label">{t("month")}</div>
                {_renderWheel(MONTH_DATA, monthWheelRef)}
              </div>
              <div className="flex1">
                <div className="form-label">{t("year")}</div>
                {_renderWheel(YEAR_DATA, yearWheelRef)}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <Button
              variant="primary"
              onClick={_handleAgreeDate}
              className="fullWidth"
            >
              {t("confirm")}
            </Button>
          </div>
        </div>
      </ModalBottomSheet>
    );
  };

  return (
    <>
      {_renderBottomSheet()}
      <div>
        <div className="rowStart flex1 body14 w600 textGray form-label">
          {label}
          {labelHelperIcon && labelHelperIcon}
        </div>
        <div className={styles.input} onClick={_handleClickInput}>
          <div className={`flex1 ${value ? "textBlack" : "textPlaceholder"}`}>
            {value ? _getMonthYearDisplay(value) : placeholder}
          </div>
          <Image
            src={calendarImg}
            className={styles.calendarIcon}
            alt={"Calendar"}
          />
        </div>
        {!!errorText && <div className="invalidText">{errorText}</div>}
      </div>
    </>
  );
};

export default MonthYearInput;
