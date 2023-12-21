import Image from "next/image";

type LineTitleProps = {
  title: string;
  className?: string;
};

export default function LineTitle({ title, className = "" }: LineTitleProps) {
  return (
    <div className={`${className}`}>
      <div className="d-flex flex-column align-items-center">
        <h2 className="fs-2 text-dark-color text-center">{title}</h2>
        <Image
          src="/images/background/line-shape.svg"
          alt="line-shape"
          width={400}
          height={400}
          className="h-auto mt-1"
          style={{
            width: "350px",
          }}
        />
      </div>
    </div>
  );
}
