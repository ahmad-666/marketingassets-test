import { useMemo } from "react";
import { getEmoji, getEmojis } from "@/src/services/emoji";
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
import EmojisList from "@/src/components/emoji/EmojisList";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Emoji } from "@/src/types/Emoji";
import type { Faq, Tag } from "@/src/types/Common";
import MetaData from "@/src/components/common/MetaData";
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
  try {
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
  } catch (err) {
    return { notFound: true };
  }
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
        link: `/emoji/${emoji.id}`,
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
  const deviceItems = useMemo<DeviceItem[]>(() => {
    return [
      {
        device: "Apple",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.id}-Apple.png`,
      },
      {
        device: "Google Noto Color",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.id}-Google-Noto-Color-Emoji.png`,
      },
      {
        device: "Microsoft",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.id}-Microsoft.png`,
      },
      {
        device: "Samsung",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.id}-Samsung.png`,
      },
      {
        device: "Twitter",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.id}-Twitter.png`,
      },
      {
        device: "WhatsApp",
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.id}-WhatsApp.png`,
      },
    ];
  }, [emoji.id]);
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
        image={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/emojis/${emoji.id}-Apple.png`}
      />
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
            </div>
            <div className="col-lg-4 col-xl-4">
              <CopySection value={emoji.emoji} />
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
        </div>
      </section>
    </div>
  );
}
