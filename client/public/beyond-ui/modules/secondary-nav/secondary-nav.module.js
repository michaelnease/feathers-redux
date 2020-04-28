import React, { useEffect, useRef, useState } from "react";
import debounce from "common/debounce/debounce";

function SecondaryNav(props) {
  const secondNavRef = useRef(null);
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (secondNavRef.current) {
      var handler = () => {
        const scrollNode = secondNavRef.current;
        const isEnd =
          scrollNode.scrollWidth - scrollNode.clientWidth ===
          scrollNode.scrollLeft;
        const isNotScrollable =
          scrollNode.parentElement.scrollWidth >= scrollNode.scrollWidth;

        if (isNotScrollable) {
          setStart(true);
          setEnd(true);
        } else if (scrollNode.scrollLeft === 0) {
          setStart(true);
          setEnd(false);
        } else if (isEnd) {
          setStart(false);
          setEnd(true);
        } else {
          setStart(false);
          setEnd(false);
        }
      };

      var debouncedScrollHandler = debounce(handler, 100);
      var debouncedResizeHandler = debounce(handler, 500);

      secondNavRef.current.addEventListener("scroll", debouncedScrollHandler);
      window.addEventListener("resize", debouncedResizeHandler);
      handler();
      setIsLoaded(true);
    }
    return () => {
      secondNavRef.current.removeEventListener(
        "scroll",
        debouncedScrollHandler
      );
      window.removeEventListener("resize", debouncedResizeHandler);
    };
  }, [secondNavRef.current]);

  const rafToRight = (toMoveBy, node, end) => {
    if (node.scrollLeft < end) {
      if (node.scrollLeft + toMoveBy > end) {
        node.scrollLeft += end - node.scrollLeft;
      } else {
        node.scrollLeft += toMoveBy;
      }
      requestAnimationFrame(() => rafToRight(toMoveBy, node, end));
    }
  };

  const rafToLeft = (toMoveBy, node, end) => {
    if (node.scrollLeft > end) {
      if (node.scrollLeft - toMoveBy < end) {
        node.scrollLeft -= node.scrollLeft - end;
      } else {
        node.scrollLeft -= toMoveBy;
      }
      requestAnimationFrame(() => rafToLeft(toMoveBy, node, end));
    }
  };

  const scroller = (direction) => {
    if (secondNavRef.current) {
      const scrollNode = secondNavRef.current;
      const scrollWidth = scrollNode.scrollWidth - scrollNode.clientWidth;
      const distance = Math.ceil(
        scrollWidth / (Math.round(scrollWidth / 1000) + 1)
      );

      if (direction === "left") {
        let toHit = scrollNode.scrollLeft - distance;
        if (toHit < 0) {
          toHit = 0;
        }
        requestAnimationFrame(() => rafToLeft(20, scrollNode, toHit));
      } else {
        let toHit = scrollNode.scrollLeft + distance;
        if (toHit > scrollWidth) {
          toHit = scrollWidth;
        }
        requestAnimationFrame(() => rafToRight(20, scrollNode, toHit));
      }
    }
  };

  return (
    <div
      className={`secondary-nav-container ${isLoaded ? "visible" : ""} ${
        props.containerClassName ? props.containerClassName : ""
      }`}
      style={props.containerStyles ? props.containerStyles : {}}
    >
      <span
        className={`second-nav-left ${start ? "display-none" : ""}`}
        onClick={(_) => scroller("left")}
      >
        <i className="fe fe-chevron-left" />
      </span>
      <div ref={secondNavRef} className="secondary-nav">
        {props.children}
      </div>
      <span
        className={`second-nav-right ${end ? "display-none" : ""}`}
        onClick={(_) => scroller("right")}
      >
        <i className="fe fe-chevron-right" />
      </span>
    </div>
  );
}

export default SecondaryNav;
