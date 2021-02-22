const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");
const {GenerateShape} = require("./HtmlShape.js");
const {CreateControl, CreateTextBlock} = require("./HtmlControl.js");
const {CreateBlazorise} = require("./blazorise.js");
const {IsUserControl, IsCustomeControl, GenerateStyle, GenerateAttributes} = require("./Common.js");
const {CreateUserControl} = require("./UserControl.js");

function createLayout(item) {
    if (item != null) {
        var itemTag = getLayoutTag(item);
        var style = "style=\"" + GenerateStyle(item) + "\"";
        var attrib = GenerateAttributes(item);
        console.log("creating layout: " + item.name);

        var children = item.children;
        var content = "";
        if(children.length > 1) {
            children.forEach(function (element, i) {
                
                if (element instanceof Rectangle || element instanceof Ellipse || element instanceof Polygon || element instanceof Line) {
                    content += "\n\t\t" + GenerateShape(element);
                }
                else if (element instanceof Text) {
                    content += "\n\t\t" + CreateTextBlock(element);
                }
                else if (element instanceof Path) {
                    if (element.name != "Footprint") {
                        content += getControlPathProperties(element, type);
                    }
                }
                else if (element instanceof SymbolInstance && IsCustomeControl(element.name)) {
                    content += "\n\t" + CreateBlazorise(element);
                }
                else if (element instanceof SymbolInstance && IsUserControl(element.name)) {
                    content += "\n\t\t" + CreateUserControl(element);
                }
                else if (element instanceof SymbolInstance) {
                    content += "\n\t\t" + CreateControl(element);
                }
                else if (element instanceof Group) {
                    content += "\t\t" + createLayout(element);
                }
                 
            });

        }
        else{
        }

        return "<" + itemTag + " " + attrib + " " + style + ">" + content + "\n\t</" + itemTag + ">";
    }
}

function getLayoutTag(item) {
    var name = item.name.toLowerCase().split(" ").join("");
    var conditions = ["stacpPanel", "grid", "relativepanel", "pagetitle"];
    if(conditions.some(el => name.includes(el))) return "div";
    else return "div";
}


module.exports = {
    CreateLayout: createLayout,
};
