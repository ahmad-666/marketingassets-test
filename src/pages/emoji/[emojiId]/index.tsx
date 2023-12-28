import { useMemo } from "react";
import { getEmoji, getEmojis, getComments } from "@/src/services/emoji";
import Container from "@/src/components/common/Container";
import DetailsSection from "@/src/components/details/DetailsSection";
import EmojiGallery from "@/src/components/details/EmojiGallery";
import DescSection from "@/src/components/details/DescSection";
import EmbedCompanyLogo from "@/src/components/details/EmbedCompanyLogo";
import UsefulLinks from "@/src/components/details/UsefulLinks";
import CopySection from "@/src/components/details/CopySection";
import EmojiDevices, {
  type Item as DeviceItem,
} from "@/src/components/details/EmojiDevices";
import SimilarTags from "@/src/components/details/SimilarTags";
import ReviewSection from "@/src/components/details/ReviewSection";
import EmojisList from "@/src/components/emoji/EmojisList";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Emoji, GetComments } from "@/src/types/Emoji";
import type { Faq, Tag } from "@/src/types/Common";
import BreadCrumb, {
  type Item as BreadcrumbItem,
} from "@/src/components/common/BreadCrumb";
import MetaData from "@/src/components/common/MetaData";
import CommentsSection from "@/src/components/details/CommentsSection";

type PageProps = {
  emoji: Emoji;
  relatedEmojis: Emoji[];
  comments: GetComments;
};

const commentPageSize = 5;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { emojiId } = context.params;
    const emoji = await getEmoji({ url: emojiId as string });
    const { items: relatedEmojis } = await getEmojis({
      urls: emoji.relatedEmojis,
      page: 1,
    });
    const { items: comments, totalCount: totalComments } = await getComments({
      page: 1,
      pageSize: commentPageSize,
      emojiId: emoji.id,
    });
    return {
      props: {
        emoji,
        relatedEmojis,
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
export default function Page({
  emoji,
  relatedEmojis = [],
  comments,
}: PageProps) {
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
        link: `/emoji/${emoji.url}`,
      },
    ];
  }, [emoji.categoryText, emoji.categoryValue, emoji.emoji, emoji.url]);
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
  const deviceItems = useMemo<DeviceItem[]>(() => {
    return [
      {
        device: "Apple",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}-Apple.png`,
      },
      {
        device: "Google Noto Color",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}-Google-Noto-Color-Emoji.png`,
      },
      {
        device: "Microsoft",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}-Microsoft.png`,
      },
      {
        device: "Samsung",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}-Samsung.png`,
      },
      {
        device: "Twitter",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}-Twitter.png`,
      },
      {
        device: "WhatsApp",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}-WhatsApp.png`,
      },
    ];
  }, [emoji.url]);
  const tags = useMemo<Tag[]>(() => {
    return emoji.relatedEmojis.map((emoji) => ({
      text: textNormalize(emoji),
      route: `/emoji/${emoji}`,
    }));
  }, [emoji.relatedEmojis]);

  return (
    <div className="wrapper">
      <MetaData
        title={`${emoji.emoji} ${emoji.name} emoji | CUFinder`}
        description={emoji.description}
        image={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.url}-Apple.png`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWorkSeries",
          name: `${emoji.emoji} ${emoji.name} | CUFinder`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: `${emoji.score}`,
            bestRating: "5",
            ratingCount: `${emoji.usersScore}`,
          },
        }}
      />
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <Container>
          <div className="row">
            <div className="col">
              <BreadCrumb items={breadcrumbItems} />
              <DetailsSection
                className="mt30"
                name={emoji.name}
                category={emoji.categoryText}
                categoryLink={`/${emoji.categoryValue}`}
                score={emoji.score}
                usersScore={emoji.usersScore}
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
              <EmojiDevices
                className="mt30"
                name={emoji.name}
                items={deviceItems}
              />
              <SimilarTags
                className="mt30"
                title="Similar Emojis"
                tags={tags}
              />
              <ReviewSection
                type="emoji"
                targetId={emoji.id}
                className="mt30"
              />
              {!!comments.items.length && (
                <CommentsSection
                  className="mt30"
                  type="emoji"
                  targetId={emoji.id}
                  comments={comments.items}
                  pageSize={commentPageSize}
                  totalComments={comments.totalCount}
                />
              )}
            </div>
            <div className="col-lg-4 col-xl-4">
              <CopySection value={emoji.emoji} className="mt30 mt-lg-0" />
              <EmbedCompanyLogo className="mt30" />
              <UsefulLinks className="mt30" />
            </div>
          </div>
          <div className="row mt30">
            <h2 className="fs-3 text-dark-color">Related Emojis</h2>
            <EmojisList
              className="mt-4 pt-0 px-0"
              title=""
              items={relatedEmojis}
              emojiList={emoji.relatedEmojis}
              showPagination={false}
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
