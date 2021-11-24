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
    var id = "";
    if(ele.name != ele.text) id = "id=\"" + ele.name + "\"";
    return id;
}

function generateStyle(item) {
    var genProps = "";
    var width = Math.round( item.globalDrawBounds.width);
    var height = Math.round(item.globalDrawBounds.height);

    genProps += "width:" + width + "px;";
    genProps += "height:" + height + "px;";
    var position = getPosition(item);

    //genProps += getMargin(item);
    console.log(item.cornerRadii);
    if(item.cornerRadii != undefined) genProps += getCornerRadii(item.cornerRadii);

    return genProps + position;
}

function getColors(item) {
    console.log("getting colors");
    var result = "";
    if (item.stroke != null) {
        result = "stroke:#" + item.stroke.value.toString(16).slice(2) + ";";
    }
    if (item.storkeWidth != undefined) {
        result += "stroke-width:" + item.storkeWidth + "px;";
    }
    if (item.fill != null) {
        result += "background-color:#" + item.fill.value.toString(16).slice(2) + ";";
        //result += "red";
    }

    return result;
}


// function getColors(item) {
//     if (item.fill != undefined) return "#" + item.fill.value.toString(16).slice(2) + ";";
//     else return "";
// }

//support functions
function getPosition(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = Math.round(item.boundsInParent.x - parentX).toString();
    var y = Math.round(item.boundsInParent.y - parentY).toString();

    return "position:absolute;left:" + x + "px;top:" + y + "px;";
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

function getElementType(item) {
    var name = item.name.toLowerCase().split(" ").join("");
    if(name.includes("hyperlinkbutton")) return "control";
    else if(name.includes("appbarbutton") || name.includes("Command Bar / _Elements / List Item / Icon + Text")) return "control";
    else if(name.includes("checkbox")) return "control";
    else if(name.includes("radiobuttons") && !name.includes("Group")) return "control";
    else if(name.includes("radiobuttongroup")) return "control";
    else if(name.includes("textbox")) return "text";
    else if(name.includes("combobox")) return "control";
    else if(name.includes("rating")) return "control";
    else if(name.includes("slider")) return "control";
    else if(name.includes("toggleswitch") || name.includes("switch")) return "control";
    else if(name.includes("pagetitle")) return "Custome";
    else if(name.includes("pagetitle")) return "Custome";
    else if(name.includes("button") || name.includes("accentbutton")) return "control";
    else if(name.includes("pageheader")) return "PageHeader";
    else if(name.includes("navbar")) return "control";
    else if(name.endsWith("-card") | name.startsWith("card/")) return "control";
    else if(name.includes("-group")) return "layout";
    else if(name.endsWith("-panel")) return "layout";
    else if(name.endsWith("-image")) return "image";
    else if(name.endsWith("-icon")) return "icon";
    else if(name.endsWith("-shape")) return "shape";


    else return "unknown";
}

module.exports = {
    IsCustomeControl: isCustomeControl,
    IsUserControl: isUserControl,
    GenerateAttributes: generateAttributes,
    GenerateStyle: generateStyle,
    GetColors:getColors,
    GetPosition: getPosition,
    GetMargin: getMargin,
    GetCornerRadii: getCornerRadii,
    GetElementType: getElementType
};
