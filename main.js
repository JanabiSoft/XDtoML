let clipboard = require("clipboard");
const { ConvertHTML } = require("./HTML");

// const psCore = require('photoshop').core;
// psCore.showAlert({ message: 'Warp Factor 9!'});

//const fs = require("uxp").storage.localFileSystem;


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
    window.sessionStorage.setItem("css", "");
    var cfk = window.localStorage.getItem("component_framework");
    if (cfk == null) window.localStorage.setItem("component_framework", "blazorise");
}

module.exports = {
    commands: {
        ConvertHTML: convertHtml
    }
};
