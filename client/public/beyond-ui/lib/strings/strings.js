import { isString, BadArgument } from "../value/value";

const titleCase = str => {
  if (!isString(str)) {
    throw new BadArgument(
      `Expected string as argument, but received '${typeof str}' instead.`
    );
  }

  const s = str.trim();
  if (!s) {
    return s;
  }

  return s
    .toLowerCase()
    .split(" ")
    .map(v => v[0].toUpperCase() + v.slice(1))
    .join(" ");
};

export { titleCase };
