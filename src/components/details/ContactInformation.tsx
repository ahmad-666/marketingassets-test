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
      <div className="info_widgets p30">
        <div className="wrapper">
          <h3 className="title text-capitalize">{`${name} Contact Information`}</h3>
          <ul className="list-group">
            {items.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={item.title}
              >
                <div className="me-auto">
                  <div className="day d-flex align-items-center">
                    <Icon className="mr5" icon={item.icon} size="sm" />
                    <h3 className="fz13 mt-1">{item.title}</h3>
                  </div>
                </div>
                {item.type === "text" && (
                  <h4 className="schedule fz13">{item.value}</h4>
                )}
                {item.type === "link" && (
                  <Link href={item.link} target="_blank">
                    <h4 className="schedule fz13">{item.value}</h4>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ContactInformation;
