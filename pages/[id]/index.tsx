import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps = (context) => {
  const id = context.params.id;
  return {
    props: {
      id,
    },
  };
};
export default function Page({ id }) {
  const router = useRouter();
  const clientId = router.query.id;
  return (
    <div>
      <h1>Server: {id}</h1>
      <h1>Client: {clientId}</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
