const UNDEFINED = (void 0);

/*
 * `isUndefined` checks if a value is `undefined`. It checks inputs strictly
 * and returns `false` for any other value.
 */
const isUndefined = v => v === UNDEFINED;

/*
 * `isString` checks if a value is string.
 */
const isString = v => typeof v === "string";

const isBoolean = v => typeof v === "boolean";

/*
 * `isObject` checks if a value is a plain object
 */
const isObject = v => Object.prototype.toString.call(v) === "[object Object]";

/*
* `isSet` checks if a value is a Set.
*/
const isSet = v => Object.getPrototypeOf(v) === Set.prototype;

/*
 * `isFunction` checks if a value is a function
 */
const isFunction = v => typeof v === "function";

/*
 * `isNumber` checks if a value is a number. Useful for when
 * you want to check if something is a number, and you don't
 * care about NaN. If you want to check for NaN need to use
 * the standard Number.isNaN.
 */
const isNumber = v => typeof v === "number" && !Number.isNaN(v);

/*
* `isArray` checks if a value is Array.
*/
const isArray = v => Array.isArray(v);

/*
* `intersect` checks if two sets intersect and returns
* the intersect set. If the inputs are arrays, they will
* be turned into sets. The function only accepts either
* both arrays, or both sets.
*/
const intersect = (a, b) => {
  if (![a, b].every(isArray)) {
    if (![a, b].every(isSet)) {
      throw new Error("Both arguments should be either both Sets or Arrays");
    }
  }

  let set1;
  let set2;

  if ([a, b].some(isArray)) {
    set1 = new Set(a);
    set2 = new Set(b);
  } else {
    set1 = a;
    set2 = b;
  }

  return new Set([...set1].filter(x => set2.has(x)));
};

/*
 * Common error types, useful for keeping the error values consistent.
 */
const ERRORS = {
  BAD_ARGUMENT: "BAD_ARGUMENT"
};

/* a noop function, useful for setting default values */
const noop = () => UNDEFINED;

/*
 * Error returns an object with a details field, useful for
 * indicating that there was an error. The `type` and the `message` should
 * both be provided as strings.
 * For more detailed usage cases, please take a look at the test cases.
 * Prefer using the constructor versions instead, but this is useful
 * if you want to return a value and have more control over error behavior.
 */
const error = (type, details) => {
  const isValidParam = [type, details].every(isString);
  if (!isValidParam) {
    throw new Error("Type and details should be both strings.");
  }

  /* Define to primitive and coercion behaviors */
  return {
    details,
    type,
    [Symbol.toPrimitive](hint) {
      if (hint === "string") {
        return type;
      }

      if (hint === "number") {
        return -1;
      }

      return type;
    }
  };
};

/* Custom error types, extending built-in Error */
class BadArgument extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.BAD_ARGUMENT;
    this.message = message;
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack
      }
    };
  }
}

/*
 * Makes a plain object immutable. Useful for preventing
 * others from changing properties and values by accident.
 */
const deepFreeze = object => {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];

    object[name] =
      value && typeof value === "object" ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
};

module.exports = {
  UNDEFINED,
  isUndefined,
  isString,
  isBoolean,
  isObject,
  isFunction,
  intersect,
  isArray,
  isSet,
  isNumber,
  error,
  ERRORS,
  BadArgument,
  deepFreeze,
  noop
};
