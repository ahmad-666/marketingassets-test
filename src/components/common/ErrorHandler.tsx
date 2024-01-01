import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/src/components/common/Button";

type ErrorHandlerProps = {
  message?: string;
  code: number;
};
export default function ErrorHandler({
  message = "Error Happens",
  code,
}: ErrorHandlerProps) {
  const router = useRouter();
  const statusCodeSplit = useMemo(() => {
    return `${code}`.split("");
  }, [code]);
  const reloadHandler = useCallback(() => {
    router.reload();
  }, [router]);
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
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link
                    className="bg-primary-color font-600 fs-6 py-3 px-4 rounded-3"
                    href="/"
                  >
                    Back to Home
                  </Link>
                  <Button
                    variant="filled"
                    size="lg"
                    color="primary"
                    className="fs-6 font-600"
                    onClick={reloadHandler}
                  >
                    Reload page
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
