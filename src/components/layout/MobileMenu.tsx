import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/src/components/common/Button";
import Icon from "@/src/components/common/Icon";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { socials, email } from "@/src/data/socials";
import type {
  MenuItems as MenuItemsType,
  MenuItem as MenuItemType,
  NestedMenuItem as NestedMenuItemType,
} from "@/src/types/Common";

type MobileMenuProps = {
  menuItems?: MenuItemsType;
};

type Contact = {
  icon: string;
  value: string;
  label: string;
};
const contactData: Contact[] = [
  {
    label: "email",
    icon: "mdi:email-outline",
    value: email,
  },
];
const MobileMenu = ({ menuItems = [] }: MobileMenuProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="stylehome1">
        <div className="mobile-menu">
          <div className="header stylehome1 d-flex justify-content-between align-items-center">
            <div className="mobile_menu_main_logo">
              <Link href="/">
                <Image
                  width={150}
                  height={40}
                  priority
                  src="/images/logos/logo-text.svg"
                  alt="companyurlfinder"
                />
              </Link>
            </div>
            <div className="mobile_menu_bar">
              <a
                className="menubar"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                {/* <small>Menu</small> */}
                <span />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end mobile_menu-canvas"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="offcanvas-body">
          <div className="pro-header">
            <Link href="/">
              <Image
                width={40}
                height={40}
                priority
                src="/images/logos/logo2.svg"
                alt="companyurlfinder"
              />
            </Link>
            <div
              className="fix-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-light fa-circle-xmark"></i>
            </div>
          </div>
          {isClient && (
            <ProSidebarProvider>
              <Sidebar
                width="100%"
                backgroundColor="#0A2357"
                className="my-custom-class"
              >
                <Menu>
                  <Button
                    variant="filled"
                    color="primary-darken1"
                    dark
                    href={process.env.NEXT_PUBLIC_EXTERNAL_DASHBOARD_BASE_URL}
                    size="md"
                  >
                    Dashboard
                  </Button>
                  {menuItems.map((item, index) => {
                    const isSingle = (item as MenuItemType).path;
                    if (isSingle) {
                      const newItem = item as MenuItemType;
                      return (
                        <MenuItem
                          key={index}
                          component={<Link href={newItem.path} />}
                        >
                          {newItem.label}
                        </MenuItem>
                      );
                    } else {
                      const newItem = item as NestedMenuItemType;
                      return (
                        <SubMenu key={index} label={newItem.label}>
                          {newItem.subMenu.map((subItem, subIndex) => (
                            <MenuItem
                              key={subIndex}
                              component={<Link href={subItem.path} />}
                            >
                              {subItem.label}
                            </MenuItem>
                          ))}
                        </SubMenu>
                      );
                    }
                  })}
                </Menu>
              </Sidebar>
            </ProSidebarProvider>
          )}
          <div className="pro-footer mm-add-listing">
            <div className="border-none">
              <div className="mmenu-contact-info">
                {contactData.map((data) => (
                  <span className="phone-num" key={data.label}>
                    <Icon
                      icon={data.icon}
                      className="mr-5 text-white"
                      size={16}
                    />
                    <span>{data.value}</span>
                  </span>
                ))}
              </div>
              <div className="social-links">
                {socials.map((social) => (
                  <a
                    target="_blank"
                    href={social.route}
                    key={social.label}
                    className="bg-transparent"
                  >
                    <Icon icon={social.icon} size={16} className="text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
