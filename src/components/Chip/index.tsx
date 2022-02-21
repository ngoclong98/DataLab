import styles from "./Chip.module.scss";
interface ChipProps {
  selected?: boolean;
  text: string;
  className?: string;
  onClick?: (string) => void;
  inactiveContainerClassName?: string;
}

const Chip = ({
  selected,
  text,
  className,
  inactiveContainerClassName,
  onClick,
}: ChipProps) => {
  let containerClassName = selected
    ? styles.activeContainer
    : inactiveContainerClassName || "inactiveChipContainer";
  if (className) {
    containerClassName += " " + className;
  }
  const _handleClick = () => {
    if (onClick) {
      onClick(text);
    }
  };
  return (
    <div className={containerClassName} onClick={_handleClick}>
      {text}
    </div>
  );
};
export default Chip;
