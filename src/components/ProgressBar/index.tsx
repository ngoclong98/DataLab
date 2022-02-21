import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  progress: number;
  finished?: boolean;
}
const ProgressBar = ({ progress, finished }: ProgressBarProps) => {
  const _getProgress = (): number => {
    if (finished || progress >= 1) return 100;
    return progress * 100;
  };
  return (
    <div className={styles.container}>
      <div
        style={{ width: _getProgress() + "%" }}
        className={finished ? styles.progressFinished : styles.progress}
      />
    </div>
  );
};
export default ProgressBar;
