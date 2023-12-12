import Link from "next/link";

type Item = {
  text: string;
  link: string;
};
type UsefulLinksProps = {
  className?: string;
};

const items: Item[] = [
  {
    text: "How to find someone's email on linkedin?",
    link: "https://companyurlfinder.com/blog/how-to-find-person-emails-on-linkedin/",
  },
  {
    text: "How to find someone's phone number?",
    link: "https://companyurlfinder.com/blog/how-to-find-someones-phone-number/",
  },
  {
    text: "Name to Domain API",
    link: "https://companyurlfinder.com/company-website-finder/",
  },
  {
    text: "Company LinkedIn URL Finder",
    link: "https://companyurlfinder.com/company-linkedin-page-finder/",
  },
  {
    text: "Company Logo API",
    link: "https://companyurlfinder.com/company-logo-finder/",
  },
  {
    text: "Company Name to Employees' LinkedIn",
    link: "https://companyurlfinder.com/company-associated-linkedin-finder/",
  },
  {
    text: "Company Name to Email",
    link: "https://companyurlfinder.com/company-name-to-email/",
  },
  {
    text: "Email to LinkedIn Converter",
    link: "https://companyurlfinder.com/email-to-linkedin-profile/",
  },
  {
    text: "Email to Company Name",
    link: "https://companyurlfinder.com/email-to-company-name/",
  },
  {
    text: "Domain to Company Name",
    link: "https://companyurlfinder.com/domain-to-company-name/",
  },
  {
    text: "Linkedin Profile Url Finder",
    link: "https://companyurlfinder.com/linkedin-profile-url-finder/",
  },
  {
    text: "CUFinder Company Databse",
    link: "https://companyurlfinder.com/blog/company-database/",
  },
  {
    text: "Free email verifier (checker)",
    link: "https://companyurlfinder.com/email-verification/",
  },
  {
    text: "Statistics",
    link: "https://companyurlfinder.com/blog/statistics/",
  },
  {
    text: "ChatGPT Usecases",
    link: "https://companyurlfinder.com/blog/chatgpt-use-cases/",
  },
];

export default function UsefulLinks({ className }: UsefulLinksProps) {
  return (
    <div className={`${className}`}>
      <div>
        <div className="sidebar_seller_contact p30 mb0">
          {items.map((item, i) => (
            <div key={item.link} className="text-center fs-6">
              <Link href={item.link} target="_blank" className="color-gray">
                {item.text}
              </Link>
              {i < items.length - 1 && (
                <hr className="w-100 h-auto border-top-1 border-solid border-gray my10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
