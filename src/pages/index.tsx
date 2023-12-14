import Pagination from "@/src/components/common/Pagination";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <h1>Home</h1>
      <Pagination
        page={page}
        setPage={(newVal) => setPage(newVal)}
        totalItems={100}
        pageSize={10}
      />
    </div>
  );
}
