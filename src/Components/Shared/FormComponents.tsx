import React, { useState, useEffect, useRef } from "react";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/CSS/datePicker.css";
interface FormInputProps {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  placeHolder?: string;
  maxLength?: number;
  validator?: (value: string) => string | null;
  autoFocus?: boolean;
  onChange?: (name: string, value: string) => void;
  onBlur?: () => void;
  error?: string | null;
}

export const FormInputField: React.FC<FormInputProps> = ({
  name,
  label,
  type,
  placeHolder,
  required = false,
  value: initialValue,
  validator,
  maxLength,
  autoFocus = false,
  onChange,
  onBlur,
  error: externalError = null,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(externalError);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setError(externalError);
  }, [externalError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
    if (touched && validator) {
      setError(validator(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
    if (onBlur) {
      onBlur();
    }
  };
  return (
    <div key={name} className="mb-3">
      <label
        htmlFor={name}
        className={`form-label mb-0 ${
          error ? "text-danger" : touched ? "" : ""
        }`}
      >
        {required ? "* " : ""}
        {label}
      </label>
      <input
        type={type}
        ref={inputRef}
        className={`form-control ${
          error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder={placeHolder}
        maxLength={maxLength}
      />
      {touched && error && <div className="invalid-feedback"></div>}
    </div>
  );
};

interface FormCheckboxProps {
  field: {
    name: string;
    label: string;
    require?: boolean;
  };
  formData: any;
  errors: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleBlur: (field: string) => void;
}

export const FormCheckboxField: React.FC<FormCheckboxProps> = ({
  field,
  formData,
  errors,
  handleChange,
  handleBlur,
}) => (
  <div key={field.name} className="form-check">
    <input
      className={`form-check-input ${
        errors[field.name]
          ? "is-invalid"
          : formData[field.name]
          ? "is-valid"
          : ""
      }`}
      type="checkbox"
      id={field.name}
      name={field.name}
      checked={formData[field.name]}
      onChange={handleChange}
      onBlur={() => handleBlur(field.name)}
      required={field.require}
    />
    <label className="form-check-label" htmlFor={field.name}>
      {field.label}
    </label>
    {errors[field.name] && (
      <div id={`${field.name}Feedback`} className="invalid-feedback">
        {errors[field.name]}
      </div>
    )}
  </div>
);

interface FormTextAreaProps {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  value: string;
  placeHolder?: string;
  maxLength?: number;
  validator?: (value: string) => string | null;
  autoFocus?: boolean;
  onChange?: (name: string, value: string) => void;
  onBlur?: () => void;

  error?: string | null;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  label,
  rows = 3,
  placeHolder,
  required = false,
  value: initialValue,
  validator,
  maxLength,
  autoFocus = false,
  onChange,
  onBlur,
  error: externalError = null,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(externalError);
  const [touched, setTouched] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setError(externalError);
  }, [externalError]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
    if (touched && validator) {
      setError(validator(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div key={name} className="mb-3">
      <label
        htmlFor={name}
        className={`form-label mb-0 ${
          error ? "text-danger" : touched ? "" : ""
        }`}
      >
        {required ? "* " : ""}
        {label}
      </label>
      <textarea
        ref={textAreaRef}
        className={`form-control ${
          error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder={placeHolder}
        maxLength={maxLength}
      />
      {touched && error && <div className="invalid-feedback"></div>}
    </div>
  );
};

interface FormSwitchProps {
  name: string;
  label: string;
  checked: boolean;
  required?: boolean;
  onChange?: (name: string, checked: boolean) => void;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({
  name,
  label,
  checked,
  required = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(name, newChecked);
    }
  };

  return (
    <div key={name} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        name={name}
        checked={isChecked}
        onChange={handleChange}
        required={required}
      />
      <label className="form-check-label" htmlFor={name}>
        {required ? "* " : ""}
        {label}
      </label>
    </div>
  );
};

interface FormSelectProps {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  defaultValue?: any;
  options: Array<any>;
  fieldId: string;
  fieldLabel: string;
  validator?: (value: string) => string | null;
  autoFocus?: boolean;
  onChange?: (name: string, value: string) => void;
  error?: string | null;
  onBlur?: () => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  required = false,
  value: initialValue,
  fieldId,
  fieldLabel,
  defaultValue,
  options,
  validator,
  autoFocus = false,
  onChange,
  onBlur,
  error: externalError = null,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(externalError);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setError(externalError);
  }, [externalError]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
    if (touched && validator) {
      setError(validator(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div key={name} className="mb-3">
      <label
        htmlFor={name}
        className={`form-label mb-0 ${
          error ? "text-danger" : touched ? "" : ""
        }`}
      >
        {required ? "* " : ""}
        {label}
      </label>
      <select
        className={`form-control form-select ${
          error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        autoFocus={autoFocus}
      >
        {defaultValue && (
          <option value={defaultValue?.[fieldId]}>
            {defaultValue?.[fieldLabel]}
          </option>
        )}
        {options.map((option) => (
          <option key={option[fieldId]} value={option[fieldId]}>
            {option[fieldLabel]}
          </option>
        ))}
      </select>
      {touched && error && <div className="invalid-feedback"></div>}
    </div>
  );
};

interface FormMaskedInputProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  placeHolder?: string;
  mask: string;
  maxLength?: number;
  validator?: (value: string) => string | null;
  autoFocus?: boolean;
  onChange?: (name: string, value: string) => void;
  onBlur?: () => void;
  error?: string | null;
}

export const FormMaskedInputField: React.FC<FormMaskedInputProps> = ({
  name,
  label,
  type = "mask",
  placeHolder,
  required = false,
  value: initialValue,
  validator,
  maxLength,
  autoFocus = false,
  onChange,
  onBlur,
  mask,
  error: externalError = null,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(externalError);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setError(externalError);
  }, [externalError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent
  ) => {
    const newValue = isInputMaskChangeEvent(e) ? e.value : e.target.value;
    setValue(newValue ?? ""); // Ensure newValue is a string
    if (onChange) {
      onChange(name, newValue ?? "");
    }
    if (touched && validator) {
      setError(validator(newValue ?? ""));
    }
  };

  const isInputMaskChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent
  ): e is InputMaskChangeEvent => {
    return (e as InputMaskChangeEvent).value !== undefined;
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div key={name} className="mb-3">
      <label
        htmlFor={name}
        className={`form-label mb-0 ${
          error ? "text-danger" : touched ? "" : ""
        }`}
      >
        {required ? "* " : ""}
        {label}
      </label>
      <InputMask
        ref={inputRef as React.Ref<InputMask>}
        className={`form-control ${
          error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder={placeHolder}
        maxLength={maxLength}
        mask={mask}
        slotChar={placeHolder}
      />
      {touched && error && <div className="invalid-feedback"></div>}
    </div>
  );
};

interface FormDatePickerProps {
  name: string;
  label: string;
  required?: boolean;
  value: Date | null;
  placeHolder?: string;
  validator?: (value: Date | null) => string | null;
  autoFocus?: boolean;
  onChange?: (name: string, value: Date) => void;
  onBlur?: () => void;
  error?: string | null;
}

export const FormDatePickerField: React.FC<FormDatePickerProps> = ({
  name,
  label,
  placeHolder,
  required = false,
  value: initialValue,
  validator,
  autoFocus = false,
  onChange,
  onBlur,
  error: externalError = null,
}) => {
  const [value, setValue] = useState<Date | null>(initialValue);
  const [error, setError] = useState<string | null>(externalError);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setError(externalError);
  }, [externalError]);

  const handleChange = (date: Date | null) => {
    const newValue = date || new Date();
    setValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
    if (touched && validator) {
      setError(validator(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator && value) {
      setError(validator(value));
    }
    if (onBlur) {
      onBlur();
    }
  };

  const CustomInput = ({
    value,
    onClick,
  }: {
    value: string;
    onClick: () => void;
  }) => (
    <div className="input-container">
      <input
        type="text"
        className={`form-control form-Date ${
          error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        onClick={onClick}
        value={value}
        onBlur={handleBlur}
        readOnly
        placeholder={placeHolder}
        required={required}
      />
      <FaCalendarAlt className="calendar-icon" onClick={onClick} />
    </div>
  );
  return (
    <div key={name} className="mb-3">
      <label
        htmlFor={name}
        className={`form-label mb-0 ${
          error ? "text-danger" : touched ? "" : ""
        }`}
      >
        {required ? "* " : ""}
        {label}
      </label>
      <DatePicker
        ref={inputRef}
        selected={value}
        onChange={handleChange}
        customInput={
          <CustomInput
            value={value ? value.toLocaleDateString() : ""}
            onClick={() => {}}
          />
        }
        required={required}
        placeholderText={placeHolder}
      />
      {touched && error && <div className="invalid-feedback"></div>}
    </div>
  );
};

//extra code
interface FormDatePicker2Props {
  name: string;
  label: string;
  required?: boolean;
  value: Date | null;
  placeHolder?: string;
  validator?: (value: Date | null) => string | null;
  autoFocus?: boolean;
  onChange?: (name: string, value: Date) => void;
  onBlur?: () => void;
  error?: string | null;
}

export const FormDatePicker: React.FC<FormDatePicker2Props> = ({
  name,
  label,
  placeHolder,
  required = false,
  value: initialValue,
  validator,
  autoFocus = false,
  onChange,
  onBlur,
  error: externalError = null,
}) => {
  const [value, setValue] = useState<Date | null>(initialValue);
  const [error, setError] = useState<string | null>(externalError);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setError(externalError);
  }, [externalError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value ? new Date(event.target.value) : null;
    setValue(newValue);
    if (onChange && newValue) {
      onChange(name, newValue);
    }
    if (touched && validator) {
      setError(validator(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator && value) {
      setError(validator(value));
    }
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div key={name} className="mb-3">
      <label
        htmlFor={name}
        className={`form-label mb-0 ${
          error ? "text-danger" : touched ? "" : ""
        }`}
      >
        {required ? "* " : ""}
        {label}
      </label>
      <input
        type="date"
        className={`form-control form-Date ${
          error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        onChange={handleChange}
        value={value ? value.toISOString().split("T")[0] : ""}
        onBlur={handleBlur}
        placeholder={placeHolder}
        required={required}
        ref={inputRef}
      />
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
