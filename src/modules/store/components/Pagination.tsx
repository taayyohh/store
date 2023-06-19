'use client'

interface PaginationProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({ currentPage, setCurrentPage }: PaginationProps) {
  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
    </div>
  )
}
