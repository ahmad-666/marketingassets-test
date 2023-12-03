export type Item = {
  label: string;
  path: string;
};
export type NestedItem = {
  label: string;
  subMenu: Item[];
};
