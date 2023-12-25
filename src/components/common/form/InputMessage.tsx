type InputMessageProps = {
  error?: string;
  hint?: string;
  className?: string;
};

export default function InputMessage({
  error,
  hint,
  className = "",
}: InputMessageProps) {
  return (
    <div className={`${className}`}>
      <span className={`fz13 ${error ? "text-danger" : "color-gray"}`}>
        {error || hint}
      </span>
    </div>
  );
}
