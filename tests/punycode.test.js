const punycode = require("punycode")

test("вещай.рф", () => {
  expect(punycode.toUnicode("xn--80adjr2f.xn--p1ai")).toBe("вещай.рф")
})

test("яндекс.рф", () => {
  expect(punycode.toUnicode("xn--d1acpjx3f.xn--p1ai")).toBe("яндекс.рф")
})
