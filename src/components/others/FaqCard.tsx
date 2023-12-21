import { useCallback, useState } from "react";
import Icon from "@/src/components/common/Icon";
import Divider from "@/src/components/common/Divider";

export type FaqCardProps = {
  question: string;
  answer: string;
  className?: string;
};

export default function FaqCard({
  question,
  answer,
  className = "",
}: FaqCardProps) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((old) => !old);
  }, []);
  return (
    <div className={`${className}`}>
      <div
        onClick={toggleOpen}
        className="border-1 border-solid border-lightgray"
      >
        <div className="d-flex align-items-center p-3 cursor-pointer">
          <h3 className="text-dark-color fs-3">{question}</h3>
          <Icon
            icon={!open ? "mdi:chevron-down" : "mdi:chevron-up"}
            size="lg"
            className="text-dark-color ml-2"
          />
        </div>
        <Divider className="my-2" height={2} color="gray-lighten2" />
        <div className="p-3">
          <p className="fw-700 fz-16">{answer}</p>
        </div>
      </div>
    </div>
  );
}
