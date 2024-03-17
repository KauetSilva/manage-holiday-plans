import React, { useState } from "react";

export function PaginationHoliday({ onPageChange, totalPages }: any) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
        <button
          onClick={() => handlePageChange(i)}
          className={`${
            currentPage === i
              ? "bg-gray-500 text-primary-foreground hover:bg-primary/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          } ${currentPage === i ? "" : ""} px-4 py-2 rounded flex items-center justify-center`}
          disabled={currentPage === i}
          style={{ width: "25px", height: "30px" }}
        >
          {i}
        </button>
      </li>
      
      );
    }
    return pageNumbers;
  };

  return (
    <nav className="pagination mt-5 mb-2">
      <ul className="flex flex-row items-center justify-center gap-1">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-transparent text-black"
            style={{ width: "80px" }}
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-transparent text-black"
            style={{ width: "80px" }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
