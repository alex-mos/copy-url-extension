const punycode = require("punycode")

module.exports = function beautify(url) {
  console.log("url")
  console.log(url)
  url = decodeURIComponent(url).replace(/\s/g, "%20")
  let a
  if (url.search("http://") != -1) {
    a = 7
  } else {
    a = 8
  }
  let domain = url.substring(a)
  domain = domain.split("/")
  console.log("domain[0]")
  console.log(domain[0])
  const result = punycode.toUnicode(domain[0])
  console.log("result")
  console.log(result)
  url = url.replace(domain[0], result)
  return url
}
