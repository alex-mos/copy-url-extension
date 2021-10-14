"use strict"

const app = {}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === "set_action") {
    if (request.key === "click") {
      sendResponse({
        status: true,
        url: location.href
      })
    }
  }
})

document.addEventListener(
  "contextmenu",
  function (event) {
    let node = event.target
    while (node && node.nodeName.toLowerCase() !== "a") {
      if (
        node.nodeName.toLowerCase() === "img" &&
        node.parentNode.nodeName.toLowerCase() !== "a"
      ) {
        break
      }
      node = node.parentNode
    }
    app.target = node
  },
  true
)

chrome.extension.onRequest.addListener(function (request, sender, callback) {
  if (request === "copy") {
    callback(app.target.href ? app.target.href : app.target.src)
  }
})
