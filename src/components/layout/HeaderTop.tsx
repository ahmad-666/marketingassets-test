import { socials, email } from "@/src/data/socials";
import Icon from "@/src/components/common/Icon";

type Contact = {
  label: string;
  icon: string;
  value: string;
};
const contactData: Contact[] = [
  {
    label: "email",
    icon: "mdi:email-outline",
    value: email,
  },
];
const HeaderTop = () => {
  return (
    <div className="header_top dn-992">
      <div className="row">
        <div className="col-lg-8 col-xl-7">
          <div className="header_top_contact_opening_widget text-center text-md-start">
            <ul className="mb0">
              {contactData.map((contact) => (
                <li className="list-inline-item" key={contact.label}>
                  <a href="#">
                    <Icon
                      icon={contact.icon}
                      size={16}
                      className="text-body-color mr5"
                    />
                    {contact.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-xl-5">
          <div className="header_top_social_widgets text-center text-md-end">
            <ul className="m0 d-flex justify-content-end gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    target="_blank"
                    href={social.route}
                    className="bg-transparent mx-0"
                  >
                    <Icon
                      icon={social.icon}
                      size={16}
                      className="text-body-color"
                    />
                  </a>
                </li>
              ))}
              {/* <li>
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#logInModal"
                  className="mx-0"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#logInModal"
                  className="mx-0 px-0"
                >
                  Register
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
