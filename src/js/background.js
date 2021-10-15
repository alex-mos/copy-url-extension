const beautify = require("./utils/beautify")
let url = null

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === "loading") {
    chrome.pageAction.show(tabId)
  }
})

document.addEventListener("copy", function (event) {
  event.clipboardData.setData("text/plain", url)
  event.preventDefault()
})

chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(
    tab.id,
    {
      method: "set_action",
      key: "click"
    },
    function (response) {
      if (typeof response === "undefined") {
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: "img/error.png"
        })
        setTimeout(chrome.pageAction.setIcon, 4000, {
          tabId: tab.id,
          path: "img/icon.png"
        })
      } else {
        url = beautify(response.url)
        document.execCommand("copy")
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: "img/success.png"
        })
        setTimeout(chrome.pageAction.setIcon, 4000, {
          tabId: tab.id,
          path: "img/icon.png"
        })
      }
    }
  )
})
