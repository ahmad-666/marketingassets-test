import Icon from "@/src/components/common/Icon";
import { email } from "@/src/data/socials";

const FooterItems = () => {
  return (
    <div className="row align-items-start g-4">
      {/* <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <div className="footer_about_widget">
          <h5 className="title">OFFICE</h5>
          <p>
            Germany —<br />
            329 Queensberry Street,
            <br />
            North Melbourne VIC 3051
          </p>
        </div>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h5 className="title">NEED HELP</h5>
          <div className="footer_phone">+1 670 936 46 70</div>
          <p>hello@voiture.com</p>
        </div>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h5 className="title">OPENING HOURS</h5>
          <p>
            Monday – Friday: 09:00AM – 09:00PM
            <br />
            Saturday: 09:00AM – 07:00PM
            <br />
            Sunday: Closed
          </p>
        </div>
      </div> */}
      <div className="col-12 col-sm-6 col-md-8 col-lg-9 d-flex align-items-center">
        <Icon icon="mdi:email-outline" size="xl" className="text-primary" />
        <div className="ml15">
          <p className="fs-6 text-white">Have a question?</p>
          <p className="mt-2 fs-6 fw-bold text-white">{email}</p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="footer_contact_widget">
          <h5 className="title">KEEP IN TOUCH</h5>
          <form className="footer_mailchimp_form">
            <div className="wrapper">
              <div className="col-auto">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email..."
                  required
                />
                <button type="submit">GO</button>
              </div>
            </div>
          </form>
          <p>Get latest updates and offers.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterItems;
