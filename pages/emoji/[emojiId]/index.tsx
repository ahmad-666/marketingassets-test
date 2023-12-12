import { useMemo } from "react";
import { getEmoji, getEmojis } from "@/src/services/emoji";
import DetailsSection from "@/src/components/details/DetailsSection";
import EmojiGallery from "@/src/components/details/EmojiGallery";
import DescSection from "@/src/components/details/DescSection";
import EmbedCompanyLogo from "@/src/components/details/EmbedCompanyLogo";
import UsefulLinks from "@/src/components/details/UsefulLinks";
import CopySection from "@/src/components/details/CopySection";
import SimilarTags from "@/src/components/details/SimilarTags";
import EmojisList from "@/src/components/emoji/EmojisList";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Emoji } from "@/src/types/Emoji";
import type { Faq, Tag } from "@/src/types/Common";
import BreadCrumb, {
  type Item as BreadcrumbItem,
} from "@/src/components/common/BreadCrumb";

type PageProps = {
  emoji: Emoji;
  relatedEmojis: Emoji[];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { emojiId } = context.params;
  const emoji = await getEmoji({ emojiId: emojiId as string });
  const { items: relatedEmojis } = await getEmojis({
    urls: emoji.emoji_list,
    page: 1,
  });

  return {
    props: {
      emoji: {
        id: emoji.url,
        emoji: emoji.emoji,
        name: emoji.text,
        categoryText: textNormalize(emoji.parent),
        categoryValue: emoji.parent,
        score: 5,
        usersScore: emoji.score,
        description: emoji.description,
        marketing: emoji.marketing,
        mean: emoji.mean,
        response: emoji.response,
        relatedEmojis: emoji.emoji_list,
      },
      relatedEmojis: relatedEmojis.map((emoji) => ({
        id: emoji.url,
        name: emoji.text,
        emoji: emoji.emoji,
        categoryValue: emoji.parent,
        categoryText: textNormalize(emoji.parent),
        score: 5,
        usersScore: emoji.score,
      })),
    },
  };
};
export default function Page({ emoji, relatedEmojis = [] }: PageProps) {
  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    return [
      {
        text: "Home",
        link: "/",
      },
      {
        text: emoji.categoryText,
        link: `/${emoji.categoryValue}`,
      },
      {
        text: emoji.emoji,
        link: `/emojis/${emoji.id}`,
      },
    ];
  }, [emoji.categoryText, emoji.categoryValue, emoji.emoji, emoji.id]);
  const faqs = useMemo<Faq[]>(() => {
    return [
      {
        question: `What is ${emoji.name} ${emoji.emoji} emoji?`,
        answer: emoji.description,
      },
      {
        question: `What does ${emoji.name} ${emoji.emoji} emoji mean?`,
        answer: emoji.mean,
      },
      {
        question: `What does ${emoji.name} ${emoji.emoji} emoji mean in marketing?`,
        answer: emoji.marketing,
      },
      {
        question: `How do you respond to ${emoji.name} ${emoji.emoji} emoji?`,
        answer: emoji.response,
      },
    ];
  }, [
    emoji.description,
    emoji.emoji,
    emoji.marketing,
    emoji.mean,
    emoji.name,
    emoji.response,
  ]);
  const tags = useMemo<Tag[]>(() => {
    return emoji.relatedEmojis.map((emoji) => ({
      text: textNormalize(emoji),
      route: `/emojis/${emoji}`,
    }));
  }, [emoji.relatedEmojis]);

  return (
    <div className="wrapper">
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <div className="container">
          <div className="row">
            <div className="col">
              <BreadCrumb items={breadcrumbItems} />
              <DetailsSection
                className="mt30"
                name={emoji.name}
                category={emoji.categoryText}
                categoryLink={`/${emoji.categoryValue}`}
                score={5}
                usersScore={emoji.score}
              />
            </div>
          </div>
          <div className="row mt30">
            <div className="col-lg-8 col-xl-8">
              <EmojiGallery emoji={emoji.emoji} />
              {faqs.map((faq) => (
                <DescSection
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
}
