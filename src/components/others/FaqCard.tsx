import { useCallback } from "react";
import Icon from "@/src/components/common/Icon";
import Divider from "@/src/components/common/Divider";

export type FaqCardProps = {
  question: string;
  answer: string;
  isActive: boolean;
  onToggle: () => void;
  className?: string;
};

export default function FaqCard({
  question,
  answer,
  isActive = false,
  onToggle,
  className = "",
}: FaqCardProps) {
  const toggleHandler = useCallback(() => {
    onToggle();
  }, [onToggle]);
  return (
    <div className={`${className}`}>
      <div className="border-1 border-solid border-lightgray2 rounded-3">
        <div
          onClick={toggleHandler}
          className="d-flex align-items-center justify-content-between p-3 cursor-pointer"
        >
          <h3 className="text-dark-color fs-5 fw-medium">{question}</h3>
          <Icon
            icon={!isActive ? "mdi:chevron-down" : "mdi:chevron-up"}
            size="lg"
            className="text-dark-color ml-2"
          />
        </div>
        {isActive && <Divider height={2} color="gray-lighten2" />}
        <div
          className="d-grid transition-0-2-linear"
          style={{
            gridTemplateRows: !isActive ? "0fr" : "1fr",
          }}
        >
          <div className="overflow-hidden">
            <div className="p-3">
              <p className="fw-bold fz15 text-gray">{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
