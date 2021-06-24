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
    var id = " id=\"" + ele.name + "\"";
    return id;
}

function generateStyle(item) {
    var genProps = "";
    var width = item.globalDrawBounds.width;
    var height = item.globalDrawBounds.height;

    genProps += "width:" + width + "px;";
    genProps += "height:" + height + "px;";
    var position = getPosition(item);
    return genProps + position;
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
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;
    
    return "position:absolute;left:" + x.toString() + "px;top: " + y.toString() + "px;";
}

module.exports = {
    IsCustomeControl: isCustomeControl,
    IsUserControl: isUserControl,
    GenerateAttributes: generateAttributes,
    GenerateStyle: generateStyle,
    GetTextColor: getTextColor,
    GetColors:getColors,
    GetPosition: getPosition

};
