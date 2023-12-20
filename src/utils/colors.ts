type Color = {
  lighten3: string;
  lighten2: string;
  lighten1: string;
  main: string;
  darken1: string;
  darken2: string;
  darken3: string;
};
type Palette = {
  primary: Color;
  secondary: Color;
  success: Color;
  danger: Color;
  warning: Color;
  info: Color;
  background: Color;
  card: Color;
  dark: Color;
  light: Color;
  gray: Color;
};
const palette: Palette = {
  primary: {
    lighten3: "#fdf3dc",
    lighten2: "#fae3ac",
    lighten1: "#f8d37b",
    main: "#f5c34b",
    darken1: "#f2b31b",
    darken2: "#cf950b",
    darken3: "#9e7209",
  },
  secondary: {
    lighten3: "#a5c9fe",
    lighten2: "#72abfe",
    lighten1: "#408cfd",
    main: "#0d6efd",
    darken1: "#0257d5",
    darken2: "#0143a3",
    darken3: "#012e70",
  },
  success: {
    lighten3: "#59e0a1",
    lighten2: "#2ed889",
    lighten1: "#21b26f",
    main: "#198754",
    darken1: "#115c39",
    darken2: "#09311e",
    darken3: "#010604",
  },
  danger: {
    lighten3: "#f3b7bd",
    lighten2: "#eb8c95",
    lighten1: "#e4606d",
    main: "#dc3545",
    darken1: "#bd2130",
    darken2: "#921925",
    darken3: "#66121a",
  },
  warning: {
    lighten3: "#ffe7a0",
    lighten2: "#ffdb6d",
    lighten1: "#ffce3a",
    main: "#ffc107",
    darken1: "#d39e00",
    darken2: "#a07800",
    darken3: "#6d5200",
  },
  info: {
    lighten3: "#9ceafa",
    lighten2: "#6ce0f7",
    lighten1: "#3cd5f4",
    main: "#0dcaf0",
    darken1: "#0aa1c0",
    darken2: "#08798f",
    darken3: "#05505f",
  },
  background: {
    lighten3: "white",
    lighten2: "white",
    lighten1: "white",
    main: "white",
    darken1: "#fefefe",
    darken2: "#eaeaea",
    darken3: "#e5e5e5",
  },
  card: {
    lighten3: "white",
    lighten2: "white",
    lighten1: "white",
    main: "#fefefe",
    darken1: "#e5e5e5",
    darken2: "#cbcbcb",
    darken3: "#b2b2b2",
  },
  dark: {
    lighten3: "#467ecd",
    lighten2: "#3065b0",
    lighten1: "#254e88",
    main: "#1a3760",
    darken1: "#0f2038",
    darken2: "#040910",
    darken3: "#000",
  },
  light: {
    lighten3: "#f8f9fa",
    lighten2: "#eaeaea",
    lighten1: "#d3d3d3",
    main: "#adb5bd",
    darken1: "#5f6973",
    darken2: "#7e7e7e",
    darken3: "#343a40",
  },
  gray: {
    lighten3: "#f8f9fa",
    lighten2: "#eaeaea",
    lighten1: "#d3d3d3",
    main: "#adb5bd",
    darken1: "#5f6973",
    darken2: "#7e7e7e",
    darken3: "#343a40",
  },
};
export default palette;
