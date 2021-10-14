const beautify = require("../src/js/utils/beautify")

test("https://ru.wikipedia.org/wiki/Московский_зоопарк", () => {
  expect(
    beautify(
      "https://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%B7%D0%BE%D0%BE%D0%BF%D0%B0%D1%80%D0%BA"
    )
  ).toBe("https://ru.wikipedia.org/wiki/Московский_зоопарк")
})

test("https://ru.wikipedia.org/wiki/Московский зоопарк", () => {
  expect(
    beautify(
      "https://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B7%D0%BE%D0%BE%D0%BF%D0%B0%D1%80%D0%BA"
    )
  ).toBe("https://ru.wikipedia.org/wiki/Московский%20зоопарк")
})

test("http://вещай.рф/клуб любителей английского", () => {
  expect(
    beautify(
      "http://xn--80adjr2f.xn--p1ai/%D0%BA%D0%BB%D1%83%D0%B1%20%D0%BB%D1%8E%D0%B1%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B3%D0%BE"
    )
  ).toBe("http://вещай.рф/клуб%20любителей%20английского")
})
