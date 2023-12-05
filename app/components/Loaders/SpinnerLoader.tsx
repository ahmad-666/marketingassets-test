import "./spinnerLoader.style.scss";

type SpinnerLoaderProps = {
  className?: string;
};
export default function SpinnerLoader({ className = "" }: SpinnerLoaderProps) {
  return (
    <div className={`d-flex justify-content-center ${className}`}>
      <div className="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    </div>
  );
}
