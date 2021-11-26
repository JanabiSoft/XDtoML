const {Path, Rectangle, Ellipse, Line, Polygon, Group, LinearGradient} = require("scenegraph");
const {GetCornerRadii, GetPosition} = require("./Common.js");

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

    console.log("17 creating Shape: " + item.constructor.name + ":" + item.name);

    if (item != null) {
        var containerEnd = "\n" + tab + "</svg>";
        tab += "\t";

        if (item.stroke != null) stroke = item.stroke.value.toString(16).slice(2);
        if (item.fill != null) {
            if(item.fill.value != undefined) fill = item.fill.value.toString(16).slice(2);
        }
    
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

function createShape(item, tab) {
    var result = "";
    var element = "";
    var props = "";
    var elementStyle = "style=\"";
    var containerStyle = "style=\"";
    var containerStart = "";
    var stroke, fill, tag;
    var internalTab = tab + "\t";

    console.log("creating Shape: " + item.constructor.name + ":" + item.name);

    if (item != null) {
        if (item.stroke != null && item.stroke != undefined) stroke = item.stroke.value.toString(16).slice(2);
        if (item.fill != null) {
            if(item.fill.value != undefined) fill = item.fill.value.toString(16).slice(2);
        }
    
        if (item instanceof Rectangle) {
            tag = "rect";
            containerStart = "<svg height=\"" + item.globalDrawBounds.height + "\" width=\"" + item.globalDrawBounds.width + "\"";
            props += "width=\"" + item.width + "\"";
            props += " height=\"" + item.height + "\"";
        } 
        else if(item instanceof Ellipse) {
            tag = "ellipse";
            containerStart = "<svg height=\"" + Math.round(item.radiusY * 2) + "\" width=\"" + Math.round(item.radiusX * 2) + "\"";
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

        containerStyle += GetPosition(item);

        element = "<" + tag + " ";

        var gradient = "";
        if (item.fillEnabled && item.fill instanceof LinearGradient) {
            gradient += "\n" + internalTab;
            var fill = item.fill;
            gradient = "<defs>\n\t\t<linearGradient id=\"grad\" x1=\"" + (fill.startX * 100) + "%"  +
             "\" y1=\"" + (fill.startY * 100) + "%" + "\" x2=\"" + (fill.endX * 100) + "%" +
              "\" y2=\"" + (fill.endY * 100) + "%" + "\">";

            fill.colorStops.forEach(ar => {
                gradient += "\n\t\t\t<stop offset=\"" + (ar.stop * 100) + "%" + "\" style=\"stop-color:"+ ar.color.toHex() + ";stop-opacity:1\" />";
            });

            gradient += "\n\t\t</linearGradient>\n\t</defs>\n";
            element += " fill=\"url('#grad')\" ";
        }
        else{
            elementStyle += getShapeColors(item);
        }

        elementStyle += "\" ";
        containerStyle += "\" ";

        element += elementStyle + props + getShapeCornerRadii(item) + "\" ";
        containerStart += containerStyle;

        if(tag == "polygon") result = containerStart  + ">\n@*" + gradient + element + " " + props + "/>*@\n\t" + tab + "</svg>";
        else result = containerStart + ">\n" + gradient + internalTab  + element  + "/>" + "\n" + tab + "</svg>";
        return result;
    }
}

function getShapeCornerRadii(item) {
    if (item.cornerRadii != undefined) {
        var radii = item.cornerRadii;
        var result = "";
        if (radii.topLeft != 0) {
            result = "rx=\"" + radii.topLeft + "\"";
            result += " ry=\"" + radii.topLeft + "\"";
    
        }
    
        return result;
    }
    else return "";
}

function getMargin(item) {
    console.log("84" + item.name + " : " + item.boundsInParent);
    if (item != undefined) {
        var x = item.boundsInParent.x;
        var y = item.boundsInParent.y;
        return "position:absolute;left:" + Math.round(x.toString()) + "px;top:" + Math.round(y.toString()) + "px;";
    }
    return "";
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
    var result = "";
    if (item.stroke != null) {
        result = "stroke:#" + item.stroke.value.toString(16).slice(2) + ";";
    }
    if (item.storkeWidth != undefined) {
        result += "stroke-width:" + item.storkeWidth + "px;";
    }
    if (item.fillEnabled) {
        if(item.fill != null && item.fill != undefined) {
            if (item.fill instanceof LinearGradient) {
                result += "background-image: linear-gradient(to bottom, #DFB9E0 , #C064C2, #842884, #561356, #2A042A);";
            }
            else result += "fill:#" + item.fill.value.toString(16).slice(2) + ";";
        }
    }

    return result;
}


module.exports = {
    GenerateShape: generateShape,
    CreateShape : createShape
};

