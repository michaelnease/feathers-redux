import { isUndefined } from "../../lib/value/value";
import $window from "../../lib/window/window";
import { useState, useEffect } from "react";

let tid;

/*
 * Useful for delaying showing a "loading" content after some
 * time (within).
 */
const useLoadWithinLimits = ({
  within = 250,
  watchlist,
  onLoaded = () => {},
}) => {
  const [ isTakingLonger, setIsTakingLonger ] = useState(false);
  const [ isFetching, setIsFetching ] = useState(true);
  const [ counter, setCounter ] = useState(0);
  const checkEvery = 100;

  const runCheck = () => {
    if (watchlist.every(v => !isUndefined(v))) {
      setIsTakingLonger(false);
      onLoaded();
      setIsFetching(false);
      $window.clearInterval(tid);
    }
    setCounter(p => p + 1);
  };

  useEffect(() => {
    if (counter >= Math.floor(within / checkEvery)) {
      setIsTakingLonger(true);
    }
  }, [ counter ]);

  useEffect(() => {
    tid = $window.setInterval(runCheck, checkEvery);
    runCheck();
    return () => $window.clearInterval(tid);
  }, watchlist);

  return { isTakingLonger, isFetching };
};

export default useLoadWithinLimits;
