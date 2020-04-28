import $document from "../../lib/document/document";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

function TopNav(props) {
  return ReactDOM.createPortal(
    <Fragment>{props.children}</Fragment>,
    $document.querySelector(".dashboard__header")
  );
}

export default TopNav;
