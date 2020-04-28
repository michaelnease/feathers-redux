import React, { useState, useEffect } from "react";

function Paginate(props) {
  const [pageNumber, setPageNumber] = useState(props.pageNumber || 1);
  const [totalPages] = useState(props.totalPages || 1);
  const [increment] = useState(props.increment || 1);
  const [allowSkip] = useState(props.allowSkip || false);
  const allPages = [...Array(totalPages).keys()]
    .map(x => ++x)
    .slice(1, totalPages - 1);
  const [limitedPages, setLimitedPages] = useState(allPages.slice(0, 4));
  const [isHovering, setIsHovering] = useState(false);

  const isActivePage = page => {
    return pageNumber === page;
  };

  const incrementPage = () => {
    if (pageNumber + increment < totalPages) {
      setPageNumber(pageNumber + increment);
    } else {
      setPageNumber(totalPages);
    }
  };

  const decrementPage = () => {
    if (pageNumber - increment > 1) {
      setPageNumber(pageNumber - increment);
    } else {
      setPageNumber(1);
    }
  };

  const mapPages = arr => {
    return arr.map((page, i) => {
      return (
        <button
          key={i}
          className={
            "ui-button paginate-button " +
            (isActivePage(page) ? "active-page" : "")
          }
          onClick={_ => setPageNumber(page)}
        >
          {page}
        </button>
      );
    });
  };

  useEffect(() => {
    if (pageNumber < 4) {
      setLimitedPages(allPages.slice(0, 4));
    } else if (pageNumber === 4) {
      setLimitedPages(allPages.slice(0, 5));
    } else if (pageNumber > 4 && pageNumber < totalPages - 3) {
      setLimitedPages(allPages.slice(pageNumber - 4, pageNumber + 1));
    } else if (pageNumber === totalPages - 3) {
      setLimitedPages(allPages.slice(totalPages - 7));
    } else {
      setLimitedPages(allPages.slice(totalPages - 6));
    }
  }, [pageNumber]);

  return (
    <div className="paginate">
      <button
        disabled={pageNumber === 1}
        className="ui-button paginate-button"
        onClick={_ => setPageNumber(prev => prev - 1)}
      >
        <i className="fe fe-chevron-left" />
      </button>
      <button
        className={
          "ui-button paginate-button " + (isActivePage(1) ? "active-page" : "")
        }
        onClick={_ => setPageNumber(1)}
      >
        1
      </button>
      <i
        className={
          "skip-page-option " +
          (isHovering ? "fe fe-chevrons-left" : "fe fe-more-horizontal") +
          (pageNumber < 5 || !allowSkip ? " display-none" : "")
        }
        onMouseEnter={_ => setIsHovering(prev => !prev)}
        onMouseLeave={_ => setIsHovering(prev => !prev)}
        onClick={_ => decrementPage()}
      />
      {allowSkip ? mapPages(limitedPages) : mapPages(allPages)}
      <i
        className={
          "skip-page-option " +
          (isHovering ? "fe fe-chevrons-right" : "fe fe-more-horizontal") +
          (pageNumber > totalPages - 4 || !allowSkip ? " display-none" : "")
        }
        onMouseEnter={_ => setIsHovering(prev => !prev)}
        onMouseLeave={_ => setIsHovering(prev => !prev)}
        onClick={_ => incrementPage()}
      />
      <button
        className={
          "ui-button paginate-button " +
          (isActivePage(totalPages) ? "active-page" : "")
        }
        onClick={_ => setPageNumber(totalPages)}
      >
        {totalPages}
      </button>
      <button
        disabled={pageNumber === totalPages}
        className="ui-button paginate-button"
        onClick={_ => setPageNumber(prev => prev + 1)}
      >
        <i className="fe fe-chevron-right" />
      </button>
    </div>
  );
}

export default Paginate;
