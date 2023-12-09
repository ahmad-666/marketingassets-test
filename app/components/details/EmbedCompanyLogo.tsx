import Link from "next/link";

type EmbedCompanyLogoProps = {
  className?: string;
};

export default function EmbedCompanyLogo({
  className = "",
}: EmbedCompanyLogoProps) {
  return (
    <div className={`${className}`}>
      <div className="sidebar_seller_contact p30 text-center mb0">
        <h4>Embed Company Logos</h4>
        <p className="mt20">
          <span>
            Embed any company logos in your website or application using
          </span>
          <span className="fw-bold ml5">
            the unlimited free CUFinder company logo API.
          </span>
        </p>
        <Link
          className="mt20 py10 lh-auto btn btn-thm btn-block ofr_btn2 h-auto"
          href="https://companyurlfinder.com/company-logo-finder/"
          target="_blank"
        >
          Company Logo Finder
        </Link>
      </div>
    </div>
  );
}