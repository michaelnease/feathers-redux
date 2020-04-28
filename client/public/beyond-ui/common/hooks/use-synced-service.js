import { useEffect, useState } from "react";
import { onEvents, offEvents, crudEvents } from "beyond-ui/lib/events/events";
import { UNDEFINED, isUndefined } from "../../lib/value/value";

const useSyncedService = (service, query = {}, events = []) => {
  if (isUndefined(service)) {
    throw new Error("Expected a feathers service to be passed.");
  }

  const [ items, setItems ] = useState(UNDEFINED);
  const [ error, setError ] = useState(UNDEFINED);
  const eventsToWatch = crudEvents.concat(events);

  const getItems = () => {
    service
      .find(query)
      .then(r => {
        if (r.data && Array.isArray(r.data)) {
          setItems(r.data);
        } else {
          setItems(r);
        }
      })
      .catch(err => {
        setError(err);
        setItems([]);
      });
  };

  useEffect(getItems, []);

  useEffect(() => {
    onEvents(service)(eventsToWatch, getItems);
    return () => offEvents(service)(eventsToWatch);
  }, []);

  return [ items, error ];
};

export default useSyncedService;
