"use client";

import { useCallback, useEffect, useState } from "react";
import EmojiCard from "@/app/components/cards/EmojiCard";
import type { Emoji } from "@/app/types/Emoji";
import { getEmojis } from "@/app/services/emoji";
import { useParams } from "next/navigation";

type EmojisListProps = {
  title: string;
  items: Emoji[];
};

export default function EmojisList({ title, items }: EmojisListProps) {
  const [emojis, setEmojis] = useState<Emoji[]>(items);
  const [page, setPage] = useState(1);
  const { emojiId } = useParams();
  const addPage = useCallback(() => {
    setPage((old) => old + 1);
  }, []);
  const fetchEmojis = useCallback(async () => {
    try {
      const data = await getEmojis({
        emojiCategory: emojiId as string,
        page,
        pageSize: 8,
      });
      const newEmojis: Emoji[] = [];
      data.forEach((emoji) => {
        newEmojis.push({
          id: emoji.id,
          category: emoji.parent,
          name: emoji.text,
          emoji: emoji.emoji,
          score: 5,
          usersScore: emoji.score,
        });
      });
      setEmojis((old) => [...old, ...newEmojis]);
    } catch (err) {
      throw new Error(err);
    }
  }, [page, emojiId]);
  useEffect(() => {
    if (page !== 1) {
      fetchEmojis();
    }
  }, [page, fetchEmojis]);

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
              {emojis.map((emoji) => (
                <EmojiCard
                  className="col-sm-6 col-xl-3"
                  key={emoji.id}
                  id={emoji.id}
                  name={emoji.name}
                  emoji={emoji.emoji}
                  score={emoji.score}
                  usersScore={emoji.usersScore}
                  category={emoji.category}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="row mt20">
          <div className="col-lg-12">
            <div className="text-center">
              <button className="btn more_listing" onClick={addPage}>
                Show More
                <span className="icon">
                  <span className="fas fa-plus" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
