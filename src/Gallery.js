import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ImageDetector from './ImageDetector';
import "./gallery.css";
import {Route, BrowserRouter as Router, Link, useHistory} from 'react-router-dom';

const PER_PAGE = 8;

export default function Gallery(props) {

  const {images, dataRaw} = props;
  
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);
  const data = images;
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map((data) => <img src={data.flickr_url}  onClick={()=> {history.push({pathname: '/canvas', state: {selectedImage: data, annotations: dataRaw.annotations, categories: dataRaw.categories}});}}></img>);

  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
      <div className="App">
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
