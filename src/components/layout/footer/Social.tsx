import { socials } from "@/src/data/socials";
import Icon from "@/src/components/common/Icon";

const Social = () => {
  return (
    <>
      {socials.map((social) => (
        <li className="list-inline-item" key={social.label}>
          <a target="_blank" href={social.route}>
            <Icon icon={social.icon} size="sm" className="text-white" />
          </a>
        </li>
      ))}
    </>
  );
};

export default Social;
