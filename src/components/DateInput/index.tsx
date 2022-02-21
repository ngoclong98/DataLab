import { forwardRef } from "react";
import Form from "react-bootstrap/Form";
import Utils from "src/utils/Utils";
import { READABLE_DATE_FORMAT } from "src/Constants";
import DatePicker from "react-datepicker";

interface DateInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: Date) => void;
  value?: Date;
  errorText?: string;
  maxDate?: Date | null;
  labelHelperIcon?: React.ReactNode;
  onClear?: () => void;
  hasError?: boolean;
  onCalendarOpen?: () => void;
  onCalendarClose?: () => void;
}

const DateInput = ({
  label,
  required,
  placeholder,
  onChange,
  value,
  errorText,
  labelHelperIcon,
  onClear,
  hasError,
  ...passProps
}: // value,
// onChange,
DateInputProps) => {
  // const _handleChangeDate = (value: DayValue) => {
  //   if (onChange != null && value) {
  //     onChange(new Date(value.year, value.month - 1, value.day));
  //   }
  // };

  const CustomInput = forwardRef<HTMLDivElement, any>(
    ({ value, onClick }: any, ref) => (
      <div
        className="d-flex flex-row justify-content-between align-items-center fullWidth"
        ref={ref}
        onClick={onClick}
      >
        <div className="body14 textOnSurface">{placeholder}</div>
        <div
          onClick={onClick}
          className={hasError ? "datePickerInputError" : "datePickerInput"}
        >
          {value ? Utils.formatDate(value, READABLE_DATE_FORMAT) : ""}
        </div>
      </div>
    )
  );

  const _handleChangeDate = (date, event) => {
    console.log("_handleChangeDate", date, event);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="ps-3 pe-3">
      {!!label && (
        <Form.Label htmlFor="identity-card-type" className="fullWidth">
          <div className="rowStart flex1 body14 w600 textGray">
            {label}
            {required && <span className="required"> *</span>}
            {labelHelperIcon && labelHelperIcon}
          </div>
        </Form.Label>
      )}
      <DatePicker
        onChange={_handleChangeDate}
        selected={value}
        customInput={<CustomInput />}
        showFullMonthYearPicker
        fixedHeight
        {...passProps}
      />
    </div>
  );
};

export default DateInput;
