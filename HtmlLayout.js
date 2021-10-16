const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance, RepeatGrid} = require("scenegraph");
const {GenerateShape} = require("./HtmlShape.js");
const {CreateControl, CreateTextBlock, GetControlPathProperties} = require("./HtmlControl.js");
const {CreateBlazorise} = require("./blazorise.js");
const {IsUserControl, IsCustomeControl, GenerateStyle, GenerateAttributes, GetPosition, GetColors} = require("./Common.js");
const {CreateUserControl} = require("./UserControl.js");
const { GenerateSVG } = require("./Image.js");
const { CreateFontIcon } = require("./Text.js");


function createLayout(item, tab) {
    if (item != null) {
        var itemTag = getLayoutTag(item);
        var style = "style=\"" + GenerateStyle(item) + "\"";
        var attrib = GenerateAttributes(item);
        console.log("creating layout: " + item.name);
        var internalTab = "\t" + tab;

        var children = item.children;
        var content = "";
        if(children.length > 1) {
            children.forEach(function (element, i) {
                if(element instanceof Rectangle && element.name == "frame"){
                    content += "\n" + internalTab + createBox(element, internalTab);
                }
                else if (element instanceof Rectangle || element instanceof Ellipse || element instanceof Polygon || element instanceof Line) {
                    content += "\n\t" + internalTab + GenerateShape(element, internalTab);
                }
                else if (element instanceof Text) {
                    if (element.name.endsWith("-icon") ) content += "\n" + internalTab + CreateFontIcon(element, internalTab);
                    else content += "\n" + internalTab + CreateTextBlock(element, internalTab);
                }
                else if (element instanceof Path) {
                    content += "\n" + internalTab + GenerateShape(element, internalTab);
                    // if (element.name != "Footprint") {
                    //     content += GetControlPathProperties(element, itemTag);
                    // }
                    // else content += GenerateShape(element, internalTab);
                }
                else if (element instanceof SymbolInstance && IsCustomeControl(element.name)) {
                    content += "\n\t" + internalTab + CreateBlazorise(element);
                }
                else if (element instanceof SymbolInstance && IsUserControl(element.name)) {
                    content += "\n\t\t" + internalTab + CreateUserControl(element, internalTab);
                }
                else if (element instanceof SymbolInstance) {
                    content += "\n\t\t" + internalTab + CreateControl(element, internalTab);
                }
                else if (element instanceof Group) {
                    if(element.name.endsWith("-symbol") | element.name.endsWith("-image")) content += "\n" + internalTab + GenerateSVG(element, internalTab);
                    else content += "\n" + internalTab + createLayout(element, internalTab);
                }
                else if (element instanceof RepeatGrid) {
                    content += "\n\t\t" + internalTab + createGrid(element, internalTab);
                }
            });
        }
        else{
        }

        return "<" + itemTag + " " + attrib + " " + style + ">" + content + "\n" + tab + "</" + itemTag + ">";
    }
}

function createGrid(item) {
    if (item != null) {
        console.log("creating grid: " + item.name);
        var itemTag = "div";
        var result = "<" + itemTag + " class=\"grid-container\""; 
        var style = "style=\"" + GenerateGridStyle(item) + "\"";
        var attrib = GenerateAttributes(item);
        console.log("creating grid: " + item.name);

        var children = item.children;
        var content = "";
        if(children.length > 1) {
            children.forEach(function (element, i) {
                content += "\t\t<div class=\"grid-item\">\n" + createLayout(element) + "\n</div>";
                
            });
        }
        else{
        }

        result += " " + attrib + " " + style + ">" + content;
        result += "\n</div>";

        return result;
    }
}

function createBox(item, tab) {
    console.log("creating frame: " + item.name);
    var itemTag = "div";
    var style = "style=\"" + GenerateStyle(item) + GetColors(item) + "\"";
    var attrib = GenerateAttributes(item);

    return "<" + itemTag + " " + attrib + " " + style + ">" + "</" + itemTag + ">";
}

function getLayoutTag(item) {
    var name = item.name.toLowerCase().split(" ").join("");
    var conditions = ["stacpPanel", "grid", "relativepanel", "pagetitle"];
    if(conditions.some(el => name.includes(el))) return "div";
    else return "div";
}

function GenerateGridStyle(item) {
    var genProps = "";
    var width = item.width;
    var height = item.height;

    genProps += "width:" + width + "px;";
    genProps += "height:" + height + "px;";
    var position = GetPosition(item);
    return genProps + position;
}


module.exports = {
    CreateLayout: createLayout,
};
