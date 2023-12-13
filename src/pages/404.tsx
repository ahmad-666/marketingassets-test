import ErrorHandler from "@/src/components/common/ErrorHandler";

export default function Custom404() {
  return (
    <div>
      <ErrorHandler code={404} message="Page Not Found!!!" />
    </div>
  );
}
