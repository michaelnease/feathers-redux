import $document from "../../lib/document/document";
import { useEffect } from "react";

function useOutsideClick(ref, cb) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  }

  useEffect(() => {
    $document.addEventListener("mousedown", handleClickOutside);
    return () => {
      $document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default useOutsideClick;
