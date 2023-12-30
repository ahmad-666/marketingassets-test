import Link from "next/link";

type Item = {
  text: string;
  link: string;
};
type UsefulLinksProps = {
  className?: string;
};

const domain = "https://cufinder.io";
const items: Item[] = [
  {
    text: "How to find someone's email on linkedin?",
    link: `${domain}/blog/how-to-find-person-emails-on-linkedin/`,
  },
  {
    text: "How to find someone's phone number?",
    link: `${domain}/blog/how-to-find-someones-phone-number/`,
  },
  {
    text: "Name to Domain API",
    link: `${domain}/company-website-finder/`,
  },
  {
    text: "Company LinkedIn URL Finder",
    link: `${domain}/company-linkedin-page-finder/`,
  },
  {
    text: "Company Logo API",
    link: `${domain}/company-logo-finder/`,
  },
  {
    text: "Company Name to Employees' LinkedIn",
    link: `${domain}/company-associated-linkedin-finder/`,
  },
  {
    text: "Company Name to Email",
    link: `${domain}/company-name-to-email/`,
  },
  {
    text: "Email to LinkedIn Converter",
    link: `${domain}/email-to-linkedin-profile/`,
  },
  {
    text: "Email to Company Name",
    link: `${domain}/email-to-company-name/`,
  },
  {
    text: "Domain to Company Name",
    link: `${domain}/domain-to-company-name/`,
  },
  {
    text: "Linkedin Profile Url Finder",
    link: `${domain}/linkedin-profile-url-finder/`,
  },
  {
    text: "CUFinder Company Databse",
    link: `${domain}/blog/company-database/`,
  },
  {
    text: "Free email verifier (checker)",
    link: `${domain}/email-verification/`,
  },
  {
    text: "Statistics",
    link: `${domain}/blog/statistics/`,
  },
  {
    text: "ChatGPT Usecases",
    link: `${domain}/blog/chatgpt-use-cases/`,
  },
];

export default function UsefulLinks({ className }: UsefulLinksProps) {
  return (
    <div className={`${className}`}>
      <div>
        <div className="sidebar_seller_contact p30 mb0">
          <h4 className="text-center">Useful Links</h4>
          <div className="mt-4">
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
    </div>
  );
}
