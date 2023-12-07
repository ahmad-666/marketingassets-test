import Link from "next/link";

type EmbedCompanyLogoProps = {
  className?: string;
};

export default function EmbedCompanyLogo({
  className = "",
}: EmbedCompanyLogoProps) {
  return (
    <div className={`${className}`}>
      <div className="sidebar_seller_contact">
        <h4 className="mb30">Embed Company Logos</h4>
        <p className="text-center">
          <span>
            Embed any company logos in your website or application using
          </span>
          <span className="fw-bold ">
            the unlimited free CUFinder company logo API.
          </span>
        </p>
        <Link className="btn btn-thm btn-block ofr_btn2" href="/">
          Company Logo Finder
        </Link>
      </div>
    </div>
  );
}
