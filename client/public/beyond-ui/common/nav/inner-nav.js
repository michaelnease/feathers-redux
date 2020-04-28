import $document from "../../lib/document/document";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

function InnerNav(props) {
  return ReactDOM.createPortal(
    <Fragment>{props.children}</Fragment>,
    $document.querySelector(".js-inner-nav")
  );
}

export default InnerNav;
