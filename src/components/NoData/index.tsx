import noDataImg from "src/assets/images/no-data.png";
import noSearchResultImg from "src/assets/images/no-search-result.png";
import Image from "src/components/Image";
import styles from "./NoData.module.scss";
import { useTranslation } from "react-i18next";

interface NoDataProps {
  text?: string;
  searching?: boolean;
}
const NoData = ({ text, searching }: NoDataProps) => {
  const { t } = useTranslation();
  if (searching) {
    return (
      <div className="columnCenter mt100">
        <Image
          src={noSearchResultImg}
          className={styles.image}
          alt={"No Data"}
        />
        <div className="rowCenter text-center body18 textGray2">
          {t("no-search-result")}
        </div>
      </div>
    );
  }
  return (
    <div className="columnCenter mt100">
      <Image src={noDataImg} className={styles.image} alt={"No Data"} />
      <div className="rowCenter text-center body18 textGray2">{text}</div>
    </div>
  );
};
export default NoData;
