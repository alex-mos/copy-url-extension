chrome.runtime.sendMessage(
  {
    action: "getOptions"
  },
  function (response) {
    const options = {}
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    Array.prototype.forEach.call(checkboxes, function (checkbox) {
      const id = checkbox.id
      checkbox.checked = options[id] = Boolean(response.settings[id])
      checkbox.addEventListener("change", function () {
        options[id] = Boolean(checkbox.checked)
        chrome.runtime.sendMessage({
          action: "setOptions",
          payload: options
        })
      })
    })
  }
)

document.addEventListener("DOMContentLoaded", function () {
  setChildTextNode("labelHideMenu", chrome.i18n.getMessage("hide_menu"))
})

function setChildTextNode(elementId, text) {
  document.getElementById(elementId).innerText = text
}
