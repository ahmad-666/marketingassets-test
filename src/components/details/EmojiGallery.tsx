type EmojiGalleryProps = {
  emoji: string;
  className?: string;
};

export default function EmojiGallery({
  emoji,
  className = "",
}: EmojiGalleryProps) {
  return (
    <div className={`${className}`}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          fontSize: "100px",
        }}
      >
        {emoji}
      </div>
    </div>
  );
}
