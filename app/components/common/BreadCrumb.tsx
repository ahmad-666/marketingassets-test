"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  text: string;
  link: string;
};

type BreadCrumbProps = {
  items: Item[];
  className?: string;
};

const BreadCrumb = ({ items = [], className = "" }: BreadCrumbProps) => {
  const pathname = usePathname();
  return (
    <div className={`${className}`}>
      <ol className="breadcrumb float-start">
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
