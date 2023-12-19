type FormLabelProps = {
  label: string;
  inputId: string;
  labelClassName?: string;
  className?: string;
};

export default function FormLabel({
  label,
  inputId,
  labelClassName = "",
  className = "",
}: FormLabelProps) {
  return (
    <div className={`${className}`}>
      <label
        htmlFor={inputId}
        className={`fz13 fw-bold text-capitalize text-dark-color ${labelClassName}`}
      >
        {label}
      </label>
    </div>
  );
}
