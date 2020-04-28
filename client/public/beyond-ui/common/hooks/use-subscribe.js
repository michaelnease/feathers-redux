import $window from "../../lib/window/window";
import { useEffect, useState } from "react";
import { UNDEFINED } from "../../lib/value/value";

let observable;

const useSubscribe = (serviceName, options = {}, client = $window.client) => {
  const [ items, setItems ] = useState(UNDEFINED);

  useEffect(() => {
    observable = client
      .service(serviceName)
      .watch()
      .find(options)
      .subscribe(r => setItems(r.data));

    return () => {
      observable.unsubscribe();
    };
  }, []);

  return items;
};

export default useSubscribe;
