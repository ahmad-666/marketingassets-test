import { useMemo } from "react";
import { useRouter } from "next/router";
import {
  getUniversities,
  getUniversity,
  getComments,
} from "@/src/services/university";
import ImageGallery from "@/src/components/details/ImageGallery";
import DescSection from "@/src/components/details/DescSection";
import DownloadSection from "@/src/components/details/DownloadSection";
// import EmbedCompanyLogo from "@/src/components/details/EmbedCompanyLogo";
import UsefulLinks from "@/src/components/details/UsefulLinks";
import UniversitiesList from "@/src/components/university/UniversitiesList";
import ReviewSection from "@/src/components/comment/ReviewSection";
import MetaData from "@/src/components/common/MetaData";
import Container from "@/src/components/common/Container";
import type { University, GetComments } from "@/src/types/University";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import ContactInformation, {
  type Item as ContactItem,
} from "@/src/components/details/ContactInformation";
import BreadCrumb, {
  type Item as BreadcrumbItem,
} from "@/src/components/common/BreadCrumb";
import CommentsSection from "@/src/components/comment/CommentsSection";
import getRand from "@/src/utils/random";

type PageProps = {
  university: University;
  relatedUniversities: University[];
  comments: GetComments;
};

const relatedPageSize = 12;
const commentPageSize = 5;
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { universityId } = context.params;
    const university = await getUniversity({ name: universityId as string });
    const { items: relatedUniversities } = await getUniversities({
      page: 1,
      pageSize: relatedPageSize,
    });
    const { items: comments, totalCount: totalComments } = await getComments({
      page: 1,
      pageSize: commentPageSize,
      universityId: university.id,
    });
    return {
      props: {
        university,
        relatedUniversities,
        comments: {
          items: comments,
          totalCount: totalComments,
        },
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
const Page = ({
  university,
  relatedUniversities = [],
  comments,
}: PageProps) => {
  const router = useRouter();
  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    return [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "universities",
        link: `/universities/`,
      },
      {
        text: university.name,
        link: `/university/${university.name}`,
      },
    ];
  }, [university.name]);

  const contactItems = useMemo<ContactItem[]>(() => {
    return [];
  }, []);
  const title = useMemo(() => {
    return `Download ${university.name} Logo | CUFinder`;
  }, [university.name]);
  const desc = useMemo(() => {
    return `Download ${university.name} Logo in PNG Format`;
  }, [university.name]);
  return (
    <div className="wrapper">
      <MetaData
        title={title}
        description={desc}
        image={`${university.imgSrc}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWorkSeries",
          name: `Download ${university.name} Logo | CUFinder`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            ratingCount: `${getRand(150, 200)}`,
          },
        }}
      />
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <Container>
          <div className="row">
            <div className="col">
              <BreadCrumb items={breadcrumbItems} />
              <h1 className="fs-3 text-dark-color text-capitalize mt-3">
                {university.name}
              </h1>
            </div>
          </div>
          <div className="row mt30">
            <div className="col-lg-8 col-xl-8">
              <ImageGallery name={university.name} imgSrc={university.imgSrc} />
              <ContactInformation
                className="mt30"
                name={university.name}
                items={contactItems}
              />
              <DescSection
                className="mt30"
                title="Description"
                desc={university.overview}
              />
              <ReviewSection
                type="university"
                targetId={university.id}
                className="mt30"
              />
              {!!comments.items.length && (
                <CommentsSection
                  className="mt30"
                  type="university"
                  targetId={university.id}
                  comments={comments.items}
                  totalComments={comments.totalCount}
                  pageSize={commentPageSize}
                />
              )}
            </div>
            <div className="col-lg-4 col-xl-4 mt30 mt-lg-0">
              <DownloadSection
                name={university.name}
                src={university.imgSrc}
                text={desc}
              />
              {/* <EmbedCompanyLogo className="mt30" /> */}
              <UsefulLinks className="mt30" />
            </div>
          </div>
          <div className="row mt30">
            <UniversitiesList
              title="Related Universities"
              items={relatedUniversities}
              showPagination={false}
              targetUniversity={router.query.universityId as string}
            />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Page;
