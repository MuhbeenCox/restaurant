import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
const PaginationButton = ({
  startIndex,
  endIndex,
  currentPage,
  pageSize,
  handlePageChange,
  totalPages,
  setPageSize,
}) => {
  return (
    <div className="w-full flex justify-between items-center md:justify-end gap-x-2  md:gap-x-6 mt-7">
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <div className="flex gap-x-1 md:gap-x-3 items-center text-sm">
          <span className="text-softtext hidden md:block"> Rows Per Page</span>
          <Select onValueChange={(value) => setPageSize(value)}>
            <SelectTrigger className="w-[60px] h-9">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm text-softtext  hidden md:block">
          {" "}
          {startIndex + 1} of {endIndex}{" "}
        </span>
      </div>
      <div className="flex gap-x-3">
        <button
          className=" pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          <ChevronFirst />
        </button>
        <button
          className=" pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft />
        </button>
        <button
          className=" pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight />
        </button>

        <button
          className=" pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          <ChevronLast />
        </button>
      </div>
    </div>
  );
};

export default PaginationButton;
