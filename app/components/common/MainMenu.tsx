"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Item, NestedItem } from "@/app/types/Menu";

type MainMenuProps = {
  items?: (Item | NestedItem)[];
};

const MainMenu = ({ items = [] }: MainMenuProps) => {
  const path = usePathname();

  return (
    <>
      {items.map((menuItem, index) => {
        const isSingle = (menuItem as Item).path;
        if (isSingle) {
          const item = menuItem as Item;
          return (
            <li className="dropitem" key={index}>
              <Link href={item.path}>
                <span className="title">{item.label}</span>
              </Link>
            </li>
          );
        } else {
          const item = menuItem as NestedItem;
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
                        className={path === subItem.path ? "active" : ""}
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
