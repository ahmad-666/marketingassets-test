import { useMemo } from "react";
import Link from "next/link";

type ErrorHandlerProps = {
  message?: string;
  code: number;
};
export default function ErrorHandler({
  message = "Error Happens",
  code,
}: ErrorHandlerProps) {
  const statusCodeSplit = useMemo(() => {
    return `${code}`.split("");
  }, [code]);
  return (
    <div>
      <div className="wrapper">
        <section className="our-error bgc-f9">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 offset-xl-3 text-center">
                <div className="error_page footer_apps_widget">
                  <h3 className="subtitle">{message}</h3>
                  <div className="erro_code">
                    <h2>
                      {statusCodeSplit[0]}
                      <span className="text-thm">{statusCodeSplit[1]}</span>
                      {statusCodeSplit[2]}
                    </h2>
                  </div>
                </div>
                <Link className="btn_error btn-thm" href="/">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
