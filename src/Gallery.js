import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./gallery.css";

const PER_PAGE = 8;

export default function Gallery(props) {

  const {images, openCanvas, dataRaw} = props;

  console.log("DATA PASSED TO GALLERY", dataRaw);

  const [currentPage, setCurrentPage] = useState(0);
  const data = images;
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map((data) => <img src={data.coco_url} onClick={() => openCanvas(data)}/>);

  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
    <div className="App">
      <h1>Image gallery</h1>
      <div className = "imageGrid">
        {currentPageData}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}
