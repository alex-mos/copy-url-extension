const beautify = require("../src/js/utils/beautify")

test("https://ru.wikipedia.org/wiki/Московский_зоопарк", () => {
  expect(
    beautify(
      "https://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%B7%D0%BE%D0%BE%D0%BF%D0%B0%D1%80%D0%BA"
    )
  ).toBe("https://ru.wikipedia.org/wiki/Московский_зоопарк")
})
