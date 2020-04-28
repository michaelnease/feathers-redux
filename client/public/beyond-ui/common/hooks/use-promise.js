import { useState, useEffect, useRef } from "react";
import {
  UNDEFINED,
  isFunction,
  BadArgument,
  noop,
} from "../../lib/value/value";

const usePromise = (mainCall, callbacks) => {
  if (!isFunction(mainCall)) {
    throw new BadArgument("The first argument should be a function.");
  }
  const isMounted = useRef(true);
  const [ value, setValue ] = useState(UNDEFINED);
  const [ error, setError ] = useState(UNDEFINED);

  const defaultCallbacks = {
    _then: noop,
    _catch: noop,
    _finally: noop,
  };

  const cbs = Object.assign(defaultCallbacks, callbacks);
  const { _then, _catch, _finally } = cbs;

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    mainCall()
      .then(result => {
        if (isMounted.current) {
          setValue(result);
          _then(result);
        }
      })
      .catch(error => {
        setError(error);
        _catch(error);
      })
      .then(_ => {
        _finally();
      });
  }, []);

  return [ error, value ];
};

export default usePromise;
