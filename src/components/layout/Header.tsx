import Link from "next/link";
import Image from "next/image";
import MainMenu from "./MainMenu";
import Button from "@/src/components/common/Button";
import type { MenuItems } from "@/src/types/Common";

type HeaderProps = {
  menuItems: MenuItems;
};

const Header = ({ menuItems }: HeaderProps) => {
  return (
    <header className="header-nav menu_style_home_one transparent main-menu">
      <nav>
        <div className="d-flex justify-content-between align-items-center  posr">
          <div className="menu-toggle">
            <button type="button" id="menu-btn">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <Link href="/" className="navbar_brand float-start dn-md">
            <Image
              width={160}
              height={40}
              src="/images/logos/logo-text.svg"
              alt="companyurlfinder"
            />
          </Link>
          <ul
            id="respMenu"
            className="ace-responsive-menu text-end"
            data-menu-style="horizontal"
          >
            <MainMenu items={menuItems} />
            <li className="add_listing">
              <Button
                variant="filled"
                color="primary-darken1"
                dark
                size="lg"
                href="https://dashboard.companyurlfinder.com/auth/signup/"
              >
                Dashboard
              </Button>
            </li>
            {/* <li
              className="sidebar_panel"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <a className="sidebar_switch pt0" role="button">
                <span />
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
