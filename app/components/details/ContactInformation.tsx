type Item = {
  title: string;
  icon: string;
  value: number | string;
};
type ContactInformationProps = {
  items: Item[];
  className?: string;
};

const ContactInformation = ({
  items = [],
  className = "",
}: ContactInformationProps) => {
  return (
    <div className={`${className}`}>
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            key={item.title}
          >
            <div className="me-auto">
              <div className="day">{item.title}</div>
            </div>
            <span className="schedule">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactInformation;
