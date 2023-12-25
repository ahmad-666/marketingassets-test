import { useCallback, type ComponentProps } from "react";
import { Rating as ReactRating } from "react-simple-star-rating";

type RatingProps = {
  value: number;
  onChange?: (newValue: number) => void;
  ratingClassName?: string;
  className?: string;
} & Omit<
  ComponentProps<typeof ReactRating>,
  "initialValue" | "onClick" | "className"
>;
export default function Rating({
  //out own props:
  value,
  onChange,
  ratingClassName = "",
  className = "",
  //react-simple-star-rating props:
  //iconsCount,size,allowFraction(for half increment),allowHover,readonly,rtl
  //fillIcon,fillColor,emptyIcon,emptyColor,style
  //showTooltip,tooltipDefaultText,tooltipClassName,tooltipStyle
  //onPointerMove,onPointerEnter,onPointerLeave
  ...rest
}: RatingProps) {
  const clickHandler = useCallback(
    (newValue: number) => {
      if (onChange) onChange(newValue);
    },
    [onChange]
  );
  return (
    <div className={`${className}`}>
      <ReactRating
        initialValue={value}
        onClick={clickHandler}
        className={`${ratingClassName}`}
        {...rest}
      />
    </div>
  );
}
