const {Text} = require("scenegraph");


function getTextStyle(item) {
    if (item instanceof Text) {
        var style;

        style = "color:#" + item.fill.value.toString(16).slice(2) + ";";
        style += "font-size:" + item.fontSize + ";";

        return style;
        }
}

module.exports = {
    GetTextStyle: getTextStyle,
};
