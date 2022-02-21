import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export interface DropdownItem {
  value: string;
  name: string;
}
interface DropdownInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  values?: Array<DropdownItem>;
  value?: string;
  onChange?: (value?: string) => void;
  errorText?: string;
  labelHelperIcon?: React.ReactNode;
}

const DropdownInput = ({
  label,
  required,
  placeholder,
  values,
  value,
  onChange,
  errorText,
  labelHelperIcon,
}: DropdownInputProps) => {
  const _renderOption = (item: DropdownItem, index: number) => {
    return (
      <option value={item.value} key={item.value}>
        {item.name}
      </option>
    );
  };

  const _handleChange = (e) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      {!!label && (
        <Form.Label htmlFor="identity-card-type" className="fullWidth">
          <div className="rowStart flex1 body14 w600 textGray">
            {label}
            {required && <span className="required"> *</span>}
            {labelHelperIcon && labelHelperIcon}
          </div>
        </Form.Label>
      )}
      <InputGroup className="mb-4" hasValidation={!!errorText}>
        <Form.Select
          id="identity-card-type"
          value={value}
          onChange={_handleChange}
          isInvalid={!!errorText}
        >
          {!!placeholder && <option value={""}>{placeholder}</option>}
          {!!values && values.map(_renderOption)}
        </Form.Select>
        {!!errorText && (
          <Form.Control.Feedback type="invalid">
            {errorText}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </div>
  );
};

export default DropdownInput;
