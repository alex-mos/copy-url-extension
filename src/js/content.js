// background click request handler
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
