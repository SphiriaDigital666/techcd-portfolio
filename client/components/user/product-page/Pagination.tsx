import React from "react";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="mt-[1.5em] flex items-center justify-center gap-[1em]">
      <button
        className="rounded-full border px-[1em] py-[0.5em] disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        tabIndex={0}
        aria-label="Previous page"
      >
        Previous
      </button>
      <div className="flex flex-wrap gap-[0.5em]">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`rounded px-[0.8em] py-[0.5em] ${currentPage === i + 1 ? "bg-foreground text-background" : "bg-background text-foreground"}`}
            onClick={() => setCurrentPage(i + 1)}
            tabIndex={0}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className="rounded-full border px-[1em] py-[0.5em] disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        tabIndex={0}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
