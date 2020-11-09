const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group} = require("scenegraph");



function createShape(tag, item){
    console.log("Creating: " + tag + ": " + item.name );
    var result = "";
    var ele = "";
    var props = "";
    var content = "";

    if (item != null) {
        var stroke = item.stroke.value.toString(16);
        var fill = item.fill != null ? item.fill.value.toString(16) : undefined;
        // var  margin = "";
        // if (tag != "Line") margin = getMargin(item);
    
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
                if(item.parent instanceof Group){
                    var parentX = item.parent.localBounds.x;
                    var parentY = item.parent.localBounds.y;
                    var x = item.boundsInParent.x - parentX;
                    var y = item.boundsInParent.y - parentY;
                                    
                    var x2 = x + item.boundsInParent.width;
                    var y2 = y + item.boundsInParent.height;
                    props += "X1=\"" + x + "\"";
                    props += " X2=\"" + x2 + "\"";
                    props += " Y1=\"" + y + "\"";
                    props += " Y2=\"" +  y2 + "\"";
                }
                else {
                    var x2 = item.boundsInParent.x + item.boundsInParent.width;
                    var y2 = item.boundsInParent.y + item.boundsInParent.height;
                    props += "X1=\"" + item.boundsInParent.x + "\"";
                    props += " X2=\"" + x2 + "\"";
                    props += " Y1=\"" + item.boundsInParent.y + "\"";
                    props += " Y2=\"" +  y2 + "\"";
                }
                break;
            default:
                break;
        }
    
        if (tag != "Line") props += " Margin=\"" + getMargin(item) + "\"";

        if(stroke != undefined) props += " Stroke=\"#" + stroke + "\"";
        if(fill != undefined) props += " Fill=\"#" + fill + "\"";

        ele = "<" + tag;
        result = ele + " " + props + " HorizontalAlignment=\"Left\" VerticalAlignment=\"Top\" />";
        return result;
    }
}

function getMargin(item) {
    var x = item.globalDrawBounds.x;
    var y = item.globalDrawBounds.y;
    return x.toString() +","+ y.toString() + ",0,0";
}


module.exports = {
    CreateShape: createShape,
};

