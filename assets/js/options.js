function setChildTextNode(elementId, text) {
    document.getElementById(elementId).innerText = text;
}

document.addEventListener('DOMContentLoaded', function() {
    setChildTextNode('labelHideMenu', chrome.i18n.getMessage("hide_menu"));
});

chrome.runtime.sendMessage({
    action: 'getOptions'
}, function(response) {
    var options = {};
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxes, function(checkbox) {
        var id = checkbox.id;
        checkbox.checked = options[id] = !!response.settings[id];
        checkbox.addEventListener('change', function() {
            options[id] = !!checkbox.checked;
            chrome.runtime.sendMessage({
                action: 'setOptions',
                payload: options
            });
        });
    });
});