"use client";

import { useRouter, useSearchParams } from "next/navigation";

function PaginationSection({
  lastPage,
  pageNo,
  pageSize,
}: {
  lastPage: number;
  pageNo: number;
  pageSize: number;
}) {
  const router = useRouter();
  const query = useSearchParams();
  const searchParams = new URLSearchParams(query.toString());

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    router.push(`?${searchParams.toString()}`);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    searchParams.set("pageSize", newSize);
    searchParams.set("page", "1"); 
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="mt-12 p-4 bg-gray-800 flex justify-center gap-4 items-center mb-8">
     
      <select
        value={pageSize}
        name="page-size"
        className="text-black"
        onChange={handlePageSizeChange}
      >
        {["10", "25", "50"].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>

      <button
        className="p-3 bg-slate-300 text-black disabled:cursor-not-allowed"
        disabled={pageNo === 1}
        onClick={() => handlePageChange(pageNo - 1)}
      >
        &larr; Prev
      </button>

      <p>
        Page {pageNo} of {10}
      </p>

      
      <button
        className="p-3 bg-slate-300 text-black disabled:cursor-not-allowed"
    
        onClick={() => handlePageChange(pageNo + 1)}
      >
        Next &rarr;
      </button>
    </div>
  );
}

export default PaginationSection;
