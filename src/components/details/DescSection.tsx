import ContentWrapper from "@/src/components/common/ContentWrapper";

type DescSectionProps = {
  title: string;
  desc: string;
  className?: string;
};

const DescSection = ({ title, desc, className = "" }: DescSectionProps) => {
  return (
    <ContentWrapper header="H2" title={title} className={`${className}`}>
      <div>{desc}</div>
    </ContentWrapper>
  );
};

export default DescSection;
