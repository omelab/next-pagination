// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  meta: {
    current_page: number;
    last_page: number;
  };
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const { current_page, last_page } = meta;

  const getPaginationButtons = () => {
    let pages: (number | string)[] = [];

    if (last_page <= 5) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      if (current_page <= 3) {
        pages = [1, 2, 3, 4, '...', last_page];
      } else if (current_page >= last_page - 2) {
        pages = [
          1,
          '...',
          last_page - 3,
          last_page - 2,
          last_page - 1,
          last_page,
        ];
      } else {
        pages = [
          1,
          '...',
          current_page - 1,
          current_page,
          current_page + 1,
          '...',
          last_page,
        ];
      }
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(current_page - 1)}
        disabled={current_page === 1}
      >
        &lt;
      </button>
      {getPaginationButtons().map((page, index) => (
        <button
          key={index}
          className={page === current_page ? 'active' : ''}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(current_page + 1)}
        disabled={current_page === last_page}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
