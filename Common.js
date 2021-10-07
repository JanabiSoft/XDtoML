const {Group} = require("scenegraph");

function isCustomeControl(type) {
    var typ = type.toLowerCase().split(" ").join("");
    var conditions = [];
    if (conditions.some(e => typ.includes(e))) return true;
    else return false;
}

function isUserControl(type) {
    var typ = type.toLowerCase().split(" ").join("");
    var conditions = ["sectionheadline", "appbarbutton"];
    if (conditions.some(e => typ.includes(e))) return true;
    else return false;
}

function generateAttributes(ele) {
    var id = "id=\"" + ele.name + "\"";
    return id;
}

function generateStyle(item) {
    var genProps = "";
    var width = item.globalDrawBounds.width;
    var height = item.globalDrawBounds.height;

    genProps += "width:" + width + "px;";
    genProps += "height:" + height + "px;";
    var position = getPosition(item);

    //genProps += getMargin(item);
    if(item.cornerRadii != null) genProps += getCornerRadii(item.cornerRadii);

    return genProps + position;
}

function GetColors(item) {
    var stroke;
    var fill;
    var result;
    if (item.stroke != null) stroke = item.stroke.value.toString(16).slice(2);
    if (item.fill != null) fill = item.fill.value.toString(16).slice(2);

    if(stroke != undefined){
        result += " stroke: #" + stroke + ";";
        if(item.storkeWidth != undefined) result += "stroke-width:"+ item.storkeWidth + "px;";
        else result += "stroke-width:1px;";
    } 
    if(fill != undefined && !(item instanceof Line)) result += " fill: #" + fill + ";";
    console.log("fill color test is: " + result);
    return result;
}

function getTextColor(item) {
    if (item.fill != undefined) return "color: #" + item.fill.value.toString(16).slice(2) + ";";
    else return "";
}

function getColors(item) {
    if (item.fill != undefined) return "#" + item.fill.value.toString(16).slice(2) + ";";
    else return "";
}

//support functions
function getPosition(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = Math.round(item.boundsInParent.x - parentX).toString();
    var y = Math.round(item.boundsInParent.y - parentY).toString();

    return "position:absolute;left:" + x + "px;top: " + y + "px;";
}

function getMargin(item) {
    var x = item.boundsInParent.x;
    var y = item.boundsInParent.y;

    return " margin-left:" + x.toString() + "px;" + " margin-top: " + y.toString() + "px;";
}

function getCornerRadii(radii) {
    var result = "";
    if (radii.topLeft != 0) result = "border-radius: " + radii.topLeft + "px;";
    if (radii.topRight != 0) result = "border-radius: " + radii.topRight + "px;";
    if (radii.bottomRight != 0) result = "border-radius: " + radii.bottomRight + "px;";
    if (radii.bottomLeft != 0) result = "border-radius: " + radii.bottomLeft + "px;";
    return result;
}

module.exports = {
    IsCustomeControl: isCustomeControl,
    IsUserControl: isUserControl,
    GenerateAttributes: generateAttributes,
    GenerateStyle: generateStyle,
    GetTextColor: getTextColor,
    GetColors:getColors,
    GetPosition: getPosition,
    GetMargin: getMargin,
    GetCornerRadii: getCornerRadii
};
