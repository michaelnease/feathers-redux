import React, { useState } from "react";

function SimplePaginate(props) {
  const [pageNumber, setPageNumber] = useState(props.pageNumber || 1);
  const [totalPages] = useState(props.totalPages || 1);

  return (
    <div className="paginate">
      <button
        disabled={pageNumber === 1}
        className="ui-button paginate-button"
        onClick={_ => setPageNumber(prev => prev - 1)}
      >
        <i className="fe fe-chevron-left" />
      </button>
      <button className="ui-button primary-outline" disabled>
        {pageNumber} / {totalPages}
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

export default SimplePaginate;
