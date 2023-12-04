"use client";

import EmojiCard from "@/app/components/cards/EmojiCard";
import type { Emoji } from "@/app/types/Emoji";

type EmojisListProps = {
  title: string;
  items: Emoji[];
};

export default function EmojisList({ title, items }: EmojisListProps) {
  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="main-title text-center">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos-delay="100" data-aos="fade-up">
            <div className="row">
              {items.map((item) => (
                <EmojiCard
                  className="col-sm-6 col-xl-3"
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  emoji={item.emoji}
                  score={item.score}
                  usersScore={item.usersScore}
                  category={item.category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
