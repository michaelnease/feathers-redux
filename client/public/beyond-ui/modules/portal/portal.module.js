import "./portal.css";
import $document from "../../lib/document/document";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Portal(props) {
  const [ isVisible, setIsVisible ] = useState(false);
  const portalRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    $document.body.classList.add("portal--active");
    return () => {
      setIsVisible(false);
      $document.body.classList.remove("portal--active");
    };
  }, []);

  useEffect(() => {
    if (portalRef.current) {
      props.onPortalRef ? onPortalRef() : null;
    }
  }, [ portalRef.current ]);

  return ReactDOM.createPortal(
    <div
      aria-modal="true"
      tabIndex="-1"
      ref={portalRef}
      role="alertdialog"
      aria-label="Confirm"
      className={`portal ui-card ${isVisible ? "--active" : ""} `}
    >
      {props.children}
    </div>,
    $document.body
  );
}

export default Portal;
