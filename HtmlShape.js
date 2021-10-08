const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group} = require("scenegraph");
const {GetCornerRadii, GetColors} = require("./Common.js");

function generateShape(item, tab) {
    var result = "";
    var element = "";
    var props = "";
    var elementStyle = "style=\"";
    var containerStyle = "style=\"";
    var stroke = "";
    var fill = "";
    var containerStart = "";

    var content = "";
    var tag = getShapeTag(item.constructor.name);

    console.log("creating Shape: " + item.constructor.name + ":" + item.name);

    if (item != null) {
        var containerEnd = "\n" + tab + "</svg>";
        tab += "\t";

        if (item.stroke != null) stroke = item.stroke.value.toString(16).slice(2);
        if (item.fill != null) fill = item.fill.value.toString(16).slice(2);
    
        if (item instanceof Rectangle) {
            tag = "rect";
            containerStart = "<svg height=\"" + item.globalDrawBounds.height + "\" width=\"" + item.globalDrawBounds.width + "\"";
            props += "width=\"" + item.width + "\"";
            props += " height=\"" + item.height + "\"";
            props += GetCornerRadii(item.cornerRadii);
        } 
        else if(item instanceof Ellipse) {
            tag = "ellipse";
            containerStart = "<svg height=\"" + (item.radiusY * 2) + "\" width=\"" + (item.radiusX * 2) + "\"";
            props += "cx=\"" + (item.localBounds.x + item.radiusX) + "\"";
            props += " cy=\"" + (item.localBounds.y + item.radiusY) + "\"";
            props += " rx=\"" + (item.radiusX).toString()+ "\"";
            props += " ry=\"" + (item.radiusY).toString()+ "\"";
        }
        else if(item instanceof Polygon){
            containerStart = "<svg height=\"" + item.globalDrawBounds.height + "\" width=\"" + item.globalDrawBounds.width + "\"";
            tag = "polygon";
        }
        else if(item instanceof Line){
            containerStart = "<svg height=\"" + item.globalDrawBounds.height + "px;\" width=\"" + item.globalDrawBounds.width + "px;\"";
            var x = item.start.x;
            var y = item.start.y;
            var x2 = item.end.x;
            var y2 = item.end.y;
            console.log("line dime: start:" + item.start.x + "," + item.start.y + " end: " + item.end.x + "," + item.end.y);
            console.log("line bounds: x:" + item.boundsInParent.x + " y: " + item.boundsInParent.y);
            tag = "line";

            props += "x1=\"" + x + "\"";
            props += " x2=\"" + x2 + "\"";
            props += " y1=\"" + y + "\"";
            props += " y2=\"" +  y2 + "\"";
        }
        else if(item instanceof Path){
            tag = "path";
            var d = item.pathData;
            containerStart = "<svg height=\"" + Math.round(item.globalDrawBounds.height) + "\" width=\"" + Math.round(item.globalDrawBounds.width) + "\"";
            props += " d=\"" + d + "\"";
        }

        containerStyle += getMargin(item);

        elementStyle += getShapeColors(item);

        elementStyle += "\"";
        containerStyle += "\"";

        element = "<" + tag;
        if(tag == "polygon") result = containerStart + " " + containerStyle + ">\n@*" + element + " " + props + " " + elementStyle + "/>*@\n\t" + tab + svgEnd;
        else result = containerStart + " " + containerStyle + ">\n" + tab + element + " " + props + " " + elementStyle + "/>" + containerEnd;
        return result;
    }
}

function getMargin(item) {
    console.log(item.name + " : " + item.boundsInParent);
    var x = item.boundsInParent.x;
    var y = item.boundsInParent.y;
    return "position:absolute;left:" + Math.round(x.toString()) + "px;top:" + Math.round(y.toString()) + "px;";
}

function getShapeTag(shape) {
    switch (shape) {
        case "Rectangle":
            return "rect";
        case "Ellipse":
            return "ellipse";
        case "Line":
            return "line";
        case "Polygon":
            return "polygon";
        default:
            return "rect";
    }
}

function getShapeColors(item) {
    console.log("getting colors");
    var result = "";
    if (item.stroke != null) {
        result = "stroke:#" + item.stroke.value.toString(16).slice(2) + ";";
    }
    if (item.storkeWidth != undefined) {
        result += "stroke-width:" + item.storkeWidth + "px;";
    }
    if (item.fill != null) {
        result += "fill:#" + item.fill.value.toString(16).slice(2) + ";";
        //result += "red";
    }

    return result;

}


module.exports = {
    GenerateShape: generateShape
};

