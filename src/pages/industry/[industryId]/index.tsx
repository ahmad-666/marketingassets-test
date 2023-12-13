import { useMemo } from "react";
import { useRouter } from "next/router";
import CompaniesList from "@/src/components/company/CompaniesList";
import { getCompanies } from "@/src/services/company";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Company } from "@/src/types/Company";

type PageProps = {
  companies: Company[];
  totalCompanies: number;
};
const pageSize = 8;
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { industryId } = context.params;
    const decodedIndustry = decodeURIComponent(industryId as string);
    const { items: companies, meta: companiesMeta } = await getCompanies({
      industry: decodedIndustry,
      page: 1,
      pageSize,
    });
    return {
      props: {
        companies: companies.map((company) => ({
          id: company.domain,
          category: company.industry,
          name: company.name,
          imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
        })),
        totalCompanies: companiesMeta.totalCount,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
export default function Page({
  companies = [],
  totalCompanies = 0,
}: PageProps) {
  const router = useRouter();
  const { industryId } = router.query;
  const industryText = useMemo(() => {
    const decodedIndustry = decodeURIComponent(industryId as string);
    return textNormalize(decodedIndustry);
  }, [industryId]);
  return (
    <div>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="main-title text-center">
              <h2>
                {`${industryText} Company Logos Repository: Download Logos in industry ${industryText}`}
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt40">
          <div className="col-lg-12">
            <CompaniesList
              title="Browse Companies"
              items={companies}
              totalItems={totalCompanies}
              pageSize={pageSize}
              targetIndustry={industryId as string}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
