export type MenuItem = {
  label: string;
  path: string;
};
export type NestedMenuItem = {
  label: string;
  subMenu: MenuItem[];
};
export type MenuItems = (MenuItem | NestedMenuItem)[];
export type Faq = {
  question: string;
  answer: string;
};
export type Tag = {
  text: string;
  route: string;
};
export type ServerError = {
  message: string;
};
export type Option = {
  value: number | string;
  label: string;
};
export type Social = {
  icon: string;
  route: string;
  label: string;
  color: string;
};
