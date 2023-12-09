import { getCompanies, getCompany } from "@/app/services/company";
import DetailsSection from "@/app/components/details/DetailsSection";
import ImageGallery from "@/app/components/details/ImageGallery";
import Descriptions from "@/app/components/details/Descriptions";
import DownloadSection from "@/app/components/details/DownloadSection";
import EmbedCompanyLogo from "@/app/components/details/EmbedCompanyLogo";
import UsefulLinks from "@/app/components/details/UsefulLinks";
import CompaniesList from "@/app/components/listing/CompaniesList";
import type { Company } from "@/app/types/Company";
import ContactInformation, {
  type Item as ContactItem,
} from "@/app/components/details/ContactInformation";
import BreadCrumb, {
  type Item as BreadcrumbItem,
} from "@/app/components/common/BreadCrumb";

type PageProps = {
  params: {
    logoId: string;
  };
};
export const metadata = {
  title:
    "Listing Single V1 || Voiture - Automotive & Car Dealer NextJS Template",
};
export const dynamic = "force-dynamic";
const relatedPageSize = 12;
const Page = async ({ params: { logoId } }: PageProps) => {
  const company = await getCompany({ companyId: logoId });
  const { items: relatedCompaniesServer } = await getCompanies({
    page: 1,
    pageSize: relatedPageSize,
    industry: company.industry,
  });
  const relatedCompanies: Company[] = relatedCompaniesServer
    .filter((company) => company.domain !== logoId)
    .map((company) => ({
      id: company.domain,
      name: company.name,
      category: company.industry,
      imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
    }));
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: company.industry,
      link: `/industries/${company.industry}`,
    },
    {
      text: company.name,
      link: `/logos/${company.domain}`,
    },
  ];
  const contactItems: ContactItem[] = [
    {
      icon: "mdi:web",
      title: "Website",
      value: company.domain,
      link: `https://${company.domain}`,
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
      value: company.followers_count,
      type: "text",
    },
  ];
  const companyImg = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`;
  return (
    <div className="wrapper">
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <div className="container">
          <div className="row">
            <div className="col">
              <BreadCrumb items={breadcrumbItems} />
              <DetailsSection
                className="mt30"
                category={company.industry}
                categoryLink={`/industries/${company.industry}`}
                name={company.name}
              />
            </div>
          </div>
          <div className="row mt30">
            <div className="col-lg-8 col-xl-8">
              <ImageGallery name={company.name} imgSrc={companyImg} />
              <div className="opening_hour_widgets p30 mt30">
                <ContactInformation name={company.name} items={contactItems} />
              </div>
              <Descriptions
                className="mt30"
                title="Description"
                desc={company.overview}
              />
            </div>
            <div className="col-lg-4 col-xl-4">
              <DownloadSection
                name={company.name}
                src={companyImg}
                text={`Download ${company.name} Logo in PNG Format`}
              />
              <EmbedCompanyLogo className="mt30" />
              <UsefulLinks className="mt30" />
            </div>
          </div>
          <div className="row mt30">
            <CompaniesList
              title="Related Companies"
              items={relatedCompanies}
              showMore={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
