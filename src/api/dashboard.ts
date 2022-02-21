import { get, post } from "./common";

export default class DashboardApi {
  static getMerchant(fromDate: string | null, toDate: string | null) {
    return get({
      url: "/api/frontend/paymenthub/merchant",
      params: { fromDate, toDate },
    });
  }
  static getSession(
    merchantCode: string,
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/session",
      params: { merchantCode, fromDate, toDate },
    });
  }

  static getNewReturningUser(
    merchantCode: string,
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/new-returning-user",
      params: { merchantCode, fromDate, toDate },
    });
  }

  static getUsers(
    merchantCode: string,
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/user",
      params: { merchantCode, fromDate, toDate },
    });
  }

  static getPurchases(
    merchantCode: string,
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/purchases",
      params: { merchantCode, fromDate, toDate },
    });
  }

  static getRevenue(
    merchantCode: string,
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/revenue",
      params: { merchantCode, fromDate, toDate },
    });
  }

  static getRevenueByMethod(
    merchantCode: string,
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/revenue-by-method",
      params: { merchantCode, fromDate, toDate },
    });
  }

  static getTopMerchantBySession(
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/top-merchant-session",
      params: { fromDate, toDate },
    });
  }

  static getTopMerchantByRevenue(
    fromDate: string | null,
    toDate: string | null
  ) {
    return get({
      url: "/api/frontend/paymenthub/top-merchant-revenue",
      params: { fromDate, toDate },
    });
  }
}
