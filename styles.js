const {Text} = require("scenegraph");


function getTextStyle(item) {
    if (item instanceof Text) {
        var style;
        style = "font-size:" + item.fontSize + ";";
        style += "font-weight:" + item.fontStyle + ";";
        return style;
        }
}

function getTextColor(item) {
    if (item.fill != undefined) return "color: #" + item.fill.value.toString(16).slice(2) + ";";
    else return "";
}


module.exports = {
    GetTextStyle: getTextStyle,
    GetTextColor: getTextColor
};
