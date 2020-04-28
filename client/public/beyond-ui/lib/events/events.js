import { BadArgument, isObject, isFunction, isString } from "../value/value";

const crudEvents = ["patched", "updated", "created", "removed" ];

const onEvents = service => (events, cb) => {
  if (!isObject(service)) {
    throw new BadArgument("Expected service object to be passed.");
  }

  if (!Array.isArray(events) || !events.every(isString)) {
    throw new BadArgument("Expected an array of event name strings.");
  }

  if (!isFunction(cb)) {
    throw new BadArgument(
      "Expected a callback to be passed for any of the events"
    );
  }

  for (const event of events) {
    service.on(event, cb);
  }
};

const offEvents = service => events => {
  if (!isObject(service)) {
    throw new BadArgument("Expected service object to be passed.");
  }

  if (!Array.isArray(events)) {
    throw new BadArgument("Expected an array of feathers service events");
  }

  for (const event of events) {
    service.off(event);
  }
};

export { onEvents, offEvents, crudEvents };
