import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/redux/hook";
import { selectSelectedMerchantCode } from "src/redux/AuthSlice";
import { selectDateRange } from "src/redux/DashboardSlice";
import DashboardApi from "src/api/dashboard";
import Utils from "src/utils/Utils";
import useRequest from "src/hooks/UseRequest";

export const useMerchantData = () => {
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getMerchant,
    dateRange.startDate,
    dateRange.endDate
  );
  return {
    response: {
      ...response,
      changePercent: response?.percent,
      previousFromDate: response?.fromPreviousDate,
      previousToDate: response?.toPreviousDate,
    },
    ...restReq,
  };
};

export const useSessionData = () => {
  const { t } = useTranslation();
  const merchantCode = useAppSelector(selectSelectedMerchantCode);
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getSession,
    merchantCode!,
    dateRange.startDate,
    dateRange.endDate
  );
  const sessionData = useMemo(
    () =>
      Utils.formatResponseData(response, (item) => ({
        ...item,
        [t("sessions")]: item.nbCurrent,
        [t("comparison-period")]: item.nbPreviousPeriod,
      })),
    [response, t]
  );
  return {
    response: {
      ...sessionData,
      changePercent: sessionData.percent,
      previousFromDate: sessionData?.fromPreviousDate,
      previousToDate: sessionData?.toPreviousDate,
    },
    ...restReq,
  };
};

export const useUserData = () => {
  const { t } = useTranslation();
  const merchantCode = useAppSelector(selectSelectedMerchantCode);
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getUsers,
    merchantCode!,
    dateRange.startDate,
    dateRange.endDate
  );

  const usersData = useMemo(
    () =>
      Utils.formatResponseData(response, (item) => ({
        ...item,
        [t("users")]: item.nbCurrent,
        [t("comparison-period")]: item.nbPreviousPeriod,
      })),
    [response, t]
  );
  return {
    response: {
      ...usersData,
      changePercent: usersData.percent,
      previousFromDate: usersData?.fromPreviousDate,
      previousToDate: usersData?.toPreviousDate,
    },
    ...restReq,
  };
};

export const useNewReturningUserData = () => {
  const { t } = useTranslation();
  const merchantCode = useAppSelector(selectSelectedMerchantCode);
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getNewReturningUser,
    merchantCode!,
    dateRange.startDate,
    dateRange.endDate
  );

  const newReturningUserData = useMemo(
    () =>
      Utils.formatResponseData(
        response,
        (item) => ({
          ...item,
          [t("new-users")]: item.newUserNbCurrent,
          [t("returning-users")]: item.returningUserNbCurrent,
          [t("new-users") + "_percent"]: item.newUserPercent,
          [t("returning-users") + "_percent"]: item.returningUserPercent,
        }),
        "new-returning"
      ),
    [response, t]
  );
  return { response: newReturningUserData, ...restReq };
};

export const usePurchaseData = () => {
  const { t } = useTranslation();
  const merchantCode = useAppSelector(selectSelectedMerchantCode);
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getPurchases,
    merchantCode!,
    dateRange.startDate,
    dateRange.endDate
  );
  const purchasesData = useMemo(
    () =>
      Utils.formatResponseData(response, (item) => ({
        ...item,
        [t("purchases")]: item.nbCurrent,
        [t("comparison-period")]: item.nbPreviousPeriod,
      })),
    [response, t]
  );
  // console.log("purchasesData", purchasesData);
  return {
    response: {
      ...purchasesData,
      changePercent: purchasesData.percent,
      previousFromDate: purchasesData?.fromPreviousDate,
      previousToDate: purchasesData?.toPreviousDate,
    },
    ...restReq,
  };
};

export const useRevenueData = () => {
  const { t } = useTranslation();
  const merchantCode = useAppSelector(selectSelectedMerchantCode);
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getRevenue,
    merchantCode!,
    dateRange.startDate,
    dateRange.endDate
  );

  const revenueData = useMemo(
    () =>
      Utils.formatResponseData(response, (item) => ({
        ...item,
        [t("revenue")]: item.nbCurrent,
        [t("comparison-period")]: item.nbPreviousPeriod,
      })),
    [response, t]
  );
  return {
    response: {
      ...revenueData,
      changePercent: revenueData.percent,
      previousFromDate: revenueData?.fromPreviousDate,
      previousToDate: revenueData?.toPreviousDate,
    },
    ...restReq,
  };
};

export const useRevenueByMethodData = () => {
  const { t } = useTranslation();
  const merchantCode = useAppSelector(selectSelectedMerchantCode);
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getRevenueByMethod,
    merchantCode!,
    dateRange.startDate,
    dateRange.endDate
  );

  {
    /*1 accountPercent: 100
     2 accountPreviousPeriodPercent: 153.9
     1 cardPercent: 0
     2 cardPreviousPeriodPercent: 414.2
     3 fromCurrentDate: "2022-01-16"
     3 fromPreviousDate: "2021-12-18"
     3 toCurrentDate: "2022-02-14"
     3 toPreviousDate: "2022-01-16"
     4 total: 3185415544
     5 totalAccount: 3178615644
     6 totalCard: 6799900
     4 totalPrevious: 1253202594
     5 totalPreviousAccount: 1251880094
     6 totalPreviousCard: 1322500
     2 totalPreviousPeriodPercent: 154.2 */
  }

  const rbmData = useMemo(
    () =>
      Utils.formatDonutData(
        response,
        [t("account"), t("card")],
        [response?.totalAccount, response?.totalCard],
        [response?.totalPreviousAccount, response?.totalPreviousCard],
        [response?.accountPercent, response?.cardPercent],
        [
          response?.accountPreviousPeriodPercent,
          response?.cardPreviousPeriodPercent,
        ]
      ),
    [response, t]
  );
  // console.log("rbmdata", rbmData);

  return { response: rbmData, ...restReq };
};

export const useTopMerchantBySessionData = () => {
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getTopMerchantBySession,
    dateRange.startDate,
    dateRange.endDate
  );

  const topMerchantData = response?.map((item) => ({
    ...item,
    name: item.merchant?.code,
    value: item.totalNbCurrentSession,
    previousValue: item.totalNbPreviousPeriodSession,
    displayValue: Utils.formatNumber(item.totalNbCurrentSession, false),
    displayPreviousValue: Utils.formatNumber(
      item.totalNbPreviousPeriodSession,
      false
    ),
    changePercent: item.percent,
    previousFromDate: item.fromPreviousDate,
    previousToDate: item.toPreviousDate,
  }));
  return { response: topMerchantData, ...restReq };
};

export const useTopMerchantByRevenueData = () => {
  const dateRange = useAppSelector(selectDateRange);
  const { response, ...restReq } = useRequest(
    DashboardApi.getTopMerchantByRevenue,
    dateRange.startDate,
    dateRange.endDate
  );
  const topMerchantData = response?.map((item) => ({
    ...item,
    name: item.merchant?.code,
    value: item.sumRevenueCurrent,
    previousValue: item.sumRevenuePreviousPeriod,
    displayValue: Utils.formatNumber(item.sumRevenueCurrent),
    displayPreviousValue: Utils.formatNumber(item.sumRevenuePreviousPeriod),
    changePercent: item.percent,
    previousFromDate: item.fromPreviousDate,
    previousToDate: item.toPreviousDate,
  }));
  return { response: topMerchantData, ...restReq };
};
