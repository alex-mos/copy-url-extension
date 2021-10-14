const punycode = require("punycode")

test("вещай.рф", () => {
  expect(punycode.toUnicode("xn--80adjr2f.xn--p1ai")).toBe("вещай.рф")
})
