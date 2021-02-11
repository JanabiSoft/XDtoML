const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");
const {CreateShape} = require("./HtmlShape.js")
const {CreateControl} = require("./HtmlControl.js")
const {CreateTextBlock} = require("./HtmlControl.js")

function createLayout(item) {
    if (item != null) {
        var itemTag = getLayoutTag(item);
        var style = getStyles(item);
        var attrib = getAttributes(item);
        console.log("creating layout: " + item.name);

        var children = item.children;
        var content = "\n";
        if(children.length > 1) {
            children.forEach(function (element, i) {
                
                if (element instanceof Rectangle) {
                    content += CreateShape("rect", element);
                }
                else if (element instanceof Ellipse) {
                    content += CreateShape("ellipse", element);
                }
                else if (element instanceof Polygon) {
                    content += CreateShape("polygon", element);
                }
                else if (element instanceof Line) {
                    console.log("generating line");
                    content += "\t\t\t" + CreateShape("line", element);
                }
                else if (element instanceof Text) {
                    console.log("creating content of layout: " + element.name);
                    content += "\t\t\t" + CreateTextBlock(element);
                }
                else if (element instanceof Path) {
                    if (element.name != "Footprint") {
                        //specificProps += " Background=\"#" + element.fill.value.toString(16) + "\"";
                        content += getControlPathProperties(element, type);
                    }
                }
                else if (element instanceof SymbolInstance) {
                    content += CreateControl(element);
                }
                else if (element instanceof Group) {
                    content += createLayout(element);
                }
                 
            });

        }
        else{
        }

        return "<" + itemTag + " " + attrib + " " + style + ">\n" + content + "\n</" + itemTag + ">";

        // ele = "<" + ItemTag + " id=\"" + item.name + "\"";
        // result = ele + ">";


        // result = ele + " " + generalProps + specificProps + " HorizontalAlignment=\"Left\" VerticalAlignment=\"Top\" >";
        // result += content + "\n\t\t</" + ItemTag + ">"
  
    

        //return result;
    }
}

function getLayoutTag(item) {
    //var name = item.name;
    // if(name.includes("StackPanel")) return "div";
    // else if(name.includes("RelativePanel") ) return "div";
    // else if(name.includes("Grid") ) return "div";

    // else return "Grid";

    var name = item.name.toLowerCase().split(" ").join("");
    var conditions = ["stacpPanel", "grid", "relativepanel", "pagetitle"];
    if(conditions.some(el => name.includes(el))) return "div";
    else return "div";
}

function getMargin(item) {
    var x = item.localBounds.x;
    var y = item.localBounds.y;

    return " margin-left:" + x.toString() + ";" + " margin-top: " + y.toString() + ";";
}

function getRelativeMargin(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;
    

    return " margin-left:" + x.toString() + " margin-top: " + y.toString() + ";";
}

function getAttributes(item) {
    return "id=\"" + item.name + "\"";
}

function getStyles(item) {
    var style = "style=\"";
    var generalProps = " ";
    var  margin = "";
    if(item.parent instanceof Group) margin = getRelativeMargin(item);
    else margin = getMargin(item);
    style += " width:" + item.globalDrawBounds.width + "px;";
    style += " height:" + item.globalDrawBounds.height + "px;";
    style += margin + "\"";


    return style;
}







module.exports = {
    CreateLayout: createLayout,
};
