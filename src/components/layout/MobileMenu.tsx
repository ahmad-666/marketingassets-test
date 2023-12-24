import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import type {
  MenuItems as MenuItemsType,
  MenuItem as MenuItemType,
  NestedMenuItem as NestedMenuItemType,
} from "@/src/types/Common";
import Button from "@/src/components/common/Button";

type MobileMenuProps = {
  menuItems?: MenuItemsType;
};
const MobileMenu = ({ menuItems = [] }: MobileMenuProps) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const socialLinks = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      link: "#",
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      link: "#",
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      link: "#",
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      link: "#",
    },
    {
      name: "Pinterest",
      icon: "fab fa-pinterest",
      link: "#",
    },
  ];
  const contactInfo = [
    {
      icon: "flaticon-map",
      text: "47 Bakery Street, London, UK",
    },
    {
      icon: "flaticon-phone-call",
      text: "1-800-458-56987",
    },
    {
      icon: "flaticon-clock",
      text: "Mon - Fri 8:00 - 18:00",
    },
  ];
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
                    href="https://dashboard.companyurlfinder.com/auth/signup/"
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
                {contactInfo.map((info, index) => (
                  <span className="phone-num" key={index}>
                    <i className={info.icon} /> {info.text}
                  </span>
                ))}
              </div>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a href={link.link} key={index}>
                    <span className={link.icon} />
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
