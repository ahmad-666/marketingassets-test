import ErrorHandler from "@/src/components/common/ErrorHandler";

export default function Custom500() {
  return (
    <div>
      <ErrorHandler code={500} message="Internal Error!!!" />
    </div>
  );
}
