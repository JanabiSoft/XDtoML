const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group} = require("scenegraph");
const {GetCornerRadii} = require("./Common.js");

function generateShape(item, tab) {
    var result = "";
    var ele = "";
    var props = "";
    var eleStyle = "style=\"";
    var svgStyle = "style=\"";
    var stroke = "";
    var fill = "";
    var svgStart = "";

    var content = "";
    var tag = getShapeTag(item.constructor.name);

    console.log("creating Shape: " + item.constructor.name + ":" + item.name);

    if (item != null) {
        tab += "\t";

        if (item.stroke != null) stroke = item.stroke.value.toString(16).slice(2);
        if (item.fill != null) fill = item.fill.value.toString(16).slice(2);

        var svgEnd = "</svg>";
    
        if (item instanceof Rectangle) {
            tag = "rect";
            svgStart = "<svg height=\"" + item.globalDrawBounds.height + "\" width=\"" + item.globalDrawBounds.width + "\" ";
            props += "width=\"" + item.width + "\"";
            props += " height=\"" + item.height + "\"";
            props += GetCornerRadii(item.cornerRadii);
        } 
        else if(item instanceof Ellipse) {
            tag = "ellipse";
            svgStart = "<svg height=\"" + (item.radiusY * 2) + "\" width=\"" + (item.radiusX * 2) + "\" ";
            props += "cx=\"" + (item.localBounds.x + item.radiusX) + "\"";
            props += " cy=\"" + (item.localBounds.y + item.radiusY) + "\"";
            props += " rx=\"" + (item.radiusX).toString()+ "\"";
            props += " ry=\"" + (item.radiusY).toString()+ "\"";
        }
        else if(item instanceof Polygon){
            svgStart = "<svg height=\"" + item.globalDrawBounds.height + "\" width=\"" + item.globalDrawBounds.width + "\" ";
            tag = "polygon";
        }
        else if(item instanceof Line){
            svgStart = "<svg height=\"" + item.globalDrawBounds.height + "px;\" width=\"" + item.globalDrawBounds.width + "px;\" ";
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
            svgStart = "<svg height=\"" + Math.round(item.globalDrawBounds.height) + "\" width=\"" + item.globalDrawBounds.width + "\" ";
            props += " d=\"" + d + "\"";
        }

        svgStyle += getMargin(item);

        if(stroke != undefined){
            eleStyle += " stroke: #" + stroke + ";";
            if(item.storkeWidth != undefined) eleStyle += "stroke-width:"+ item.storkeWidth + "px;";
            else eleStyle += "stroke-width:1px;";
        } 
        if(fill != undefined && !(item instanceof Line)) eleStyle += " fill: #" + fill + ";";

        eleStyle += "\"";
        svgStyle += "\"";

        ele = "<" + tag;
        if(tag == "polygon") result = svgStart + " " + svgStyle + ">\n@*" + ele + " " + props + " " + eleStyle + "/>*@\n\t" + tab + svgEnd;
        else result = svgStart + " " + svgStyle + ">\n" + tab + ele + " " + props + " " + eleStyle + "/>\n" + svgEnd;
        return result;
    }
}

function getMargin(item) {
    console.log(item.name + " : " + item.boundsInParent);
    var x = item.boundsInParent.x;
    var y = item.boundsInParent.y;
    return "position:absolute;left:" + x.toString() + "px;top:" + y.toString() + "px;";
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

module.exports = {
    GenerateShape: generateShape
};

