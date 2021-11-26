const {GenerateAttributes, GenerateStyle, GetColors, GetPosition} = require("./Common.js");
const {CreateCustomeControl} = require("./HtmlControl.js");
const {GetTextStyle} = require("./styles.js");

function createTextBlock(item) {
    console.log("creating Text: " + item.name);
    var txt = item.text;
    var textColor = "color:" + GetColors(item);
    var style = "style=\"" + GenerateStyle(item) + textColor + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<span " + attrib + " " + style +">" + txt + "</span>";
}

function createTitle(item, tab) {
    //var internalTab = tab + "\t";
    console.log("creating Title: " + item.name);
    var txt = item.text;
    //var textColor = "color:" + GetColors(item);
    var style = "style=\"" + getTextMeasure(item) + GetTextStyle(item) + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<span " + attrib + " " + style +">" + txt + "</span>";
}

function createParagraph(item, tab) {
    //var internalTab = tab + "\t";

    console.log("creating Paragraph: " + item.name);
    var txt = item.text;
    var style = "style=\"" + getTextMeasure(item) + GetTextStyle(item) + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<p " + attrib + " " + style +">" + txt + "</p>";
}

function createTextElement(item, tab) {
    if (item.name.endsWith("icon") ) return createFontIcon(item, tab);
    else if (item.name.endsWith("toggle") ) return CreateCustomeControl(item, tab);
    //else if (item.name.endsWith("toggle") ) return "";
    else if (item.name.endsWith("-title") ) return createTitle(item, tab);
    else if (item.name.endsWith("-text") ) return createParagraph(item, tab);
    else return createParagraph(item, tab);
}

function createFontIcon(item, tab) {
    var internalTab = tab + "\t";
    console.log("creating font icon: " + item.name);
    var style = "style=\"" + getTextMeasure(item) + " " + GetTextStyle(item) + "\"" ;
    var attrib = GenerateAttributes(item);
    return internalTab + "<i " + attrib + " " + style + " class=\"bi bi-emoji-smile\"></i>";
}

function getTextMeasure(item) {
    var position = GetPosition(item);
    return position;
}

module.exports = {
    CreateText: createTextBlock,
    CreateFontIcon: createFontIcon,
    GetTextMeasure: getTextMeasure,
    CreateTitle: createTitle,
    CreateParagraph: createParagraph,
    CreateTextElement: createTextElement
};
