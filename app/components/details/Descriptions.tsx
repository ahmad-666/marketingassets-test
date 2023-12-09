type DescriptionProps = {
  title: string;
  desc: string;
  className?: string;
};

const Descriptions = ({ title, desc, className = "" }: DescriptionProps) => {
  return (
    <div className={`listing_single_description ${className}`}>
      <h4>{title}</h4>
      <div className="mt30">{desc}</div>
    </div>
  );
};

export default Descriptions;
