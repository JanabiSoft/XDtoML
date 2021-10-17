let clipboard = require("clipboard");
const { ConvertHTML } = require("./HTML");

//main function
function convertHtml(selection) { 

    console.log("HTML conversion initiated: " + selection.items[0].constructor.name);

    initializePluginData();

    if (selection) {
        var item = selection.items[0];
        var result = ConvertHTML(item);
        clipboard.copyText(result);
    }
}

function initializePluginData() {
    var cfk = window.localStorage.getItem("component_framework");
    if (cfk == null) window.localStorage.setItem("component_framework", "blazorise");
}

module.exports = {
    commands: {
        ConvertHTML: convertHtml
    }
};
