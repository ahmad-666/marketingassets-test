import Image from "next/image";
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
                <Image
                  width={75}
                  height={75}
                  src="/images/logos/logo2.svg"
                  alt="companyurlfinder"
                />
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
        <div className="pt80 pt20-sm pb70 pb0-sm">
          <FooterItems />
        </div>
        <CopyRight />
      </SectionContainer>
    </section>
  );
};

export default Footer;
