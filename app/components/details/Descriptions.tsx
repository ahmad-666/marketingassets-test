type DescriptionProps = {
  desc: string;
  className?: string;
};

const Descriptions = ({ desc, className = "" }: DescriptionProps) => {
  return (
    <div className={`${className}`}>
      <div>{desc}</div>
    </div>
  );
};

export default Descriptions;
