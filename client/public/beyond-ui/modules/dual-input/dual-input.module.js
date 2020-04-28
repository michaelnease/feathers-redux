import React, { useState, useEffect } from "react";
import Tippy from "@tippy.js/react";
import { isFunction, isUndefined, isNumber, isObject, isString } from "lib/value/value";

const emptyTooltip = {content: ""};

const isValidToolTip = (tipObject) => {
  return isObject(tipObject) && isString(tipObject.content);
};

function DualInput(props) {
  const initialActiveIdx = !isUndefined(props.activeIndex)
    ? props.activeIndex
    : 0;

  if (!isNumber(initialActiveIdx)) {
    throw new Error("`activeIndex` should be a number");
  }

  if (!(initialActiveIdx === 0 || initialActiveIdx === 1)) {
    throw new Error("`activeIndex` should be either 0 or 1.");
  }

  const [activeInputIndex, setActiveInputIndex] = useState(initialActiveIdx);
  const tooltip1 = isValidToolTip(props.tooltip1) ? props.tooltip1 : emptyTooltip;
  const tooltip2 = isValidToolTip(props.tooltip2) ? props.tooltip2 : emptyTooltip;

  useEffect(() => {
    if (isFunction(props.onActiveIndexChange)) {
      props.onActiveIndexChange(activeInputIndex);
    }
  }, [activeInputIndex]);

  useEffect(() => {
    setActiveInputIndex(props.activeIndex);
  }, [props.activeIndex]);

  return (
    <div className="dual-input" style={props.style}>
      <div className="dual-input__buttons">
        <Tippy
          {...tooltip1}
          onShow={instance => tooltip1.content ? true : false}
        >
          <button
            className={`ui-button --tiny ${
              activeInputIndex === 0 ? "active" : ""
            }`}
            onClick={_ => setActiveInputIndex(0)}
          >
            <span>{isFunction(props.text1) ? props.text1() : props.text1}</span>
          </button>
        </Tippy>
        <Tippy
          {...tooltip2}
          onShow={instance => tooltip2.content ? true : false}
        >
          <button
            className={`ui-button --tiny ${
              activeInputIndex === 1 ? "active" : ""
            }`}
            onClick={_ => setActiveInputIndex(1)}
          >
            <span>{isFunction(props.text2) ? props.text2() : props.text2}</span>
          </button>
        </Tippy>
      </div>
      <div className="dual-input__children">
        {props.children[activeInputIndex]}
      </div>
    </div>
  );
}

export default DualInput;
