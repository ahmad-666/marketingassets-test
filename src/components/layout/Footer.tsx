import Image from "next/image";
import Link from "next/link";
import CopyRight from "./footer/CopyRight";
import FooterItems from "./footer/FooterItems";
import Navigation from "./footer/Navigation";
import Container from "@/src/components/common/Container";

const Footer = () => {
  return (
    <footer className="footer_one pt50 pb25">
      <Container>
        <div className="row">
          <div className="col-12 col-md-5 col-lg-4 col-xl-3">
            <div className="footer_about_widget text-start">
              <div className="logo mb40 mb0-sm">
                <Link href="/">
                  <Image
                    width={75}
                    height={75}
                    src="/images/logos/logo2.svg"
                    alt="companyurlfinder"
                  />
                  <h3 className="fs-5 text-white mt-3">
                    CUFinder Marketing Assets
                  </h3>
                </Link>
                <p className="mt-3 text-lightgray2">
                  All things you need for Personalized Marketing Messages
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7 col-lg-8 col-xl-9">
            <div className="footer_menu_widget text-start text-md-end mt15">
              <ul className="d-flex flex-wrap gap-3 justify-content-md-end">
                <Navigation />
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <hr />
      <Container>
        <div className="py-4">
          <FooterItems />
        </div>
        <CopyRight />
      </Container>
    </footer>
  );
};

export default Footer;
