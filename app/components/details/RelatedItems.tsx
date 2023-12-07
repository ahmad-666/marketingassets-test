import CompaniesList from "@/app/components/listing/CompaniesList";
import type { Company } from "@/app/types/Company";

type RelatedItems = {
  items: Company[];
  industry: string;
  pageSize?: number;
  className?: string;
};
export default function RelatedItems({
  items = [],
  pageSize = 12,
  industry,
  className = "",
}: RelatedItems) {
  return (
    <div className={`${className}`}>
      <CompaniesList
        title="Related Companies"
        items={items}
        pageSize={pageSize}
        industry={industry}
        showMore={false}
      />
    </div>
  );
}
