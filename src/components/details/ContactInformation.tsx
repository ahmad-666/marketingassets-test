import Icon from "@/src/components/common/Icon";
import Link from "next/link";

export type TextItem = {
  title: string;
  icon: string;
  value: number | string;
  type: "text";
};
export type LinkItem = {
  title: string;
  icon: string;
  value: number | string;
  link: string;
  type: "link";
};
export type Item = TextItem | LinkItem;
export type ContactInformationProps = {
  name: string;
  items: Item[];
  className?: string;
};

const ContactInformation = ({
  name,
  items = [],
  className = "",
}: ContactInformationProps) => {
  return (
    <div className={`${className}`}>
      <div className="wrapper">
        <h4 className="title text-capitalize">{`${name} Contact Information`}</h4>
        <ul className="list-group">
          {items.map((item) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={item.title}
            >
              <div className="me-auto">
                <div className="day">
                  <Icon className="mr5" icon={item.icon} size="sm" />
                  <span>{item.title}</span>
                </div>
              </div>
              {item.type === "text" && (
                <span className="schedule">{item.value}</span>
              )}
              {item.type === "link" && (
                <Link href={item.link} target="_blank" className="schedule">
                  {item.value}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ContactInformation;
