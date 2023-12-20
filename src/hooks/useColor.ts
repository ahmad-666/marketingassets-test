import { useState, useEffect, useCallback } from "react";
import colors from "@/src/utils/colors";

const useColor = (val: string) => {
  //color can be 'primary','primary-main','secondary-lighten2','red','#f00','rgb(255,0,0)'
  const [color, setColor] = useState();
  const findColor = useCallback(() => {
    const colorSplit = val.split("-");
    const name = colorSplit?.[0];
    const variant = colorSplit?.[1] || "main";
    const targetColor = colors[name]?.[variant] || val;
    setColor(targetColor);
  }, [val]);
  useEffect(() => {
    findColor();
  }, [findColor]);
  return color;
};
export default useColor;
