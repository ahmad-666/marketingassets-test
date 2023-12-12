import { Fragment } from "react";
import { Tag } from "@/src/types/Common";
import Link from "next/link";

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
    <div className={`listing_single_description ${className}`}>
      <h4>{title}</h4>
      <div className="mt30 text-body">
        {tags.map((tag, i) => (
          <Fragment key={tag.route}>
            <Link className="lh-lg" href={tag.route}>
              {tag.text}
            </Link>
            {i < tags.length - 1 && <span className="mx10">,</span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
