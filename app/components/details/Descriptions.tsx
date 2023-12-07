type DescriptionProps = {
  desc: string;
  className?: string;
};

const Descriptions = ({ desc, className = "" }: DescriptionProps) => {
  return (
    <div className={`${className}`}>
      <h4 className="mb30">Description</h4>
      <div>{desc}</div>
    </div>
  );
};

export default Descriptions;
