import FaqCard, { type FaqCardProps as FaqType } from "./FaqCard";
import LineTitle from "@/src/components/others/LineTitle";

type FaqsList = {
  className?: string;
};
type Faq = Omit<FaqType, "className">;
const faqs: Faq[] = [
  {
    question: "What is CUFinder's marketing assets service?",
    answer:
      "CUFinder's marketing assets service is a free service that provides customized logos, emojis, gifs, and stickers to help users send personalized messages to their target audience. The service allows businesses and individuals to create unique and engaging marketing materials that stand out and make an impact.",
  },
  {
    question: "Who can use CUFinder's marketing assets service?",
    answer:
      "CUFinder's marketing assets service is available to anyone looking to create personalized marketing materials. Whether you're a small business owner, marketer, or just looking to add some fun to your personal communications, CUFinder's marketing assets service can help.",
  },
  {
    question: "What can I customize with CUFinder's marketing assets service?",
    answer:
      "With CUFinder's marketing assets service, you can customize logos, emojis, gifs, and stickers with special text or images to make them unique to your brand or message.",
  },
  {
    question: "Is there a cost for using CUFinder's marketing assets service?",
    answer:
      "No, CUFinder's marketing assets service is completely free for all users.",
  },
  {
    question: "How do I access CUFinder's marketing assets service?",
    answer:
      "Accessing CUFinder's marketing assets service is simple. You can access the service directly through the CUFinder platform, where you can choose the type of asset you'd like to create, customize it with your desired text or image, and then download or share it as needed.",
  },
];
export default function FaqsList({ className }: FaqsList) {
  return (
    <div className={`${className}`}>
      <LineTitle title="Frequently Asked Question" />
      <div className="mt-3">
        {faqs.map((faq) => (
          <FaqCard
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            className="my-3"
          />
        ))}
      </div>
    </div>
  );
}
