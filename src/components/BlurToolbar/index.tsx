import styles from "./BlurToolbar.module.scss";
import backImg from "src/assets/images/back-white.svg";
import Image from "src/components/Image";
import { useHistory } from "react-router-dom";
interface BlurToolbarProps {
  rightComponent?: React.ReactNode;
  className?: string;
  leftComponent?: React.ReactNode;
  title?: string;
}
const BlurToolbar = ({
  leftComponent,
  rightComponent,
  className,
  title,
}: BlurToolbarProps) => {
  const history = useHistory();
  const _handleBack = () => {
    history.goBack();
  };
  return (
    <div
      className={`toolbarContainerTop ${styles.outerContainer}${
        !!className ? " " + className : ""
      }`}
    >
      <div className={styles.container}>
        {!!title && (
          <div className={styles.titleContainer}>
            <div className={`ellipsisOne body12 w500 textOnPrimary`}>
              {title}
            </div>
          </div>
        )}
        {!!leftComponent ? (
          leftComponent
        ) : (
          <div className={styles.backBtn} onClick={_handleBack}>
            <Image src={backImg} className={styles.backImg} />
          </div>
        )}
        {!!rightComponent && rightComponent}
      </div>
    </div>
  );
};
export default BlurToolbar;
