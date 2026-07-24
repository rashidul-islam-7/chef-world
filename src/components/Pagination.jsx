"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export function PaginationBasic({ totalPages = 1, currentPage = 1 }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // পেজ চেঞ্জ হলে URL আপডেট করার ফাংশন
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    // নতুন URL-এ নিয়ে যাওয়া
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination className="justify-center">
      <Pagination.Content>
        {/* Previous Button */}
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={currentPage === 1}
            onPress={() => handlePageChange(currentPage - 1)}
          >
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link
              isActive={p === currentPage}
              onPress={() => handlePageChange(p)}
            >
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        {/* Next Button */}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={currentPage === totalPages}
            onPress={() => handlePageChange(currentPage + 1)}
          >
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
