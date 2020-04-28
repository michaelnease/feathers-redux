import React, { useEffect, useRef } from "react";

/*
Examples:
<Uploader allowedTypes={[ ".csv" ]} onUpload={onUpload}>
  <button
    disabled={!canUpload}
    type="button"
    className="btn btn-info"
  >
    Upload Data
  </button>
</Uploader>

More involved example:

<Uploader
  className="l-mt1"
  onUpload={file => {
    const formData = new $window.FormData();
    formData.set("file", file);
    projectModel
      .importProject({
        form: formData,
        refineryID: refinery.id,
      })
      .then(r => {
        const project = r.data;
        refreshProjects(refinery.id);
        toaster.success(
          `Project ${project.name} imported successfully.`,
          {
            dismiss: 1500,
          }
        );
      })
      .catch(e => {
        toaster.failure("Project was not imported.", {
          dismiss: 1500,
        });
        throw new Error(e);
      });
  }}
  allowedTypes={[ ".json" ]}
>
  {!(failIfRolesNotInStorage() && !sufficientRole()) ? (
    <button className="btn btn-outline-info btn-block">Import</button>
  ) : null}
</Uploader>
*/

function Uploader(props) {
  const selectFileInput = useRef(null);

  useEffect(() => {
    const curr = selectFileInput.current;
    if (props.shouldOpen && curr) {
      curr.click();
    }
  }, [ props.shouldOpen ]);

  // Allows picking the same file again.
  const resetSelectedFile = event => {
    event.target.value = null;
  };

  // onWrapperClick provides a click event on the wrapping element to the
  // component to trigger a click on the hidden input.
  const onWrapperClick = () => {
    const curr = selectFileInput.current;
    const onClick = props.onClick;

    // If an onClick is passed, it is up to the callee to initiate the input
    // pop-up.
    if (onClick) {
      onClick(() => curr.click());
    } else if (curr) {
      curr.click();
    }
  };

  // Calls props.onUpload with the selected files from the input.
  const onFileSelect = () => {
    const curr = selectFileInput.current;
    const onUpload = props.onUpload;

    if (curr && onUpload) {
      const fileList = curr.files;
      if (props.multiple) {
        onUpload(fileList);
      } else {
        onUpload(fileList[0]);
      }
    }
  };

  return (
    <a
      className={props.className}
      onClick={props.disabled ? null : _ => onWrapperClick()}
      style={{ display: "block", textDecoration: "none", width: "auto" }}
    >
      <input
        disabled={props.disabled}
        type="file"
        id="file-upload"
        className="hide-input"
        ref={selectFileInput}
        multiple={props.multiple}
        accept={props.allowedTypes ? props.allowedTypes.join(",") : ""}
        onChange={_ => onFileSelect()}
        onClick={resetSelectedFile}
        style={{ display: "none" }}
      />
      {props.children}
    </a>
  );
}

// Uploader.propTypes = {
//   allowedTypes: PropTypes.array,
//   className: PropTypes.string,
//   onClick: PropTypes.func,
//   onUpload: PropTypes.func,
//   shouldOpen: PropTypes.bool,
//   disabled: PropTypes.bool,
//   multiple: PropTypes.bool,
// };

export default Uploader;
