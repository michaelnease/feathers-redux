import $document from "../../lib/document/document";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

function PageTitleNav(props) {
  return ReactDOM.createPortal(
    <Fragment>{props.children}</Fragment>,
    $document.querySelector(".js-portal-page-title")
  );
}

export default PageTitleNav;
