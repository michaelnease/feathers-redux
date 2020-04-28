import React from "react";

function RadioButton(props) {
  return (
    <div className="form-group" style={{ marginBottom: "0" }}>
      <label className="ui-radio" data-testid={props.testid || ""}>
        <input
          type="radio"
          name={props.name || "ui-radio"}
          className="ui-radio-input"
        />
        <span className="ui-radio-custom" />
        <span className="ui-radio-text">{props.label || ""}</span>
      </label>
    </div>
  );
}

export default RadioButton;
