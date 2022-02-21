import TokenInfo from "src/models/TokenInfo";

class AuthInfoService {
  static setTokenInfo(tokenInfo: TokenInfo) {
    localStorage.setItem("token_info", JSON.stringify(tokenInfo));
  }

  static getTokenInfo(): TokenInfo | null {
    const tokenInfoStr = localStorage.getItem("token_info");
    if (!tokenInfoStr) return null;
    try {
      const tokenInfo: TokenInfo = JSON.parse(tokenInfoStr);
      return tokenInfo;
    } catch (err) {
      console.log("Parse token err", err);
      return null;
    }
  }

  static clearTokenInfo() {
    localStorage.removeItem("token_info");
  }
}

export default AuthInfoService;
