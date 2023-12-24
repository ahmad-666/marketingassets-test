import Image from "next/image";
import Link from "next/link";
import CopyRight from "./footer/CopyRight";
import FooterItems from "./footer/FooterItems";
import Navigation from "./footer/Navigation";
import SectionContainer from "@/src/components/common/SectionContainer";

const Footer = () => {
  return (
    <section className="footer_one pt50 pb25">
      <SectionContainer>
        <div className="row">
          <div className="col-md-4 col-xl-7">
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
          <div className="col-md-8 col-xl-5">
            <div className="footer_menu_widget text-start text-md-end mt15">
              <ul>
                <Navigation />
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>
      <hr />
      <SectionContainer>
        <div className="py-4">
          <FooterItems />
        </div>
        <CopyRight />
      </SectionContainer>
    </section>
  );
};

export default Footer;
