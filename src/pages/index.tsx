import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import AssetsList from "@/src/components/asset/AssetsList";

export default function Page() {
  return (
    <div>
      <MetaData />
      <SectionContainer>
        <AssetsList />
      </SectionContainer>
    </div>
  );
}
