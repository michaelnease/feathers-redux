import * as http from "./http";
import mockAxios from "jest-mock-axios";

describe("newClient should:", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("be defined", () => {
    expect(http.newClient).toBeDefined();
  });

  it("call axios.create if correct params given", () => {
    http.newClient("blah", "foo");
    expect(mockAxios.create).toBeCalledWith({
      baseURL: "blah",
      timeout: 2e3,
      headers: {
        Authorization: "Bearer foo",
      },
    });
  });
});
