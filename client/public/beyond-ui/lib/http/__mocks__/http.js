const mock = {
  newClient: jest.fn().mockImplementation((a, b) => {
    return {
      post: jest.fn(),
      get: jest.fn(),
    };
  }),
};

module.exports = mock;
