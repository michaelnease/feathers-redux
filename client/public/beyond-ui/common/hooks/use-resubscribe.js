import $window from "../../lib/window/window";
import { UNDEFINED } from "../../lib/value/value";
import { useEffect, useState } from "react";

let observable;
const useResubscribe = (serviceName, options, watchers = []) => {
  const [ data, setData ] = useState([]);
  const [ response, setResponse ] = useState(UNDEFINED);

  const resubscribe = (serviceName, options) => {
    const ob = $window.client
      .service(serviceName)
      .watch()
      .find(options)
      .subscribe(r => {
        setData(r.data);
        setResponse(r);
      });

    return ob;
  };

  useEffect(() => {
    observable = resubscribe(serviceName, options());

    return () => {
      observable.unsubscribe();
    };
  }, watchers);

  return [ data, response ];
};

export default useResubscribe;
