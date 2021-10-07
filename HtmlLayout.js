const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance, RepeatGrid} = require("scenegraph");
const {GenerateShape} = require("./HtmlShape.js");
const {CreateControl, CreateTextBlock, GetControlPathProperties} = require("./HtmlControl.js");
const {CreateBlazorise} = require("./blazorise.js");
const {IsUserControl, IsCustomeControl, GenerateStyle, GenerateAttributes, GetPosition, GetColors} = require("./Common.js");
const {CreateUserControl} = require("./UserControl.js");


function createLayout(item, tab) {
    if (item != null) {
        var itemTag = getLayoutTag(item);
        var style = "style=\"" + GenerateStyle(item) + "\"";
        var attrib = GenerateAttributes(item);
        console.log("creating layout: " + item.name);
        tab += "\t";

        var children = item.children;
        var content = "";
        if(children.length > 1) {
            children.forEach(function (element, i) {
                if(element instanceof Rectangle && element.name == "frame"){
                    content += "\n" + tab + createBox(element, tab);
                }
                else if (element instanceof Rectangle || element instanceof Ellipse || element instanceof Polygon || element instanceof Line) {
                    content += "\n\t" + tab + GenerateShape(element, tab);
                }
                else if (element instanceof Text) {
                    content += "\n" + tab + CreateTextBlock(element, tab);
                }
                else if (element instanceof Path) {
                    content += "\n" + tab + GenerateShape(element, tab);
                    // if (element.name != "Footprint") {
                    //     content += GetControlPathProperties(element, itemTag);
                    // }
                    // else content += GenerateShape(element, tab);
                }
                else if (element instanceof SymbolInstance && IsCustomeControl(element.name)) {
                    content += "\n\t" + tab + CreateBlazorise(element);
                }
                else if (element instanceof SymbolInstance && IsUserControl(element.name)) {
                    content += "\n\t\t" + tab + CreateUserControl(element, tab);
                }
                else if (element instanceof SymbolInstance) {
                    content += "\n\t\t" + tab + CreateControl(element, tab);
                }
                else if (element instanceof Group) {
                    content += "\n" + tab + createLayout(element, tab);
                }
                else if (element instanceof RepeatGrid) {
                    content += "\t\t" + tab + createGrid(element, tab);
                }
            });
        }
        else{
        }

        return "<" + itemTag + " " + attrib + " " + style + ">\t" + tab + content + "\n" + tab + "</" + itemTag + ">";
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
