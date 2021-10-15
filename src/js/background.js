const beautify = require("./utils/beautify")
let url = null

// page loading handler
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  console.log("loading")
  console.log("changeInfo")
  console.log(changeInfo)
  console.log("tabId")
  console.log(tabId)
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
      console.log("background onClicked")
      console.log("response")
      console.log(response)
      if (response) {
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
      } else {
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: "img/error.png"
        })
        setTimeout(chrome.pageAction.setIcon, 4000, {
          tabId: tab.id,
          path: "img/icon.png"
        })
      }
    }
  )
})

document.addEventListener("copy", function (event) {
  console.log("background copy")
  console.log("event")
  console.log(event)
  event.clipboardData.setData("text/plain", url)
  event.preventDefault()
})
