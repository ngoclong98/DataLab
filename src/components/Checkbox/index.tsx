import checkboxCheckedImg from "src/assets/images/checkbox-checked.svg";
import checkboxDisabledImg from "src/assets/images/checkbox-disabled.svg";
import styles from "./Checkbox.module.scss";
interface CheckboxProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  text?: string;
  textComponent?: React.ReactNode;
}
const Checkbox = ({
  checked,
  onChange,
  text,
  textComponent,
}: CheckboxProps) => {
  const _handleChange = (e) => {
    // console.log("On Change cb", e.target.checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div onClick={_handleChange} className="rowStart">
      {/* <input type="checkbox" checked={checked} onChange={_handleChange} /> */}
      <img
        src={checked ? checkboxCheckedImg : checkboxDisabledImg}
        className={styles.checkboxImg}
        alt={"Checkbox"}
      />
      {textComponent ? (
        textComponent
      ) : (
        <span
          className={`ms-2 body16 w600 ${checked ? "textBlack" : "textGray"}`}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
