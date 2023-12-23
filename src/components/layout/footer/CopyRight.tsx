import Social from "./Social";

const CopyRight = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-lg-8 col-xl-9">
          <div className="copyright-widget mt5 text-start mb20-sm">
            <p>
              <a
                href="https://themeforest.net/user/ib-themes"
                target="_blank"
                rel="noopener noreferrer"
              >
                ib-themes
              </a>
              © {new Date().getFullYear()}. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <div className="footer_social_widget text-start text-md-end">
            <ul className="mb0">
              <Social />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyRight;
