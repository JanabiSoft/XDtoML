let output = "";
const {Rectangle, Ellipse, Text, Polygon, Line, Color, SymbolInstance, Group, Path, Artboard, RepeatGrid} = require("scenegraph");
const {CreateControl, CreateTextBlock} = require("./HtmlControl.js");
const {GenerateShape} = require("./HtmlShape.js");
const {CreateLayout} = require("./HtmlLayout.js");
const {CreateBlazorise} = require("./blazorise.js");
const {GenerateImage, GenerateSVG} = require("./Image.js");
const Image = require("scenegraph").ImageFill;


let lastTab = 0;

function convert(selection) {
    console.log("converting to html: " + selection.constructor.name);
    var children = selection.children;
    var page = "";
    var header = "\t<head>";
    header += "\n\t\t<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl\" crossorigin=\"anonymous\">";
    header += "\n\t</head>";

    if(selection instanceof Artboard){
        page = "<!DOCTYPE html>\n";
        page += "<html>\n";
        page += header + "\n\t<body>";
    }else{
        page = "<div>";
    }

    output = page;
    var tab = "";
    var tag = "";

    if(children.length > 1) {
        children.forEach(item => {
            tab = getTabPosition(8);
            tag = createElement(item, tab);
         
            output += "\n" + tab + tag;
        });
    }
    else{

        output += "\n" + createElement(selection) + "\n";
    }

    if(selection instanceof Artboard){
        var ending = "\n<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js\" integrity=\"sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0\" crossorigin=\"anonymous\"></script>";
        ending += "\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css\">";
        
        return output += ending + "\n\t</body>\n</html>";
    }else{
        return output += "\n</div>\n";
    }

}

function createElement(element, tab) {
        
    console.log("creating element: " + element.constructor.name);

    if (element instanceof Rectangle && element.fill instanceof Image) return GenerateImage(element, tab);

    else if (element instanceof Rectangle) return GenerateShape(element, tab);
        
    else if (element instanceof Ellipse) {
        return GenerateShape(element, tab);
    }
    else if (element instanceof Polygon) {
        return GenerateShape(element, tab);
    }
    else if (element instanceof Line) {
        return GenerateShape(element, tab);
    }
    else if (element instanceof Text && element.name.includes("Hyperlink")) {
        return CreateControl(element, tab);
    }
    else if (element instanceof Text) {
        return CreateTextBlock(element, tab);
    }
    else if (element instanceof SymbolInstance && isControl(element.name)) {
        return CreateCustomeControl(element, tab);
    }
    else if (element instanceof SymbolInstance && isLayout(element.name)) {
        return CreateLayout(element, tab);
    }
    else if (element instanceof SymbolInstance) {
        return CreateControl(element, tab);
    }
    else if (element instanceof Group) {
        if(element.name.endsWith("-symbol")) return GenerateSVG(element, tab);
        else return CreateLayout(element, tab);
    }
    else if (element instanceof RepeatGrid) {
        return CreateLayout(element, tab);
    }
    else{
        return "";
    }
}

function isControl(type) {
    var conditions = ["Text Box", "Combo Box", "Slider", "Switch", "Rating"];
    return conditions.some(el => type.includes(el));
}

function isLayout(name) {
    var nam = name.toLowerCase().split(" ").join("");
    var conditions = ["pagetitle"];
    return conditions.some(el => nam.includes(el));
}

function getTabPosition(spaces) {
    lastTab = spaces;
    var  res = "";
    for (let index = 0; index < spaces; index++) {
        res += " ";
    }
    return res;
}

function CreateCustomeControl(ele, tab) {
    var cfk = window.localStorage.getItem("component_framework");
    if (cfk == "blazorise") return CreateBlazorise(ele);
}

module.exports = {
    ConvertHTML: convert,
};
