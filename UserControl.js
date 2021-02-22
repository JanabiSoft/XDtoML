const {GenerateAttributes, GetColors, GenerateStyle, GetTextColor} = require("./Common.js");
const {GenerateShape} = require("./HtmlShape.js");

function createControl(item) {

    if (item != null) {

        var name = item.name.toLowerCase().split(" ").join("");
        if(name.includes("sectionheadline")) return createSectionHeadline(item);
        else if(name.includes("appbarbutton")) return createAppBarButton(item);

        else return createUnknown(item);
    }
}

function createSectionHeadline(item) {
    var attributes = GenerateAttributes(item);
    var style = " style=\"" + GenerateStyle(item);
    var content = "";

    var ele = "<div";
    var title = item.children.at(0);
    content += "\t\t\t<label" + GenerateAttributes(title) + GenerateStyle(title) + ">" + title.text + "</label>";
    content += "\n\t\t\t" + GenerateShape(item.children.at(1));

    ele += attributes  + style + "\">\n" + content + "\n\t\t\t</div>";
    return ele;
}

function createAppBarButton(item) {
    var txt = item.children.at(2).children.at(1).text;
    var icon = item.children.at(1).text;
    var labelColor = GetTextColor(item.children.at(2).children.at(1));
    var iconColor = GetTextColor(item.children.at(1));
    var buttonColor = "background-color:" + GetColors(item.children.at(0));

    var attributes = GenerateAttributes(item);
    var style = " style=\"" + GenerateStyle(item) + buttonColor + "\"";

    var control = "<button" + attributes + style + ">";
    var content = "\n\t<p style=\"text-align:senter;" + iconColor + '">' + icon + "</p>";
    control += '\n\t<p style="text-align:senter;' + labelColor + '">' + txt + "</p>";

    control += content + "\n</button>";
    return control;

}

module.exports = {
    CreateUserControl: createControl
};
