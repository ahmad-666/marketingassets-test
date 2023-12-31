import { useMemo } from "react";
import { useRouter } from "next/router";
import MetaData from "@/src/components/common/MetaData";
import Container from "@/src/components/common/Container";
import UniversitiesList from "@/src/components/university/UniversitiesList";
import { getUniversities } from "@/src/services/university";
import type { University } from "@/src/types/University";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

const pageSize = 8;
type PageProps = {
  universities: University[];
  totalUniversities: number;
};
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page, search } = context.query;
    const finalPage = +page || 1;
    const { items: universities, totalCount: totalUniversities } =
      await getUniversities({
        page: finalPage,
        pageSize,
        search: search as string,
      });
    return {
      props: {
        universities,
        totalUniversities,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
export default function Page({
  universities = [],
  totalUniversities = 0,
}: PageProps) {
  const router = useRouter();
  const title =
    "University Repository: Download Universities or Integrate via API";
  const queries = useMemo(() => {
    const { page, search } = router.query;
    return {
      page: +page || 1,
      search: search as string,
    };
  }, [router.query]);
  return (
    <div>
      <MetaData
        title={title}
        description="Discover & download high-quality university details or integrate seamlessly via API. Elevate your projects with our diverse university collection."
      />
      <Container>
        <section className="pt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-title text-center">
                <h1 className="fs-2">{title}</h1>
              </div>
            </div>
          </div>
          <div className="row mt40">
            <div className="col-lg-12">
              <UniversitiesList
                title="Browse Universities"
                items={universities}
                totalItems={totalUniversities}
                pageSize={pageSize}
                page={queries.page}
                search={queries.search}
                showPagination
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
