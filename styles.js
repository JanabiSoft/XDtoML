const {Text} = require("scenegraph");

function getTextStyle(item) {
    var style = "";
    if (item instanceof Text) {
        style = "font-size:" + item.fontSize + "px;";
        style += "font-weight:" + item.fontStyle + ";";
        style += getTextColor(item);
    }
    return style;
}

function getTextColor(item) {
    if (item.fill != undefined) return "color: #" + item.fill.value.toString(16).slice(2) + ";";
    else return "";
}

function getStyle(item) {
    var genProps = "";
    var width = Math.round( item.globalDrawBounds.width);
    var height = Math.round(item.globalDrawBounds.height);

    genProps += "width:" + width + "px;";
    genProps += "height:" + height + "px;";
    var position = getPosition(item);
    if(item.cornerRadii != undefined) genProps += getCornerRadii(item.cornerRadii);

    return genProps + position;
}

function getMainStyle(item) {
    var style = "";

    if(item.cornerRadii != undefined) style += getCornerRadii(item.cornerRadii);
    style += getColors(item);

    return style;
}

function getMeasurement(item) {
    var genProps = "";
    var width = Math.round( item.globalDrawBounds.width);
    var height = Math.round(item.globalDrawBounds.height);

    genProps += "width:" + width + "px;";
    genProps += "height:" + height + "px;";
    var position = getPosition(item);

    return genProps + position;
}

function getBaseStyle(item) {
    var style = getBaseColors(item);
    if(item.cornerRadii != undefined) style += getCornerRadii(item.cornerRadii);

    return style;
}

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
    }

    return result;
}

function getBaseColors(item) {
    var result = "";
    if (item.stroke != null & item.stroke != undefined) {
        result = "stroke:#" + item.stroke.value.toString(16).slice(2) + ";";
    }
    if (item.storkeWidth != undefined) {
        result += "stroke-width:" + item.storkeWidth + "px;";
    }
    if (item.fill != null) {
        result += "background-color:#" + item.fill.value.toString(16).slice(2) + ";";
    }

    return result;
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
    GetTextStyle: getTextStyle,
    GetTextColor: getTextColor,
    GetStyle: getStyle,
    GetStyleColors: getColors,
    GetBaseColors: getBaseColors,
    GetMeasurement: getMeasurement,
    GetBaseStyle: getBaseStyle,
    GetMainStyle: getMainStyle
};
