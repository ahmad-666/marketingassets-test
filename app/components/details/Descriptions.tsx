type DescriptionProps = {
  title: string;
  desc: string;
  className?: string;
};

const Descriptions = ({ title, desc, className = "" }: DescriptionProps) => {
  return (
    <div className={`${className}`}>
      <h4 className="mb30">{title}</h4>
      <div>{desc}</div>
    </div>
  );
};

export default Descriptions;
