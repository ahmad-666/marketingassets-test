import { useMemo } from "react";
import { useRouter } from "next/router";
import { getCompanies, getCompany } from "@/src/services/company";
import DetailsSection from "@/src/components/details/DetailsSection";
import ImageGallery from "@/src/components/details/ImageGallery";
import DescSection from "@/src/components/details/DescSection";
import DownloadSection from "@/src/components/details/DownloadSection";
import EmbedCompanyLogo from "@/src/components/details/EmbedCompanyLogo";
import UsefulLinks from "@/src/components/details/UsefulLinks";
import CompaniesList from "@/src/components/company/CompaniesList";
import ReviewSection from "@/src/components/details/ReviewSection";
import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import getRand from "@/src/utils/random";
import type { Company } from "@/src/types/Company";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import ContactInformation, {
  type Item as ContactItem,
} from "@/src/components/details/ContactInformation";
import BreadCrumb, {
  type Item as BreadcrumbItem,
} from "@/src/components/common/BreadCrumb";

type PageProps = {
  company: Company;
  relatedCompanies: Company[];
};

const relatedPageSize = 12;
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { logoId } = context.params;
    const company = await getCompany({ companyId: logoId as string });
    const { items: relatedCompanies } = await getCompanies({
      page: 1,
      pageSize: relatedPageSize,
      industry: company.industry,
    });
    return {
      props: {
        company: {
          id: company.domain,
          name: company.name,
          imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
          category: company.industry,
          country: company.country,
          facebook: company.facebook,
          twitter: company.twitter,
          linkedin: company.linkedin,
          overview: company.overview,
          size: company.size,
          followers: company.followers_count,
          founded: company.founded,
        },
        relatedCompanies: relatedCompanies
          .filter((company) => company.domain !== logoId)
          .map((company) => ({
            id: company.domain,
            name: company.name,
            category: company.industry,
            imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
          })),
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
const Page = ({ company, relatedCompanies = [] }: PageProps) => {
  const router = useRouter();
  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    return [
      {
        text: "Home",
        link: "/",
      },
      {
        text: company.category,
        link: `/industry/${company.category}`,
      },
      {
        text: company.name,
        link: `/logo/${company.id}`,
      },
    ];
  }, [company.category, company.id, company.name]);

  const contactItems = useMemo<ContactItem[]>(() => {
    return [
      {
        icon: "mdi:web",
        title: "Website",
        value: company.id,
        link: `https://${company.id}`,
        type: "link",
      },
      {
        icon: "mdi:linkedin",
        title: "LinkedIn",
        value: company.linkedin,
        link: `https://${company.linkedin}`,
        type: "link",
      },
      {
        icon: "mdi:twitter",
        title: "Twitter",
        value: company.twitter,
        link: `https://${company.twitter}`,
        type: "link",
      },
      {
        icon: "mdi:facebook",
        title: "Facebook",
        value: company.facebook,
        link: `https://${company.facebook}`,
        type: "link",
      },
      {
        icon: "mdi:account-group",
        title: "# Employees",
        value: company.size,
        type: "text",
      },
      {
        icon: "mdi:calendar",
        title: "Founded",
        value: company.founded,
        type: "text",
      },
      {
        icon: "mdi:account-plus",
        title: "# LinkedIn Followers",
        value: company.followers,
        type: "text",
      },
    ];
  }, [
    company.facebook,
    company.followers,
    company.founded,
    company.id,
    company.linkedin,
    company.size,
    company.twitter,
  ]);
  const title = useMemo(() => {
    return `Download ${company.name} Logo | CUFinder`;
  }, [company.name]);
  const desc = useMemo(() => {
    return `Download ${company.name} Logo in PNG Format`;
  }, [company.name]);
  return (
    <div className="wrapper">
      <MetaData
        title={title}
        description={desc}
        image={`${company.imgSrc}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWorkSeries",
          name: `Download ${company.name} Logo | CUFinder`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            ratingCount: `${getRand(150, 200)}`,
          },
        }}
      />
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <SectionContainer>
          <div className="row">
            <div className="col">
              <BreadCrumb items={breadcrumbItems} />
              <DetailsSection
                className="mt30"
                category={company.category}
                categoryLink={`/industry/${company.category}`}
                name={company.name}
              />
            </div>
          </div>
          <div className="row mt30">
            <div className="col-lg-8 col-xl-8">
              <ImageGallery name={company.name} imgSrc={company.imgSrc} />
              <ContactInformation
                className="mt30"
                name={company.name}
                items={contactItems}
              />
              <DescSection
                className="mt30"
                title="Description"
                desc={company.overview}
              />
              <ReviewSection type="logo" targetId={1} className="mt30" />
            </div>
            <div className="col-lg-4 col-xl-4">
              <DownloadSection
                name={company.name}
                src={company.imgSrc}
                text={desc}
              />
              <EmbedCompanyLogo className="mt30" />
              <UsefulLinks className="mt30" />
            </div>
          </div>
          <div className="row mt30">
            <CompaniesList
              title="Related Companies"
              items={relatedCompanies}
              showPagination={false}
              targetIndustry={company.category}
              targetCompany={router.query.logoId as string}
            />
          </div>
        </SectionContainer>
      </section>
    </div>
  );
};

export default Page;
