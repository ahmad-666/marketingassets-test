import Wrapper from "./layout/wrapper";

export const dynamic = "force-dynamic"; //ssr
export const metadata = {
  title: "Home-1 || Voiture - Automotive & Car Dealer NextJS Template",
  description: `Voiture - Automotive & Car Dealer NextJS Template. `,
};

export default function MainRoot() {
  return (
    <Wrapper>
      <h1>HOME</h1>
    </Wrapper>
  );
}
