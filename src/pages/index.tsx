import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import AssetsList from "@/src/components/asset/AssetsList";
import EmojiCategoryList from "@/src/components/emoji/EmojiCategoriesList";

export default function Page() {
  return (
    <div>
      <MetaData />
      <SectionContainer>
        <AssetsList />
        <EmojiCategoryList className="mt-7" />
      </SectionContainer>
    </div>
  );
}
