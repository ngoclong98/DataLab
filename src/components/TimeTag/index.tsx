import styles from "./TimeTag.module.scss";

interface TimeTagProps {
  margin: number;
  text: string;
}
const TimeTag = ({ margin, text }: TimeTagProps) => {
  return (
    <div className={styles.timeTag} style={{ margin: margin }}>
      <div className="body12 textBlack">{text}</div>
    </div>
  );
};

export default TimeTag;
