import Link from "next/link";
import { useRouter } from "next/router";
import type { MenuItems, MenuItem, NestedMenuItem } from "@/src/types/Common";

type MainMenuProps = {
  items?: MenuItems;
};

const MainMenu = ({ items = [] }: MainMenuProps) => {
  const router = useRouter();
  return (
    <>
      {items.map((menuItem, index) => {
        const isSingle = (menuItem as MenuItem).path;
        if (isSingle) {
          const item = menuItem as MenuItem;
          return (
            <li className="dropitem" key={index}>
              <Link href={item.path}>
                <span className="title">{item.label}</span>
              </Link>
            </li>
          );
        } else {
          const item = menuItem as NestedMenuItem;
          return (
            <li className="dropitem" key={index}>
              <a
                // className={isParentActive(item.subMenu, path) ? "active" : ""}
                href="#"
              >
                <span className="title">{item.label}</span>
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                {item.subMenu.map((subItem, subIndex) => (
                  <li key={subIndex} className="dropitem">
                    {
                      <Link
                        href={subItem.path}
                        className={
                          router.asPath === subItem.path ? "active" : ""
                        }
                      >
                        {subItem.label}
                      </Link>
                    }
                  </li>
                ))}
              </ul>
            </li>
          );
        }
      })}
    </>
  );
};

export default MainMenu;
