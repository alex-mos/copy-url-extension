// background click request handler
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("content click")
  console.log("request")
  console.log(request)
  console.log("sender")
  console.log(sender)
  if (request.method === "set_action") {
    if (request.key === "click") {
      sendResponse({
        status: true,
        url: location.href
      })
    }
  }
})
