import React from "react";

function Checkbox(props) {
  return (
    <div className="form-group" style={{ marginBottom: "0" }}>
      <label className="ui-checkbox" data-testid={props.testid || ""}>
        <input
          type="checkbox"
          name="ui-checkbox"
          className="ui-checkbox-input"
          onChange={props.onChange}
          checked={props.checked}
        />
        <span className="ui-checkbox-custom" />
        <span className="ui-checkbox-text">{props.name || ""}</span>
      </label>
    </div>
  );
}

export default Checkbox;
