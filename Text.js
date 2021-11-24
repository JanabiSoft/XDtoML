const {GenerateAttributes, GenerateStyle, GetColors, GetPosition} = require("./Common.js");
const {GetTextColor, GetTextStyle, GetStyle} = require("./styles.js");

function createTextBlock(item) {
    console.log("creating Text: " + item.name);
    var txt = item.text;
    var textColor = "color:" + GetColors(item);
    var style = "style=\"" + GenerateStyle(item) + textColor + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<span " + attrib + " " + style +">" + txt + "</span>";
}

function createTitle(item) {
    console.log("creating Title: " + item.name);
    var txt = item.text;
    //var textColor = "color:" + GetColors(item);
    var style = "style=\"" + getTextMeasure(item) + GetTextStyle(item) + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<span " + attrib + " " + style +">" + txt + "</span>";
}

function createParagraph(item) {
    console.log("creating Paragraph: " + item.name);
    var txt = item.text;
    //var textColor = "color:" + GetColors(item);
    var style = "style=\"" + getTextMeasure(item) + GetTextStyle(item) + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<p " + attrib + " " + style +">" + txt + "</p>";
}

function createTextElement(item, tab) {
    var content = "";
    if (item.name.endsWith("icon") ) content += "\n" + tab + createFontIcon(item, tab);
    else if (item.name.endsWith("-title") ) content += "\n" + tab + createTitle(item, tab);
    else if (item.name.endsWith("-text") ) content += "\n" + tab + createParagraph(item, tab);
    else content += "\n" + tab + createParagraph(item, tab);
    return content;
}

function createFontIcon(item, tab) {
    console.log("creating font icon: " + item.name);
    //var name = item.name.replace("-icon", "");
    //var txt = "bi-" + name;
    //var textColor = GetTextColor(item);
    var style = "style=\"" + getTextMeasure(item) + " " + GetTextStyle(item) + "\"" ;
    var attrib = GenerateAttributes(item);
    //return "<i " + attrib + " " + style + " class=\"" + txt +"\"></i>";
    return "<i " + attrib + " " + style + " class=\"bi bi-emoji-smile\"></i>";
}

function getTextMeasure(item) {
    var genProps = "";
    var position = GetPosition(item);
    return genProps + position;
}

module.exports = {
    CreateText: createTextBlock,
    CreateFontIcon: createFontIcon,
    GetTextMeasure: getTextMeasure,
    CreateTitle: createTitle,
    CreateParagraph : createParagraph,
    CreateTextElement : createTextElement
};
