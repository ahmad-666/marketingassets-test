import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Index</h1>
      <Link href="/about">about</Link>
      <Link href="/1">link to id:1</Link>
      <Link href="/2">link to id:2</Link>
    </div>
  );
}
