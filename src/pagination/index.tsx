import * as React from "react";
import "./index.less";
interface Props {
  current: number;
  page_size: number;
  total: number;
  change_page: (page: number, total: number) => void;
}

const Pagination = (prop: Props) => {
  const { current, page_size, total, change_page } = prop;
  const total_pages = Math.ceil(total / page_size);
  if (total_pages <= 1) return null;
  return (
    <span className="ub-pagination">
      {Array.from({ length: total_pages }).map((_, idx) => (
        <span key={idx} onClick={() => change_page(idx + 1, total)} className={current === idx + 1 ? "current" : ""}>
          {idx + 1}
        </span>
      ))}
    </span>
  );
};

export default Pagination;
