const {GenerateAttributes, GenerateStyle, GetColors} = require("./Common.js");
const {GetTextColor, GetTextStyle} = require("./styles.js");



function createTextBlock(item) {
    console.log("creating Text: " + item.name);
    var txt = item.text;
    var textColor = "color:" + GetColors(item);
    var style = "style=\"" + GenerateStyle(item) + textColor + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<span " + attrib + " " + style +">" + txt + "</span>";
}

function createFontIcon(item, tab) {
    console.log("creating font icon: " + item.name);
    var name = item.name.replace("-icon", "");
    var txt = "bi-" + name;
    var textColor = GetTextColor(item);
    var style = "style=\"" + GenerateStyle(item) + textColor + "\"" ;
    var attrib = GenerateAttributes(item);
    return "<i " + attrib + " " + style + " class=\"" + txt +"\"></i>";
}

module.exports = {
    CreateText: createTextBlock,
    CreateFontIcon: createFontIcon
};
