import Link from "next/link";

const Navigation = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Emoji", path: "/emojis" },
    { label: "Logo", path: "/logos" },
    { label: "CUFinder", path: "https://cufinder.io/" },
    { label: "Blog", path: "https://cufinder.io/blog/" },
    { label: "Dashboard", path: "https://dashboard.cufinder.io/" },
    { label: "Our Data", path: "https://cufinder.io/our-data/" },
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
