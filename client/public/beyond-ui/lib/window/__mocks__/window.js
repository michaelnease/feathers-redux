function Blob(data, options) {
  return data;
}

function mxCodec(input) {}
mxCodec.prototype.decodeCell = jest.fn();
mxCodec.prototype.encode = jest.fn();

module.exports = {
  location: {
    reload: jest.fn(),
  },
  localStorage: {
    get: jest.fn().mockImplementation(key => "hello"),
  },
  Dropbox: {
    choose: jest.fn(),
  },
  Blob: Blob,
  addEventListener: jest.fn().mockImplementation((e, fn) => e),
  navigator: {},
  JSON: {
    stringify: jest.fn().mockImplementation((a, b, c, d) => "hello"),
    parse: jest.fn().mockImplementation(() => {
      boo: "boo";
    }),
  },
  URL: {
    createObjectURL: jest.fn().mockImplementation(arg => arg),
  },
  mxUtils: {
    parseXml: jest.fn().mockImplementation(arg => {
      return {
        firstChild: {
          children: [
            {
              children: [ {}, {} ],
            },
          ],
        },
      };
    }),
    createXmlDocument: jest.fn(),
    getPrettyXml: jest.fn(),
    getXml: jest.fn(),
  },
  mxCodec: mxCodec,
};
