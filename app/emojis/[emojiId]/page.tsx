import { getEmoji, getEmojis } from "@/app/services/emoji";
import BreadCrumb, {
  type Item as BreadcrumbItem,
} from "@/app/components/common/BreadCrumb";
import DetailsSection from "@/app/components/details/DetailsSection";
import EmojiGallery from "@/app/components/details/EmojiGallery";
import ContactInformation, {
  type Item as ContactItem,
} from "@/app/components/details/ContactInformation";
import Descriptions from "@/app/components/details/Descriptions";
import DownloadSection from "@/app/components/details/DownloadSection";
import EmbedCompanyLogo from "@/app/components/details/EmbedCompanyLogo";
import UsefulLinks from "@/app/components/details/UsefulLinks";
import RelatedItems from "@/app/components/details/RelatedItems";
import { textNormalize } from "@/app/utils/textTransform";
import type { Emoji } from "@/app/types/Emoji";

type PageProps = {
  params: {
    emojiId: string;
  };
};
export const metadata = {
  title:
    "Listing Single V1 || Voiture - Automotive & Car Dealer NextJS Template",
};
export const dynamic = "force-dynamic";
const relatedPageSize = 12;
const Page = async ({ params: { emojiId } }: PageProps) => {
  const emoji = await getEmoji({ emojiId });
  const { items: relatedEmojisServer } = await getEmojis({
    page: 1,
    pageSize: relatedPageSize,
    emojiCategory: emoji.parent,
  });
  const category = {
    value: emoji.parent,
    text: textNormalize(emoji.parent),
  };
  const relatedEmojis: Emoji[] = relatedEmojisServer
    .filter((emoji) => emoji.url !== emojiId)
    .map((emoji) => ({
      id: emoji.id,
      name: emoji.text,
      emoji: emoji.emoji,
      category: category.value,
      score: 5,
      usersScore: emoji.score,
    }));
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: category.text,
      link: `/${category.value}`,
    },
    {
      text: emoji.text,
      link: `/emojis/${emoji.url}`,
    },
  ];
  const emojiImgSrc = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}`;
  return (
    <div className="wrapper">
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <div className="container">
          <div className="row">
            <div className="col">
              <BreadCrumb items={breadcrumbItems} />
              <DetailsSection
                className="mt30"
                name={emoji.text}
                category={category.text}
                categoryLink={`/${category.value}`}
                score={5}
                usersScore={emoji.score}
              />
            </div>
          </div>
          <div className="row mt30">
            <div className="col-lg-8 col-xl-8">
              <EmojiGallery emoji={emoji.emoji} />
              {/* <div className="opening_hour_widgets p30 mt30">
                <ContactInformation name={company.name} items={contactItems} />
              </div> */}
              {/* <div className="listing_single_description mt30">
                <Descriptions desc={company.overview} />
              </div> */}
            </div>
            {/* <div className="col-lg-4 col-xl-4">
              <DownloadSection name={company.name} imgSrc={companyImg} />
              <EmbedCompanyLogo className="mt30" />
              <UsefulLinks className="mt30" />
            </div> */}
          </div>
          {/* <div className="row mt30">
            <RelatedItems
              industry={company.industry}
              items={relatedCompanies}
              pageSize={relatedPageSize}
            />
          </div>  */}
        </div>
      </section>
    </div>
  );
};

export default Page;
