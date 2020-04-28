import React from "react";

function Toggle(props) {
  return (
    <div className="form-group" style={{ marginBottom: "0" }}>
      <label className="custom-switch" data-testid={props.testid || ""}>
        <input
          type="checkbox"
          name="custom-switch-checkbox"
          className="custom-switch-input"
          onChange={props.onChange}
          checked={props.checked}
        />
        <span className="custom-switch-indicator" />
        <span className="custom-switch-description">{props.name || ""}</span>
      </label>
    </div>
  );
}

export default Toggle;
