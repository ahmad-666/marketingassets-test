//component to wrap content in specific width

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return <div className={`container-section ${className}`}>{children}</div>;
}
