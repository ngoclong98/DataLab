import TokenInfo from "src/models/TokenInfo";
import useLocalStorage from "./UseLocalStorage";

const useTokenInfo = (): TokenInfo | null => {
  const [tokenInfo] = useLocalStorage<TokenInfo>("token_info");
  return tokenInfo;
};

export default useTokenInfo;
