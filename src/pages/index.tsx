import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import AssetsList from "@/src/components/asset/AssetsList";
import EmojiCategoryList from "@/src/components/emoji/EmojiCategoriesList";
import FaqsList from "@/src/components/others/FaqsList";
import BrandsList from "@/src/components/brand/BrandsList";
import NewsLetters from "@/src/components/others/NewsLetters";

export default function Page() {
  return (
    <div>
      <MetaData />
      <SectionContainer>
        <AssetsList />
        <EmojiCategoryList className="mt-7" />
        <FaqsList className="mt-7" />
        <BrandsList className="mt-7" />
      </SectionContainer>
      <NewsLetters className="mt-5 mb-n5" />
    </div>
  );
}
