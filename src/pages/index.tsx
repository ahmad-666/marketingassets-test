import MetaData from "@/src/components/common/MetaData";
import Container from "@/src/components/common/Container";
import AssetsList from "@/src/components/asset/AssetsList";
import EmojiCategoryList from "@/src/components/emoji/EmojiCategoriesList";
import HubSection from "@/src/components/others/HubSection";
import FaqsList from "@/src/components/others/FaqsList";
import BrandsList from "@/src/components/brand/BrandsList";
import NewsLetters from "@/src/components/others/NewsLetters";

export default function Page() {
  return (
    <div>
      <MetaData />
      <Container>
        <AssetsList />
        <EmojiCategoryList className="mt-7" />
      </Container>
      <HubSection className="mt-7" />
      <Container className="mt-7">
        <FaqsList />
        <BrandsList className="mt-7" />
      </Container>
      <NewsLetters className="mt-5" />
    </div>
  );
}
