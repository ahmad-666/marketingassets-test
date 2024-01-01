import Link from "next/link";
import Image from "next/image";
import type { University } from "@/src/types/University";

type UniversityCardProps = Pick<University, "id" | "name" | "imgSrc"> & {
  continent: string;
  country: string;
  className?: string;
};

export default function UniversityCard({
  id,
  name,
  imgSrc,
  country,
  continent,
  className = "",
}: UniversityCardProps) {
  return (
    <div className={`${className}`}>
      <div className="card-with-filter1 bg-white rounded-2 border border-lightgray2 position-relative p-3 overflow-hidden h-100">
        <div className="filter1 overflow-hidden rounded-2 position-relative">
          <div
            className="bg-primary-dark rounded-4 text-white fz9 font-600 text-uppercase py-2 px-3 position-absolute z-1"
            style={{
              left: "10px",
              top: "6px",
            }}
          >
            {continent}-{country}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Image
              src={imgSrc}
              alt={name}
              width={500}
              height={500}
              className="d-block w-auto max-w-100 max-h-100"
              style={{
                height: "120px",
              }}
            />
          </div>
        </div>
        <div className="p-2 pt-3">
          <div className="pb15">
            <h3 className="fz13 text-capitalize">{name}</h3>
          </div>
          <div className="d-flex justify-content-center pt20 border-top border-lightgray2">
            <Link
              href={`/university/${name}`}
              className="p-2 text-white rounded-2 bg-primary-dark text-center"
            >
              {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
