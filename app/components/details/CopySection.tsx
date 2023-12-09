"use client";

import { useCallback, useState } from "react";
import Icon from "@/app/components/common/Icon";

type CopySectionProps = {
  value: string;
  className?: string;
};

export default function CopySection({
  value,
  className = "",
}: CopySectionProps) {
  const [text, setText] = useState("copy");
  const clickHandler = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setText("copies");
    } catch (err) {}
  }, [value]);
  return (
    <div className={`${className}`}>
      <button
        onClick={() => {
          clickHandler();
        }}
        className="btn btn-thm ofr_btn1 btn-block text-capitalize"
      >
        <Icon icon="mdi:content-copy" size="sm" className="mr5" />
        {text}
      </button>
    </div>
  );
}
