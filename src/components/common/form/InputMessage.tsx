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
      <span className={`fs-6 ${error ? "text-danger" : "color-gray"}`}>
        {error || hint}
      </span>
    </div>
  );
}
