import Link from "next/link";
import { useRouter } from "next/router";

export type Item = {
  text: string;
  link: string;
};

export type BreadCrumbProps = {
  items: Item[];
  className?: string;
};

const BreadCrumb = ({ items = [], className = "" }: BreadCrumbProps) => {
  const router = useRouter();
  const pathname = router.asPath;
  return (
    <div className={`breadcrumb_content style2 ${className}`}>
      <ol className="breadcrumb">
        {items.map((item) => (
          <li
            key={item.link}
            className={`breadcrumb-item ${
              item.link === pathname ? "active" : ""
            }`}
          >
            <Link href={item.link}>{item.text}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BreadCrumb;
