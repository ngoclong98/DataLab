import {
  REPLACE_IDENTIFIER,
  DATE_RANGE_VALUE,
  EXCHANGE_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
  CHART_TYPE,
  FULL_DAY_AND_DATE_FORMAT,
  DATE_RANGE_ITEMS,
} from "src/Constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DateRange from "src/models/DateRange";
import { Day } from "@hassanmojab/react-modern-calendar-datepicker";
import { iteratorSymbol } from "immer/dist/internal";
import { TFunction } from "react-i18next";
import { TableInfoItem, TableInfoMapping } from "src/components/TableInfo";
dayjs.extend(customParseFormat);
export default class Utils {
  static isValidEmail(str: string) {
    if (!str) return false;
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = emailRegex.test(str);
    if (result === true) {
      if (str[str.indexOf("@") + 1] === "-" || str[str.length - 1] === "-") {
        return false;
      }
    }
    return result;
  }

  static isValidPhoneNumer(str: string) {
    if (!str) return false;
    if (str.length !== 10) return false;
    if (str[0] !== "0") return false;
    let phoneRegexStr = "^\\d{10}$";
    let phoneRegex = new RegExp(phoneRegexStr);
    return phoneRegex.test(str);
  }

  static removeAccent = (str: string): string => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  };

  static censorPhoneNumber = (phone: string) => {
    let splitArr = phone.split("");
    splitArr.splice(3, 3, "x", "x", "x");
    return splitArr.join("");
  };

  static censorGTTT = (gttt: string) => {
    let splitArr = gttt.split("");
    splitArr.splice(3, 2, "x", "x");
    return splitArr.join("");
  };

  static formatDate = (date: Date, format = "DD/MM/YYYY") => {
    return dayjs(date).format(format);
  };

  static covertToDate = (dateStr: string, format = "DD/MM/YYYY"): Date => {
    return dayjs(dateStr, format).toDate();
  };

  static formatDateFromString = (
    dateStr: string,
    inputFormat: string,
    outputFormat: string
  ): string => {
    return dayjs(dateStr, inputFormat).format(outputFormat);
  };

  static formatToFullDayAndDate = (dateStr: string) => {
    return Utils.formatDateFromString(
      dateStr + dayjs(dateStr).day(),
      EXCHANGE_DATE_FORMAT,
      FULL_DAY_AND_DATE_FORMAT
    );
  };

  static formatDonutData = (
    response?: any,
    names?: string[],
    currentValues?: number[],
    previousValues?: number[],
    percents?: number[],
    changes?: number[]
  ) => {
    const dailyDatas = names?.map((item, index) => {
      return {
        name: item,
        currentFromDate: response?.fromCurrentDate,
        currentToDate: response?.toCurrentDate,
        previousFromDate: response?.fromPreviousDate,
        previousToDate: response?.toPreviousDate,
        value: currentValues?.[index],
        previousValue: previousValues?.[index],
        percent: percents?.[index],
        changePercent: changes?.[index],
      };
    });

    return { ...response, dailyDatas };
  };

  static formatResponseData = (
    response?: any,
    mappingFn?: (item: any) => any,
    type: string | null = "normal"
  ): any => {
    // console.log("formatResponseData", { response, type });
    let dailyDatas = [];
    if (type === "new-returning") {
      dailyDatas = response?.newUserDailyDatas.map((item, index) => {
        let newItem = {
          dateCurrent: item.dateCurrent,
          newUserNbCurrent: item.nbCurrent,
          newUserPercent: item.percent,
          returningUserNbCurrent:
            response?.returningNewUserDailyDatas?.[index]?.nbCurrent,
          returningUserPercent:
            response?.returningNewUserDailyDatas?.[index]?.percent,
        };
        // console.log("newItem", newItem);
        if (mappingFn) {
          newItem = mappingFn(newItem);
          // console.log("After mapping", newItem);
        }
        return {
          ...newItem,
          date: Utils.formatDateFromString(
            item.dateCurrent,
            EXCHANGE_DATE_FORMAT,
            DISPLAY_DATE_FORMAT
          ),
        };
      });
    } else {
      dailyDatas = response?.dailyDatas.map((item, index) => {
        let newItem = item;
        if (mappingFn) {
          newItem = mappingFn(newItem);
        }
        return {
          ...newItem,
          date: Utils.formatDateFromString(
            item.dateCurrent,
            EXCHANGE_DATE_FORMAT,
            DISPLAY_DATE_FORMAT
          ),
        };
      });
    }
    // console.log("dailyDatas", dailyDatas);
    return {
      ...response,
      dailyDatas,
    };
  };

  static mappingTableData = (tableInfoMapping: TableInfoMapping) => {
    const tableData: TableInfoItem[] = [];
    tableInfoMapping.nameKeys.map((item, index) => {
      tableData.push({
        name: item,
        value: tableInfoMapping.valueKeys[index],
        displayValue: tableInfoMapping.displayValueKeys[index],
        changePercent: tableInfoMapping.changePercentKeys[index],
        previousValue: tableInfoMapping.previousValueKeys?.[index],
        displayPreviousValue:
          tableInfoMapping.displayPreviousValueKeys?.[index],
        currentFromDate: tableInfoMapping?.currentFromDateKey,
        currentToDate: tableInfoMapping?.currentToDateKey,
        previousFromDate: tableInfoMapping?.previousFromDateKey,
        previousToDate: tableInfoMapping?.previousToDateKey,
      });
    });

    return tableData;
  };

  static getFileBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  };

  static getFileType = (file: File) => {
    if (file.name.toLowerCase().endsWith("pdf")) {
      return "PDF";
    }
    if (
      file.name.toLowerCase().endsWith("jpg") ||
      file.name.toLowerCase().endsWith("jpeg")
    ) {
      return "JPG";
    }
    if (file.name.toLowerCase().endsWith("png")) {
      return "PNG";
    }
    return "";
  };

  static getReplaceText = (
    text: string,
    replaceValue,
    replaceIdentifier?: string
  ): string => {
    return text.replace(replaceIdentifier || REPLACE_IDENTIFIER, replaceValue);
  };

  static getReplaceTextMulti = (
    text: string,
    replaceValue: string[],
    replaceIdentifier: string = REPLACE_IDENTIFIER
  ): string => {
    const splitTextArr = text.split(replaceIdentifier);
    console.log("Split arr", splitTextArr);
    let newText = "";
    for (let i = 0; i < splitTextArr.length; i++) {
      newText += splitTextArr[i];
      if (i < splitTextArr.length - 1) {
        newText += replaceValue[i];
      }
    }
    return newText;
  };

  static isValidUploadImageSize = (imageFile: File) => {
    return imageFile.size < 5242880;
  };

  static isValidImageFileType = (imageFile: File) => {
    const lowerCaseName = imageFile.name.toLowerCase();
    return (
      lowerCaseName.endsWith(".pdf") ||
      lowerCaseName.endsWith(".jpg") ||
      lowerCaseName.endsWith(".jpeg") ||
      lowerCaseName.endsWith(".png")
    );
  };

  static isNotContainSpecialCharacter = (text: string) => {
    const notContainSpecialCharacterRegexStr = "^[a-zA-Z0-9]+$";
    let notContainSpecialCharacterRegex = new RegExp(
      notContainSpecialCharacterRegexStr
    );
    return notContainSpecialCharacterRegex.test(text);
  };

  static formatPhoneNumber = (phone: string): string | null => {
    let cleaned = ("" + phone).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{4})(\d+)$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return null;
  };

  static formatNumber = (
    value,
    toMillion: boolean | null = true,
    notation?: "standard" | "compact",
    maxDigits?: number
  ) => {
    if (!value || !+value) return value;
    const formatter = new Intl.NumberFormat("en-US", {
      notation: notation || "standard",
      maximumFractionDigits: maxDigits,
    });
    if (value >= 1000000 && toMillion)
      return formatter.format(parseInt((value / 1000000).toFixed(0))) + "M";

    return formatter.format(+value);
  };

  static isScrollToEnd = (e: any) => {
    const target = e.target;
    return (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      45
    );
  };

  static getPredefineDateRange = (value): DateRange => {
    const now = dayjs();
    switch (value) {
      case DATE_RANGE_VALUE.ALL_TIME: {
        const yesterday = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate: null, endDate: yesterday, rangeType: value };
      }
      case DATE_RANGE_VALUE.YESTERDAY: {
        const yesterday = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate: yesterday, endDate: yesterday, rangeType: value };
      }

      case DATE_RANGE_VALUE.WEEK_TO_DATE: {
        if (now.day() === 0) {
          // Sunday
          const startDate = now
            .subtract(1, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else if (now.day() === 1) {
          // Monday
          const startDate = now
            .subtract(1, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else {
          const startDate = now
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        }
      }

      case DATE_RANGE_VALUE.MONTH_TO_DATE: {
        // First day of month
        console.log("Now date", now.date());
        if (now.date() === 1) {
          const startDate = now
            .subtract(1, "month")
            .startOf("month")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now
            .subtract(1, "month")
            .endOf("month")
            .format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else {
          const startDate = now.startOf("month").format(EXCHANGE_DATE_FORMAT);
          const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        }
      }

      case DATE_RANGE_VALUE.LAST_WEEK:
      default: {
        // Sunday
        if (now.day() === 0) {
          const startDate = now
            .subtract(2, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now
            .subtract(2, "week")
            .endOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        } else {
          const startDate = now
            .subtract(1, "week")
            .startOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          const endDate = now
            .subtract(1, "week")
            .endOf("week")
            .add(1, "day")
            .format(EXCHANGE_DATE_FORMAT);
          return { startDate, endDate, rangeType: value };
        }
      }

      case DATE_RANGE_VALUE.LAST_MONTH: {
        const previousMonth = now.subtract(1, "month");
        const startDate = previousMonth
          .startOf("month")
          .format(EXCHANGE_DATE_FORMAT);
        const endDate = previousMonth
          .endOf("month")
          .format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_7_DAY: {
        const startDate = now.subtract(7, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_28_DAY: {
        const startDate = now.subtract(28, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_30_DAY: {
        const startDate = now.subtract(30, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }

      case DATE_RANGE_VALUE.LAST_90_DAY: {
        const startDate = now.subtract(90, "day").format(EXCHANGE_DATE_FORMAT);
        const endDate = now.subtract(1, "day").format(EXCHANGE_DATE_FORMAT);
        return { startDate, endDate, rangeType: value };
      }
    }
  };

  static isNullOrEmpty = (value: any): boolean => {
    return (
      typeof value === "undefined" ||
      value == null ||
      (typeof value === "string" && (value === "" || value.trim() === ""))
    );
  };

  static isNullOrUndefined = (value: any): boolean => {
    return typeof value === "undefined" || value == null;
  };

  static convertDateToDay = (value: Date): Day => {
    return {
      day: value.getDate(),
      month: value.getMonth() + 1,
      year: value.getFullYear(),
    };
  };

  static shouldShowChart = (
    chartType: CHART_TYPE,
    dateRange: DateRange
  ): boolean => {
    switch (dateRange.rangeType) {
      case DATE_RANGE_VALUE.WEEK_TO_DATE:
      case DATE_RANGE_VALUE.MONTH_TO_DATE:
      case DATE_RANGE_VALUE.LAST_WEEK:
      case DATE_RANGE_VALUE.LAST_MONTH:
      case DATE_RANGE_VALUE.LAST_7_DAY:
      case DATE_RANGE_VALUE.LAST_28_DAY:
      case DATE_RANGE_VALUE.LAST_30_DAY:
      case DATE_RANGE_VALUE.LAST_90_DAY:
      case DATE_RANGE_VALUE.CUSTOM: {
        return true;
      }
      case DATE_RANGE_VALUE.ALL_TIME: {
        // case DATE_RANGE_VALUE.LAST_90_DAY: {
        if (
          chartType === CHART_TYPE.LINE ||
          chartType === CHART_TYPE.BAR ||
          chartType === CHART_TYPE.AREA
        ) {
          return false;
        }
        return true;
      }
      // case DATE_RANGE_VALUE.CUSTOM: {
      //   if (!dateRange.startDate || !dateRange.endDate) {
      //     return true;
      //   }
      //   const range = Math.abs(
      //     dayjs(dateRange.startDate!).diff(dayjs(dateRange.endDate), "day")
      //   );
      //   if (range <= 30) {
      //     if (chartType === CHART_TYPE.FUNNEL) {
      //       return false;
      //     }
      //     return true;
      //   } else {
      //     if (
      //       chartType === CHART_TYPE.LINE ||
      //       chartType === CHART_TYPE.BAR ||
      //       chartType === CHART_TYPE.AREA
      //     ) {
      //       return false;
      //     }
      //     return true;
      //   }
      // }

      default: {
        return true;
      }
    }
  };

  static getDisplayDateRange = (
    dateRange: DateRange,
    t: TFunction<"translation", undefined>
  ): string => {
    const selectedDateRange = DATE_RANGE_ITEMS.find(
      (item) => item.value === dateRange.rangeType
    );
    const range = Math.abs(
      dayjs(dateRange.startDate!).diff(dayjs(dateRange.endDate), "day")
    );
    let nameKey = selectedDateRange?.nameKey || "";
    if (selectedDateRange?.value === DATE_RANGE_VALUE.CUSTOM) {
      nameKey = "custom";
    }
    if (dateRange.rangeType === DATE_RANGE_VALUE.ALL_TIME) {
      return t(nameKey);
    }

    if (range < 1) {
      return `${t(nameKey)} (${Utils.formatDateFromString(
        dateRange.startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D"
      )})`;
    }
    const isSameMonth = dayjs(dateRange.startDate!).isSame(
      dayjs(dateRange.endDate!),
      "month"
    );
    const isSameYear = dayjs(dateRange.startDate!).isSame(
      dayjs(dateRange.endDate!),
      "year"
    );
    if (isSameYear && isSameMonth) {
      return `${t(nameKey)} (${Utils.formatDateFromString(
        dateRange.startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM"
      )} ${Utils.formatDateFromString(
        dateRange.startDate!,
        EXCHANGE_DATE_FORMAT,
        "D"
      )} - ${Utils.formatDateFromString(
        dateRange.endDate!,
        EXCHANGE_DATE_FORMAT,
        "D"
      )})`;
    } else if (isSameYear && !isSameMonth) {
      return `${t(nameKey)} (${Utils.formatDateFromString(
        dateRange.startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D"
      )} - ${Utils.formatDateFromString(
        dateRange.endDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D"
      )})`;
    } else {
      return `${t(nameKey)} (${Utils.formatDateFromString(
        dateRange.startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D, YYYY"
      )} - ${Utils.formatDateFromString(
        dateRange.endDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D, YYYY"
      )})`;
    }
  };

  static getDisplayDateRange2 = (
    startDate: string,
    endDate: string
  ): string => {
    const range = Math.abs(dayjs(startDate!).diff(dayjs(endDate), "day"));

    if (range < 1) {
      return `${Utils.formatDateFromString(
        startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D"
      )}`;
    }
    const isSameMonth = dayjs(startDate!).isSame(dayjs(endDate!), "month");
    const isSameYear = dayjs(startDate!).isSame(dayjs(endDate!), "year");
    if (isSameYear && isSameMonth) {
      return `${Utils.formatDateFromString(
        startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM"
      )} ${Utils.formatDateFromString(
        startDate!,
        EXCHANGE_DATE_FORMAT,
        "D"
      )} - ${Utils.formatDateFromString(endDate!, EXCHANGE_DATE_FORMAT, "D")}`;
    } else if (isSameYear && !isSameMonth) {
      return `${Utils.formatDateFromString(
        startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D"
      )} - ${Utils.formatDateFromString(
        endDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D"
      )}`;
    } else {
      return `${Utils.formatDateFromString(
        startDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D, YYYY"
      )} - ${Utils.formatDateFromString(
        endDate!,
        EXCHANGE_DATE_FORMAT,
        "MMM D, YYYY"
      )}`;
    }
  };
}
