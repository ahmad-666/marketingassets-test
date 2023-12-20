import MetaData from "@/src/components/common/MetaData";
import AssetFilter from "../components/common/form/AssetFilter";
import Button from "../components/common/Button";

export default function Page() {
  return (
    <div>
      <MetaData />
      <h1>Home</h1>

      <Button size="md" dark>
        hello
      </Button>
      <Button size="lg" variant="outlined">
        hello
      </Button>
      <Button size="xl" variant="text">
        hello
      </Button>
      <AssetFilter />
    </div>
  );
}
