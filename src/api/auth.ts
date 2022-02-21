import { get, post } from "./common";

export default class AuthApi {
  static login(email: string, password: string) {
    return post({
      url: "/api/frontend/account/email/login",
      params: { email, password },
    });
  }

  static logout() {
    return post({ url: "/authentication/logout" });
  }

  static refreshToken(refreshToken: string) {
    return post({
      url: "/authentication/refresh-token",
      params: { refreshToken },
    });
  }

  static async getProfile() {
    const profileRes = await get({
      url: "/api/frontend/account/profile",
    });
    return profileRes?.data;
  }
  static async getMerchant() {
    const merchantRes = await get({ url: "/api/frontend/merchant" });
    return merchantRes?.data;
  }
}
