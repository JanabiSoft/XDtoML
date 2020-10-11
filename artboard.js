const {Rectangle, Ellipse, Text, Polygon, Line, Color, SymbolInstance} = require("scenegraph");
const {CreateControl} = require("./controls.js")

function convertBoard(item) {
    //resetOutput();
    var children = item.children;
    console.log(item.name + "- selected");
    console.log("output is :" + output);

    var output = "<Page>\n\t<Grid>\n";

    var tag = "";

    if(children.length > 1) {

        console.log("item has many children");
        children.forEach(element => {
            console.log(element.name + "....");

            if (element instanceof Rectangle) {
                tag = createtShape("Rectangle", element);
            }
            else if (element instanceof Ellipse) {
                //console.log(element);
                tag = createtShape("Ellipse", element);
            }
            else if (element instanceof Polygon) {
                tag = createtShape("Polygon", element);
            }
            else if (element instanceof Line) {
                tag = createtShape("Line", element);
            }
            else if (element instanceof Text) {
                tag = createTextBlock(element);
            }
            else if (element instanceof SymbolInstance) {
                //console.log(element);
                tag = CreateControl(element);
            }
            else{
                //console.log(element);
            }
          
            output += tag + "\n";

        });
        //console.log(output);
    }
    else{
        console.log("item has no children");
    }

    return output += "\n\t</Grid>\n</Page>";
}

function createtShape(tag, item){
    var result = "";
    var ele = "";
    var props = "";
    var content = "";

    if (item != null) {
        var stroke = item.stroke.value.toString(16);
        var fill = item.fill != null ? item.fill.value.toString(16) : undefined;
        var margin = getMargin(item);
    
        var props = " ";
    
        switch (tag) {
            case "Rectangle":
                props += "Width=\"" + item.width + "\"";
                props += " Height=\"" + item.height + "\"";
                    break;
            case "Ellipse":
                props += "Width=\"" + (item.radiusX * 2).toString()+ "\"";
                props += " Height=\"" + (item.radiusY * 2).toString()+ "\"";
                    break;
            case "Polygon":
                props += "Width=\"" + item.width + "\"";
                props += " Height=\"" + item.height + "\"";
                break;
            case "Line":
                props += "X1=\"" + item.start.x+ "\"" + " X2=\"" + item.end.x+ "\"";
                props += " Y1=\"" + item.start.y+ "\"" + " Y2=\"" + item.end.y+ "\"";
                    break;
            default:
                break;
        }
    
        props += " Margin=\"" + margin + "\"";

        if(stroke != undefined) props += " Stroke=\"#" + stroke + "\"";
        if(fill != undefined) props += " Fill=\"#" + fill + "\"";

        ele = "\t\t<" + tag;
        result = ele + " " + props + "/>";
        return result;
    }
}

function createTextBlock(item) {
    console.log("creating textblock");
    var result = "";
    var ele = "";
    var props = "";
    var content = "";
    var margin = getMargin(item);

    if (item != null) {
        ele = "\t\t<TextBlock";
        //var props = getProperties(item);
        var props = " FontSize=\"" + item.fontSize + "\"";
        props += " Text=\"" + item.text + "\"";
        props += " Margin=\"" + margin + "\"";

        result = ele + " " + props + "/>";
        return result;
    }
}

function getMargin(item) {
    var x = item.globalDrawBounds.x;
    var y = item.globalDrawBounds.y;
    return x.toString() +","+ y.toString() + ",0,0";
}

module.exports = {
    convertBoard: convertBoard,
};
