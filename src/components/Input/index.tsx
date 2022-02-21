import React, { useImperativeHandle, useRef } from "react";
import Form from "react-bootstrap/Form";
import closeGrayImg from "src/assets/images/clear.svg";
import styles from "./Input.module.scss";
import Image from "src/components/Image";
interface InputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  leftComponent?: React.ReactNode;
  errorText?: string;
  maxLength?: number;
  value?: string;
  autoFocus?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit?: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  showDefautErrorIcon?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  inputMode?:
    | "text"
    | "search"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined;
  rightComponent?: React.ReactNode;
  onClear?: () => void;
  type?: string;
}

const Input = React.forwardRef(
  (
    {
      label,
      required,
      leftComponent,
      errorText,
      showDefautErrorIcon = true,
      className,
      containerClassName,
      rightComponent,
      onClear,
      ...props
    }: InputProps,
    ref
  ) => {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useImperativeHandle(ref, () => ({
      blur: () => {
        inputRef?.current.blur();
      },
    }));

    const _handleClear = () => {
      onClear && onClear();
      inputRef?.current?.focus();
    };

    const _handleKeyUp = (event) => {
      if (event.key === "Enter") {
        inputRef?.current?.blur();
      }
    };

    return (
      <div className={"flex1"}>
        {!!label && (
          <Form.Label className="fullWidth">
            <div className="rowStart fullWidth">
              <div className="rowStart flex1 body13 textGray3">{label}</div>
            </div>
          </Form.Label>
        )}
        <div
          className={
            containerClassName
              ? containerClassName + " " + styles.inputContainer
              : styles.inputContainer
          }
        >
          {!!leftComponent && leftComponent}
          <input
            {...props}
            ref={inputRef}
            onKeyUp={_handleKeyUp}
            className={
              className ? className + " " + styles.input : styles.input
            }
            enterKeyHint="done"
          />
          {onClear && props.value ? (
            <div>
              <Image
                src={closeGrayImg}
                alt="clear"
                className={styles.searchImg}
                onClick={_handleClear}
              />
            </div>
          ) : (
            !!rightComponent && rightComponent
          )}
        </div>
        {!!errorText && <div className="invalidText">{errorText}</div>}
      </div>
    );
  }
);

export default Input;
