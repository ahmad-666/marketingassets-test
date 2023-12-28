import { useMemo } from "react";
import { useRouter } from "next/router";
import CompaniesList from "@/src/components/company/CompaniesList";
import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import { getCompanies } from "@/src/services/company";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { GetCompanies } from "@/src/types/Company";

type PageProps = GetCompanies;
const pageSize = 8;
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { industryId } = context.params;
    const { page } = context.query;
    const finalPage = +page || 1;
    const decodedIndustry = decodeURIComponent(industryId as string);
    const { items, totalCount } = await getCompanies({
      industry: decodedIndustry,
      page: finalPage,
      pageSize,
    });
    return {
      props: {
        items,
        totalCount,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
export default function Page({ items = [], totalCount = 0 }: PageProps) {
  const router = useRouter();
  const { industryId } = router.query;
  const queries = useMemo(() => {
    const { page } = router.query;
    return {
      page: +page || 1,
    };
  }, [router.query]);
  const industryText = useMemo(() => {
    const decodedIndustry = decodeURIComponent(industryId as string);
    return textNormalize(decodedIndustry);
  }, [industryId]);
  const title = useMemo(() => {
    return `${industryText} Company Logos Repository: Download Logos in industry ${industryText}`;
  }, [industryText]);
  return (
    <div>
      <MetaData
        title={title}
        description={`Discover & download high-quality company logos in industry ${industryText} or integrate seamlessly via API. Elevate your projects with our diverse logo collection.`}
      />
      <SectionContainer>
        <section className="pt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-title text-center">
                <h2 className="text-capitalize fs-2">{title}</h2>
              </div>
            </div>
          </div>
          <div className="row mt40">
            <div className="col-lg-12">
              <CompaniesList
                title="Browse Companies"
                items={items}
                totalItems={totalCount}
                page={queries.page}
                pageSize={pageSize}
                targetIndustry={industryId as string}
                showPagination
              />
            </div>
          </div>
        </section>
      </SectionContainer>
    </div>
  );
}
