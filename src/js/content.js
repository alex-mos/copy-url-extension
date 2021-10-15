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

chrome.extension.onRequest.addListener(function (request, sender, callback) {
  if (request === "copy") {
    callback(app.target.href ? app.target.href : app.target.src)
  }
})
