import React from "react";

function Spinner(props) {
  const defaults = {
    radius: "30px",
    duration: "500ms",
    color: "0, 0, 0",
  };
  const options = Object.assign(defaults, props);
  const styles = {
    "--spinner-radius": options.radius,
    "--spinner-duration": options.duration,
    "--spinner-color": options.color,
  };
  return <div style={styles} className="ui-spinner" />;
}

export default Spinner;
