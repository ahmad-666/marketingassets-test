import { getEmoji, getEmojis } from "@/app/services/emoji";
import DetailsSection from "@/app/components/details/DetailsSection";
import EmojiGallery from "@/app/components/details/EmojiGallery";
import Descriptions from "@/app/components/details/Descriptions";
import EmbedCompanyLogo from "@/app/components/details/EmbedCompanyLogo";
import UsefulLinks from "@/app/components/details/UsefulLinks";
import CopySection from "@/app/components/details/CopySection";
import SimilarTags from "@/app/components/details/SimilarTags";
import EmojisList from "@/app/components/listing/EmojisList";
import { textNormalize } from "@/app/utils/textTransform";
import type { Emoji } from "@/app/types/Emoji";
import type { Faq, Tag } from "@/app/types/Common";
import BreadCrumb, {
  type Item as BreadcrumbItem,
} from "@/app/components/common/BreadCrumb";

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
const Page = async ({ params: { emojiId } }: PageProps) => {
  const emoji = await getEmoji({ emojiId });
  const { items: relatedEmojisServer } = await getEmojis({
    urls: emoji.emoji_list,
    page: 1,
  });
  const category = {
    value: emoji.parent,
    text: textNormalize(emoji.parent),
  };

  const relatedEmojis: Emoji[] = relatedEmojisServer.map((emoji) => ({
    id: emoji.url,
    name: emoji.text,
    emoji: emoji.emoji,
    categoryValue: category.value,
    categoryText: category.text,
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
  const faqs: Faq[] = [
    {
      question: `What is ${emoji.text} ${emoji.emoji} emoji?`,
      answer: emoji.description,
    },
    {
      question: `What does ${emoji.text} ${emoji.emoji} emoji mean?`,
      answer: emoji.mean,
    },
    {
      question: `What does ${emoji.text} ${emoji.emoji} emoji mean in marketing?`,
      answer: emoji.marketing,
    },
    {
      question: `How do you respond to ${emoji.text} ${emoji.emoji} emoji?`,
      answer: emoji.response,
    },
  ];
  const tags: Tag[] = emoji.emoji_list.map((emoji) => ({
    text: textNormalize(emoji),
    route: `/emojis/${emoji}`,
  }));

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
              {faqs.map((faq) => (
                <Descriptions
                  key={faq.question}
                  className="mt30"
                  title={faq.question}
                  desc={faq.answer}
                />
              ))}
              <SimilarTags
                className="mt30"
                title="Similar Emojis"
                tags={tags}
              />
            </div>
            <div className="col-lg-4 col-xl-4">
              <CopySection value={emoji.emoji} />
              <EmbedCompanyLogo className="mt30" />
              <UsefulLinks className="mt30" />
            </div>
          </div>
          <EmojisList
            className="row mt30"
            title="Related Emojis"
            items={relatedEmojis}
            showMore={false}
          />
        </div>
      </section>
    </div>
  );
};

export default Page;
