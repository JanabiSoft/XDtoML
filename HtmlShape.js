const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group} = require("scenegraph");

function createShape(tag, item){
    //console.log("Creating: " + tag + ": " + item.name );
    var result = "";
    var ele = "";
    var props = "";
    var eleStyle = "style=\"";
    var svgStyle = "style=\"";
    var stroke = "";
    var fill = "";
    var svgStart = "";

    var content = "";

    if (item != null) {
        if (item.stroke != null) stroke = item.stroke.value.toString(16).slice(2);
            
        if (item.fill != null) fill = item.fill.value.toString(16).slice(2);

        // var stroke = item.stroke != null ? item.stroke.value.toString(16) : undefined;
        // var fill = item.fill != null ? item.fill.value.toString(16) : undefined;
        // stroke = stroke.slice(2);
        // fill = fill.slice(2);

        //var svgStart = "<svg height=\"" + item.height + "\" width=\"" + item.width + "\" ";
        var svgEnd = "\t</svg>";
    
        switch (tag) {
            case "rect":
                svgStart = "<svg height=\"" + item.height + "\" width=\"" + item.width + "\" ";

                props += "width=\"" + item.width + "\"";
                props += " height=\"" + item.height + "\"";
                props += getCornerRadii(item.cornerRadii);
                    break;
            case "ellipse":
                svgStart = "<svg height=\"" + (item.radiusY * 2) + "\" width=\"" + (item.radiusX * 2) + "\" ";

                props += "cx=\"" + (item.localBounds.x + item.radiusX) + "\"";
                props += " cy=\"" + (item.localBounds.y + item.radiusY) + "\"";
                props += " rx=\"" + (item.radiusX).toString()+ "\"";
                props += " ry=\"" + (item.radiusY).toString()+ "\"";
                    break;
            case "polygon":
                svgStart = "<svg height=\"" + item.height + "\" width=\"" + item.width + "\" ";
                // props += "width=\"" + item.width + "\"";
                // props += " height=\"" + item.height + "\"";
                break;
            case "line":
                var x, y, x2, y2;
                if(item.parent instanceof Group){
                    var parentX = item.parent.localBounds.x;
                    var parentY = item.parent.localBounds.y;
                    x = item.boundsInParent.x - parentX;
                    y = item.boundsInParent.y - parentY;
                                    
                    x2 = x + item.boundsInParent.width;
                    y2 = y - item.boundsInParent.height;
                    props += "x1=\"" + x + "\"";
                    props += " x2=\"" + x2 + "\"";
                    props += " y1=\"" + y + "\"";
                    props += " y2=\"" +  y2 + "\"";
                }
                else {
                    x = item.boundsInParent.x;
                    y = item.boundsInParent.y;
                    x2 = item.boundsInParent.x + item.boundsInParent.width;
                    y2 = item.boundsInParent.y + item.boundsInParent.height;
                    props += "x1=\"" + x + "\"";
                    props += " x2=\"" + x2 + "\"";
                    props += " y1=\"" + y + "\"";
                    props += " y2=\"" +  y2 + "\"";
                }

                svgStart = "<svg height=\"" + (y2 - y) + "\" width=\"" + (x2 - x) + "\" ";
                break;
            default:
                break;
        }

        //props += " stroke-width:" + item.storkeWidth;

        if (tag != "line") svgStyle += getMargin(item);

        if(stroke != undefined){
            eleStyle += " stroke: #" + stroke + ";";
            if(item.storkeWidth != undefined) eleStyle += "stroke-width:"+ item.storkeWidth.toString() + ";";
        } 
        if(fill != undefined && tag != "line") eleStyle += " fill: #" + fill + ";";

        eleStyle += "\"";
        svgStyle += "\"";
        //svgStart += svgStyle + ">";


        ele = "\t\t<" + tag;
        result = svgStart + " " + svgStyle + ">\n" + ele + " " + props + " " + eleStyle + "/>\n" + svgEnd;
        return result;
    }
}

function getMargin(item) {
    var x = item.globalDrawBounds.x;
    var y = item.globalDrawBounds.y;
    return " margin-left:" + x.toString() + "px; margin-top: " + y.toString() + "px;";
}

function getCornerRadii(radii) {
    var result = "";
    if (radii.topLeft != 0) result += " rx=\"" + radii.topLeft + "\"";
    if (radii.topRight != 0) result += " rx=\"" + radii.topRight + "\"";
    if (radii.bottomRight != 0) result += " ry=\"" + radii.bottomRight + "\"";
    if (radii.bottomLeft != 0) result += " ry=\"" + radii.bottomLeft + "\"";
    return result;
}

module.exports = {
    CreateShape: createShape,
};

