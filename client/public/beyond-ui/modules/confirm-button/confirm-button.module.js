import "./confirm-button.css";
import React, { useState, Fragment } from "react";
const noop = () => void 0;

function ConfirmButton(props) {
  const [ isConfirming, setIsConfirming ] = useState(false);
  const defaultCallbacks = {
    onTrigger: noop,
    onActionCancel: noop,
    onAction: noop,
  };
  const callbacks = Object.assign(defaultCallbacks, props);
  const { onTrigger, onActionCancel, onAction } = callbacks;
  const { data } = props;

  const cancel = e => {
    e.preventDefault();
    setIsConfirming(false);
    if (onActionCancel) {
      onActionCancel(e, data);
    }
  };

  const confirm = e => {
    e.preventDefault();
    setIsConfirming(false);
    if (onAction) {
      onAction(e, data);
    }
  };

  const startConfirm = e => {
    e.preventDefault();
    setIsConfirming(true);
    if (onTrigger) {
      onTrigger(e, data);
    }
  };

  const buttonClass = `ui-button ${
    props.buttonSize ? "--" + props.buttonSize : ""
  }`;

  const confirmButtonClass = props.confirmButtonClass ? props.confirmButtonClass : "";

  return (
    <div className="ui-space-list">
      {isConfirming ? (
        <Fragment>
          <button className={buttonClass} onClick={cancel}>
            {props.cancelText ? props.cancelText : "No"}
          </button>
          <button className={buttonClass + " " + confirmButtonClass} onClick={confirm}>
            {props.confirmText ? props.confirmText : "Yes"}
          </button>
        </Fragment>
      ) : (
        <a className="action-link" href="" onClick={startConfirm}>
          {props.children}
        </a>
      )}
    </div>
  );
}

export default ConfirmButton;
