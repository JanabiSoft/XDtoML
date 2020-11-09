const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");
const {CreateShape} = require("./Shape.js")
const {CreateControl} = require("./controls.js")
const {CreateTextBlock} = require("./controls.js")

function createLayout(item) {
    if (item != null) {
        var type = getLayoutType(item);
        console.log("creating Layout: " + type);
        var result = "";
        var ele = "";
        var generalProps = " ";
        var  margin = "";
        if(item.parent instanceof Group) margin = getRelativeMargin(item);
        else margin = getMargin(item);
        var width = item.globalDrawBounds.width;
        var height = item.globalDrawBounds.height;

        // general properties
        console.log("generating Layout general properties");
        ele = "\t\t<" + type + " Name=\"" + item.name + "\"";
        generalProps += "Width=\"" + width + "\"";
        generalProps += " Height=\"" + height + "\"";
        generalProps += " Margin=\"" + margin + "\"";

        var result = "";
        var specificProps = "";

        result = ele + ">";
        var children = item.children;
        var content = "\n";
        if(children.length > 1) {
            children.forEach(function (element, i) {
                console.log("Layout Child Control" + i + " : " + element.constructor.name);
                
                if (element instanceof Rectangle) {
                    content += CreateShape("Rectangle", element);
                }
                else if (element instanceof Ellipse) {
                    //console.log(element);
                    content += CreateShape("Ellipse", element);
                }
                else if (element instanceof Polygon) {
                    content += CreateShape("Polygon", element);
                }
                else if (element instanceof Line) {
                    //console.log(element);
                    content += CreateShape("Line", element);
                }
                else if (element instanceof Text) {
                    content += CreateTextBlock(element);
                }
                else if (element instanceof Path) {
                    //console.log("Path:" + element.name);
                    if (element.name != "Footprint") {
                        //specificProps += " Background=\"#" + element.fill.value.toString(16) + "\"";
                        content += getControlPathProperties(element, type);
                        console.log(element.name + " : " + content);
                    }
                }
                else if (element instanceof SymbolInstance) {
                    //console.log(element);
                    content += CreateControl(element);
                }
                else if (element instanceof Group) {
                    console.log(element.name  + " is group");
                    content += createLayout(element);
                }
                 
                //console.log(props);
            });
            //console.log("iteraing throug hchildren finished:" + specificProps);

        }
        else{
            //console.log("item has no children");
        }
        
        result = ele + " " + generalProps + specificProps + " HorizontalAlignment=\"Left\" VerticalAlignment=\"Top\" >";
        result += content + "\n\t</" + type + ">"
  
    
        //console.log(result);
        //console.log(specificProps);

        return result;
    }
}

function getLayoutType(item) {
    var name = item.name;
    if(name.includes("StackPanel")) return "StackPanel";
    else if(name.includes("RelativePanel") ) return "RelativePanel";
    else return "Grid";

}

function getMargin(item) {
    var x = item.boundsInParent.x;
    var y = item.boundsInParent.y;
    console.log("margins of Layout:" + item.name + " is " + x + "," + y);

    return x.toString() +","+ y.toString() + ",0,0";
}

function getRelativeMargin(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;
    
    console.log("margins of Layout:" + item.name + " is " + x + "," + y);

    return x.toString() +","+ y.toString() + ",0,0";
}









module.exports = {
    CreateLayout: createLayout,
};
