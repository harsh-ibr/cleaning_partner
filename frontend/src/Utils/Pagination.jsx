import React from "react";

const Pagination = React.memo(function Pagination({
  pagination,
  onPageChange,
}) {
  const pages = parseInt(pagination?.pages) || 0;
  const page = parseInt(pagination?.page) || 1;
  const maxVisible = 3;

  if (pages <= 1) return null;

  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > pages) {
    end = pages;
    start = Math.max(1, end - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  const baseBtn =
    "inline-flex items-center justify-center min-w-[36px] h-9 px-3 rounded-md text-sm font-medium transition";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center mt-6"
    >
      <ul className="flex items-center gap-1">
        {/* Prev */}
        <li>
          <button
            disabled={page === 1}
            onClick={() => page > 1 && onPageChange(page - 1)}
            className={`${baseBtn} ${
              page === 1
                ? "cursor-not-allowed text-white bg-gray-400"
                : "text-white bg-gray-400 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            «
          </button>
        </li>

        {/* First + ... */}
        {start > 1 && (
          <>
            <li>
              <button
                onClick={() => onPageChange(1)}
                className={`${baseBtn} text-gray-700 bg-gray-200 hover:bg-blue-50 hover:text-blue-600`}
              >
                1
              </button>
            </li>
            <li>
              <span className={`${baseBtn} cursor-default text-gray-400`}>
                ...
              </span>
            </li>
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`${baseBtn} ${
                p === page
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 bg-gray-200 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {p}
            </button>
          </li>
        ))}

        {/* ... + Last */}
        {end < pages && (
          <>
            <li>
              <span className={`${baseBtn} cursor-default text-gray-400`}>
                ...
              </span>
            </li>
            <li>
              <button
                onClick={() => onPageChange(pages)}
                className={`${baseBtn} text-gray-700 bg-gray-200 hover:bg-blue-50 hover:text-blue-600`}
              >
                {pages}
              </button>
            </li>
          </>
        )}

        {/* Next */}
        <li>
          <button
            disabled={page === pages}
            onClick={() => page < pages && onPageChange(page + 1)}
            className={`${baseBtn} ${
              page === pages
                ? "cursor-not-allowed text-white bg-gray-400"
                : "text-white bg-gray-400 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );
});

export default Pagination;
