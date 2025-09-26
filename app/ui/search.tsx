"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // useSearchParams returns a URLSearchParams object e.g. ?query=abc&page=2
  const pathname = usePathname(); // usePathname returns the current pathname e.g. /dashboard/invoices
  const { replace } = useRouter(); // useRouter returns an object with methods to navigate programmatically

  const handleSearch = useDebouncedCallback(async (term) => {
    console.log("Searching for:", term);

    const params = new URLSearchParams(searchParams); // Create a new URLSearchParams object from the current search params to modify it safely without mutating the original one directly (which is read-only) e.g. ?query=abc&page=2
    params.set("page", "1"); // Reset to the first page on new search
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500); // Debounce the search input by 300ms to avoid excessive URL updates on every keystroke

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString() || ""}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
