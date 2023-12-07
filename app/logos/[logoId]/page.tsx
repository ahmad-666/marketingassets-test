import Link from "next/link";

export const metadata = {
  title:
    "Listing Single V1 || Voiture - Automotive & Car Dealer NextJS Template",
};
export const dynamic = "force-dynamic";
const Page = () => {
  return (
    <div className="wrapper">
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <div className="container">
          <div className="row mb30">
            <div className="col-lg-7 col-xl-8">
              <div className="single_page_heading_content">
                <div className="car_single_content_wrapper">
                  <ul className="car_info mb20-md">
                    <li className="list-inline-item">
                      <a href="#">BRAND NEW - IN STOCK</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-clock-1 vam" />1 years ago
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-eye vam" />
                        13102
                      </a>
                    </li>
                  </ul>
                  <h2 className="title">Volvo XC 90</h2>
                  <p className="para">
                    2.0h T8 11.6kWh Polestar Engineered Auto AWD (s/s) 5dr
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <div className="single_page_heading_content text-start text-lg-end">
                <div className="share_content">{/* <ShareMeta /> */}</div>
                <div className="price_content">
                  <div className="price mt60 mb10 mt10-md">
                    <h3>
                      <small className="mr15">
                        <del>$92,480</del>
                      </small>
                      $89,480
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            {/* End col-lg-5 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <img />

              <div className="opening_hour_widgets p30 mt30">
                <div className="wrapper">
                  <h4 className="title">Overview</h4>
                  {/* <Overview /> */}
                </div>
              </div>
              {/* End opening_hour_widgets */}

              <div className="listing_single_description mt30">
                <h4 className="mb30">
                  Description{" "}
                  <span className="float-end body-color fz13">ID #9535</span>
                </h4>
                {/* <Descriptions /> */}
              </div>
              {/* End car descriptions */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-lg-4 col-xl-4">
              <div className="offer_btns">
                <div className="text-end">
                  <button className="btn btn-thm ofr_btn1 btn-block mt0 mb20">
                    <span className="flaticon-coin mr10 fz18 vam" />
                    Make an Offer Price
                  </button>
                  <button className="btn ofr_btn2 btn-block mt0 mb20">
                    <span className="flaticon-profit-report mr10 fz18 vam" />
                    View VIN Report
                  </button>
                </div>
              </div>
              {/* End offer_btn
               */}
              <div className="sidebar_seller_contact">
                {/* <SellerDetail />
                <h4 className="mb30">Contact Seller</h4>
                <ContactSeller /> */}
              </div>

              {/* End .col-xl-4 */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      <section className="car-for-rent bb1">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="main-title text-center text-md-start mb10-520">
                <h2 className="title">Releated Best Car</h2>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="text-center text-md-end mb30-520">
                <Link href="/page-list-v1" className="more_listing">
                  Show All Cars
                  <span className="icon">
                    <span className="fas fa-plus" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div
              className="home1_popular_listing home3_style"
              data-aos-delay="100"
            >
              <div className="listing_item_4grid_slider nav_none"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
