import EmojisList from "@/app/components/listing/EmojisList";
import React from "react";

export default async function Page() {
  //from pages components,... other places in client-side send req to localhost:3000/api , from /api folder get those requests and connect to db and return response
  const posts = await fetch("http://localhost:3000/api/emojis/456");
  const result = await posts.json();
  console.log(result);
  return (
    <div>
      <EmojisList title="emojis" items={[]} />
    </div>
  );
}
