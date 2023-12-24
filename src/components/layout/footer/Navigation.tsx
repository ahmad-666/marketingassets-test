import Link from "next/link";

const Navigation = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Emoji", path: "/emojis" },
    { label: "Logo", path: "/logos" },
    { label: "CUFinder", path: "https://companyurlfinder.com/" },
    { label: "Blog", path: "https://companyurlfinder.com/blog/" },
    { label: "Dashboard", path: "https://dashboard.companyurlfinder.com/" },
    { label: "Our Data", path: "https://companyurlfinder.com/our-data/" },
  ];

  return (
    <>
      {links.map((link, index) => (
        <li className="list-inline-item" key={index}>
          <Link href={link.path}>{link.label}</Link>
        </li>
      ))}
    </>
  );
};

export default Navigation;
