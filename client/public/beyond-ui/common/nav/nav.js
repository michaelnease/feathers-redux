import { isString, BadArgument } from "../../lib/value/value";

const isActive = ({ path, activePath, activeClass = "nav--active" }) => {
  if (!(isString(path) && isString(activePath))) {
    throw new BadArgument("Both `path` and `activePath` have to be strings");
  }

  return activePath.includes(path) ? activeClass : "";
};

export { isActive };
