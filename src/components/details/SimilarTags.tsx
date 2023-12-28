import { Fragment } from "react";
import { Tag } from "@/src/types/Common";
import Link from "next/link";
import ContentWrapper from "@/src/components/common/ContentWrapper";

type SimilarTagsProps = {
  title: string;
  tags: Tag[];
  className?: string;
};

export default function SimilarTags({
  title,
  tags = [],
  className = "",
}: SimilarTagsProps) {
  return (
    <ContentWrapper header="H4" title={title} className={`${className}`}>
      <div className="text-body-color">
        {tags.map((tag, i) => (
          <Fragment key={tag.route}>
            <Link className="lh-lg" href={tag.route}>
              {tag.text}
            </Link>
            {i < tags.length - 1 && <span className="mx10">,</span>}
          </Fragment>
        ))}
      </div>
    </ContentWrapper>
  );
}
