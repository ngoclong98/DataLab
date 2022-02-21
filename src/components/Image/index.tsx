import { useState } from "react";
import styles from "./Image.module.scss";
interface ImageProps {
  className?: string;
  alt?: string;
  src?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}
const Image = ({ className, alt, onClick, ...props }: ImageProps) => {
  const [isError, setIsError] = useState<boolean>(false);

  const _handleError = () => {
    setIsError(true);
  };

  if (isError) {
    return (
      <div
        className={`${className} ${styles.errorPlaceholder}`}
        style={props.style || {}}
        onClick={onClick}
      />
    );
  }
  return (
    <img
      className={className}
      alt={alt}
      onClick={onClick}
      {...props}
      onError={_handleError}
    />
  );
};

export default Image;
