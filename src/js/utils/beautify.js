const punycode = require("punycode")

module.exports = function beautify(urlString) {
  const url = new URL(urlString)
  const decodedHostname = punycode.toUnicode(url.hostname)
  const decodedPathname = decodeURIComponent(url.pathname).replace(/\s/g, "%20")
  return `${url.protocol}//${decodedHostname}${decodedPathname}`
}
