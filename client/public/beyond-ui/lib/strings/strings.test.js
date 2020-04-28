import { titleCase } from "./strings";

it("should title case the given string", () => {
  expect(titleCase("hey how are you")).toBe("Hey How Are You");
});

it("given an empty string, should return empty string", () => {
  expect(titleCase("")).toBe("");
});

it("given a string with one space, should return empty string", () => {
  expect(titleCase(" ")).toBe("");
});

it("should throw an error if the input is not a string", () => {
  expect(() => {
    titleCase(55);
  }).toThrow();
});
