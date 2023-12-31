import Link from "next/link";

const Navigation = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Emoji", path: "/emojis" },
    { label: "Logo", path: "/logos" },
    { label: "CUFinder", path: process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL },
    {
      label: "Blog",
      path: `${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/blog/`,
    },
    {
      label: "Dashboard",
      path: process.env.NEXT_PUBLIC_EXTERNAL_DASHBOARD_BASE_URL,
    },
    {
      label: "Our Data",
      path: `${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/our-data/`,
    },
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
