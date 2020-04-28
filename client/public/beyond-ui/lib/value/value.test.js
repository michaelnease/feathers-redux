import * as value from "./value";

describe("`isUndefined` should:", () => {
  it("return true if input is not given.`", () => {
    expect(value.isUndefined()).toBe(true);
  });

  it("return true if input is value `undefined`.", () => {
    expect(value.isUndefined(void 0)).toBe(true);
  });

  it("return true if input is of type undefined.", () => {
    expect(value.isUndefined(value.UNDEFINED)).toBe(true);
  });

  it("return false if input is `null`.", () => {
    expect(value.isUndefined(null)).toBe(false);
  });
});

describe("`isString` should:", () => {
  it("return true if input arg is a string", () => {
    expect(value.isString("boo")).toBe(true);
  });

  it("return true if input arg is a string.", () => {
    expect(value.isString("")).toBe(true);
  });

  it("return false if input arg is not a string", () => {
    expect(value.isString({})).toBe(false);
  });
});

describe("`error` should:", () => {
  it("throw an error if no input is given", () => {
    expect(() => {
      value.error();
    }).toThrow();
  });

  it("return an object with details and type for given params.", () => {
    const e = value.error("INVALID_AUTH", "Invalid auth token.");
    expect(typeof e.details).toBe("string");
    expect(typeof e.type).toBe("string");
  });

  it("throw an error if both type and details are not given.", () => {
    expect(() => {
      value.error("AUTH_ERROR");
    }).toThrow();
  });

  it("should return the type value in string context", () => {
    const e = value.error("AUTH_ERROR", "Invalid auth token");
    expect(/AUTH_ERROR/.test(e)).toBe(true);
  });

  it("should return the type value in default context", () => {
    const e = value.error("AUTH_ERROR", "Invalid auth token");
    expect(e + 5).toBe("AUTH_ERROR5");
  });

  it("should return -1 in number context", () => {
    const e = value.error("AUTH_ERROR", "Invalid auth token");
    expect(e - 1).toBe(-2);
  });
});

describe("`isNumber` should:", () => {
  it("return true if input param is a number", () => {
    expect(value.isNumber(25)).toBe(true);
  });

  it("return false if input param is NaN", () => {
    expect(value.isNumber(NaN)).toBe(false);
  });

  it("return false if input param is not a number", () => {
    expect(value.isNumber("Hello")).toBe(false);
  });
});

describe("`isObject` should:", () => {
  it("return true if input param is an object", () => {
    expect(value.isObject({})).toBe(true);
  });

  it("return false if input param is not object", () => {
    expect(value.isObject("boo")).toBe(false);
  });

  it("return false if input param is not object", () => {
    expect(value.isObject(null)).toBe(false);
  });

  it("return false if input param is not object", () => {
    function Hello() {}
    expect(value.isObject(Hello)).toBe(false);
  });

  it("return false if input param is not object", () => {
    expect(value.isObject([])).toBe(false);
  });
});

describe("`isFunction` should:", () => {
  it("return true if input param is a function", () => {
    expect(value.isFunction(() => {})).toBe(true);
  });

  it("return false if input param not a function", () => {
    expect(value.isFunction("hello")).toBe(false);
  });
});

describe("`errorTypes` should:", () => {
  it("have badArg defined", () => {
    expect(value.ERRORS.BAD_ARGUMENT).toBeDefined();
  });
});

describe("`BadArg` should:", () => {
  it("construct a custom BadArg error type with a custom error name", () => {
    expect(new value.BadArgument().name).toBe(value.ERRORS.BAD_ARGUMENT);
  });

  it("construct a custom badarg error with an optional message if given", () => {
    expect(new value.BadArgument("boo").message).toBe("boo");
  });

  // it("serialize correctly when stringified", () => {
  //   const err = new value.BadArgument("boo");
  //   const serialized = JSON.stringify(err);
  //   expect(serialized).toMatchSnapshot();
  // });
});

it("isArray should return true if input is array", () => {
  expect(value.isArray([])).toBe(true);
});

it("isSet should return true if input is a Set", () => {
  expect(value.isSet(new Set())).toBe(true);
});

describe("intersection should return an intersection set", () => {
  it("should throw error if both args are not arrays", () => {
    expect(() => {
      value.intersect([1], "x");
    }).toThrow();
  });

  it("should throw error if both args are not sets", () => {
    expect(() => {
      value.intersect(new Set(), "x");
    }).toThrow();
  });

  it("should return intersect two arrays", () => {
    const intersectionSet = value.intersect([1, 2], [2, 3]);
    expect([...intersectionSet]).toEqual([2]);
  });

  it("should intersect two sets", () => {
    const s1 = new Set([1, 2]);
    const s2 = new Set([2, 4]);
    const output = value.intersect(s1, s2);
    expect([...output]).toEqual([2]);
  });
});
