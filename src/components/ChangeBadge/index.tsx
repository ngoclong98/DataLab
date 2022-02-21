import { TriangleFill } from "react-bootstrap-icons";
import styles from "./ChangeBadge.module.scss";
interface ChangeBadgerProps {
  value: number;
  size: "small" | "normal";
}

const ChangeBadge = ({ value, size = "small" }: ChangeBadgerProps) => {
  const isDecrease = value < 0;

  const _getTriagleClassName = () => {
    if (size === "small") {
      return isDecrease ? styles.decreaseIconSmall : styles.increaseIconSmall;
    }

    return isDecrease ? styles.decreaseIcon : styles.increaseIcon;
  };

  const _getItemClassName = () => {
    if (size === "small") {
      return isDecrease
        ? styles.changeItemSmallDecrease
        : styles.changeItemSmallIncrease;
    }
    return isDecrease ? styles.changeItemDecrese : styles.changeItemIncrease;
  };

  return (
    <div className={_getItemClassName()}>
      <TriangleFill
        className={_getTriagleClassName()}
        style={{
          transform: isDecrease ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
      <span
        className={`${isDecrease ? "textDanger" : "textSuccess"} ${
          size === "small" ? "subTitle12" : "subTitle14"
        }`}
      >
        {Math.abs(value!)}%
      </span>
    </div>
  );
};

export default ChangeBadge;
