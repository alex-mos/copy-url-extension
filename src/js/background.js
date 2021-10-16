const beautify = require("./utils/beautify")
let url = null

// page loading handler
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === "loading") {
    chrome.pageAction.show(tabId)
  }
})

// extension icon click handler
chrome.pageAction.onClicked.addListener(function (tab) {
  // send request to the content script
  chrome.tabs.sendMessage(
    tab.id,
    {
      method: "set_action",
      key: "click"
    },
    function (response) {
      // handling response from content script
      if (response) {
        url = beautify(response.url)
        document.execCommand("copy")
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: "img/success.png"
        })
      } else {
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: "img/error.png"
        })
      }
      setTimeout(chrome.pageAction.setIcon, 4000, {
        tabId: tab.id,
        path: "img/icon.png"
      })
    }
  )
})

document.addEventListener("copy", function (event) {
  event.clipboardData.setData("text/plain", url)
  event.preventDefault()
})
