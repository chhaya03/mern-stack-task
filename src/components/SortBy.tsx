"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortingOptions = [
  { value: "price-asc", label: "Sort by price (asc)" },
  { value: "price-desc", label: "Sort by price (desc)" },
  { value: "created_at-asc", label: "Sort by created at (asc)" },
  { value: "created_at-desc", label: "Sort by created at (desc)" },
  { value: "rating-asc", label: "Sort by rating (asc)" },
  { value: "rating-desc", label: "Sort by rating (desc)" },
];

function SortBy() {
  const router = useRouter();
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params.toString());

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;

    if (selectedSort) {
      searchParams.set("sortBy", selectedSort);
    } else {
      searchParams.delete("sortBy");
    }

    searchParams.set("page", "1");

    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="text-black flex gap-2 items-center">
      <p className="text-white text-lg">Sort By</p>
      <select
        name="sorting"
        id="sorting"
        className="px-2 py-1 rounded"
        value={String(params.get("sortBy") || "")}
        onChange={handleChange}
      >
        <option value="">None</option>
        {sortingOptions.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBy;
