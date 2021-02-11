/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */


//const {Rectangle, Ellipse, Color} = require("scenegraph");
//const application = require("application");
//const fs = require("uxp").storage.localFileSystem;
let clipboard = require("clipboard");
// let output = "";
const { convertBoard } = require("./artboard");
const { Convert } = require("./selection");
const { ConvertHTML } = require("./HTML");



//main function
function convertSelection(selection) { 

    console.log("conversion initiated");

    if (selection) {
        //console.log("selection available");
        var item = selection.items[0];

        var result = Convert(item);
        clipboard.copyText(result);

    }
}

function convertArtboard(board) {
    console.log("conversion initiated");

    if (board) {
        console.log("board available");
        var item = board.items[0];

        var result = convertBoard(item);
        clipboard.copyText(result);

    }
}

function convertHtml(selection) { 

    console.log("HTML conversion initiated");

    initializePluginData();

    if (selection) {
        //console.log("selection available");
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
        ConvertSelection: convertSelection, 
        ConvertArtboard: convertArtboard,
        ConvertHTML: convertHtml
    }
};
