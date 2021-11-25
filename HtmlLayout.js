const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance, RepeatGrid} = require("scenegraph");
const Image = require("scenegraph").ImageFill;
const {GenerateShape, CreateShape} = require("./HtmlShape.js");
const {CreateControl, CreateTextBlock, GetControlPathProperties, CreateIconLink, CreateLink} = require("./HtmlControl.js");
const {CreateBlazorise} = require("./blazorise.js");
const {IsUserControl, IsCustomeControl, GenerateStyle, GenerateAttributes, GetPosition, GetColors, GetElementType} = require("./Common.js");
const {CreateUserControl} = require("./UserControl.js");
const {GenerateImage, GenerateSVG} = require("./Image.js");
const { CreateFontIcon, CreateTitle, CreateParagraph, CreateTextElement } = require("./Text.js");
const {GetStyle, GetMeasurement, GetBaseStyle} = require("./styles.js");

function createLayout(item, tab) {
    if (item != null) {
        var itemTag = getLayoutTag(item);
        var style = "style=\"" + GetMeasurement(item);
        var attrib = GenerateAttributes(item);
        console.log("creating layout: " + item.name + " of type: " + item.constructor.name);
        var internalTab = tab + "\t";

        var children = item.children;
        var content = "";
        if(children.length > 0) {
            children.forEach(function (element, i) {
                var elementType = GetElementType(element);

                if (element.name.endsWith("-icon-link")) {
                    content += "\n" + internalTab + CreateIconLink(element, internalTab);
                }
                else if (element.name.endsWith("-link")) {
                    content += "\n" + internalTab + CreateLink(element, internalTab);
                }
                else if(element instanceof Rectangle && (element.name.endsWith("-base") | element.name.endsWith("frame")) ) 
                    style += GetBaseStyle(element);
                else if(elementType == "control") content += "\n" + internalTab + CreateControl(element, internalTab);
                // else if(element instanceof Rectangle && element.name == "frame"){
                //     content += "\n" + internalTab + createBox(element, internalTab);
                // }
                else if (element instanceof Rectangle && element.fill instanceof Image) content += "\n" + internalTab + GenerateImage(element, internalTab);
                else if (element instanceof Rectangle || element instanceof Ellipse || element instanceof Polygon || element instanceof Line) {
                    content += "\n" + internalTab + CreateShape(element, internalTab);
                }
                else if (element instanceof Text) {
                    content += "\n" + internalTab + CreateTextElement(element, internalTab);


                    // if (element.name.endsWith("-icon") ) content += "\n" + internalTab + CreateFontIcon(element, internalTab);
                    // else if (element.name.endsWith("-title") ) content += "\n" + internalTab + CreateTitle(element, internalTab);
                    // else if (element.name.endsWith("-text") ) content += "\n" + internalTab + CreateParagraph(element, internalTab);
                    // else content += "\n" + internalTab + CreateTextBlock(element, internalTab);
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
                    content += "\n" + internalTab + CreateControl(element, internalTab);
                }
                else if (element instanceof Group) {
                    if(element.name.endsWith("-symbol") | element.name.endsWith("-image")) content += "\n" + internalTab + GenerateSVG(element, internalTab);
                    else content += "\n\n" + internalTab + createLayout(element, internalTab);
                }
                else if (element instanceof RepeatGrid) {
                    content += "\n" + internalTab + createGrid(element, internalTab);
                }
            });
        }

        style += "\"";

        return "<" + itemTag + " " + attrib + " " + style + ">" + content + "\n" + tab + "</" + itemTag + ">";
    }
}

function createGrid(item, tab) {
    if (item != null) {
        console.log("creating grid: " + item.name);
        var itemTag = "div";
        var container = "<" + itemTag + " class=\"container\""; 
        var style = " style=\"" + GetMeasurement(item) + "\"";
        var attrib = GenerateAttributes(item);
        console.log("creating grid: " + item.name);
        var rows = "\n";
        var internalTab = tab + "\t";

        var colIndex = 0;
        for (let index = 0; index < item.numRows; index ++) {
            var rowTab = internalTab + "\t";
            var row = internalTab + "<div class=\"row\">";
            if (item.numColumns == 1) {
                row += "\n" + rowTab + createLayout(item.children.at(index), rowTab) + "\n" + internalTab + "</div> <!--row-->\n";
            }
            else{
                var columns = "";
                var colTab = internalTab + "\t";
                for (let index2 = 0; index2 < item.numColumns; index2++) {
                    var column = colTab + "<div class=\"col\"><!--"+ index2 + colIndex + " -->  \n";
                    column += colTab + "\t" + createLayout(item.children.at(index2 + colIndex), colTab+ "\t");
                    column += "\n" + colTab + "</div><!--col-->\n";
                    columns += column;
                }
                row += "\n" + columns  + internalTab + "</div> <!--row-->\n";
            }
            rows += row;
            colIndex += item.numColumns;
        }

        var result = container + style + attrib + ">" + rows + tab + "</div> <!--container-->";

        // var children = item.children;
        // var content = "";
        // if(children.length > 1) {
        //     children.forEach(function (element, i) {
        //         content += "\t\t<div class=\"grid-item\">\n" + createLayout(element) + "\n</div>";
                
        //     });
        // }
        // else{
        // }

        // result += " " + attrib + " " + style + ">" + content;
        // result += "\n</div>";

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
    CreateGrid : createGrid
};
