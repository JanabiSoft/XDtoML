let output = "";
const {Rectangle, Ellipse, Text, Polygon, Line, Color, SymbolInstance, Group, Path} = require("scenegraph");
const {CreateControl} = require("./controls.js")
const {CreateTextBlock} = require("./controls.js")

const {CreateShape} = require("./Shape.js")
const {CreateLayout} = require("./Layout.js")



function convert(element) {
    var type = getElementType();
    var children = element.children;
    console.log(type + " : " + element.name + "- selected");

    output = "<Grid>";
    var tab = "";
    var tag = "";

    if(children.length > 1) {
        console.log("item has many children: " + children.length);
        children.forEach(item => {
            console.log(item.name + "....");
            tab = getTabPosition(8);
            tag = tab + createElement(item);
         
            output += "\n" + tag;

        });
    }
    else{
        console.log("element has no children");

        output += "\n" + createElement(element);
    }

    return output += "\n\t</Grid>\n";
}

// function createtTag(tag, item){
//     var result = "";
//     var ele = "";
//     var props = "";
//     var content = "";

//     if (item != null) {
//         ele = "<" + tag;
//         var props = getProperties(item);
//         result = ele + " " + props + ">\n</"+ tag + ">";
//         return result;


//         //txt = "<" + tag + ">\n</" + tag + ">";
//         // output += "\n" + result;

//         // console.log(result);
//         // clipboard.copyText(output);
//     }
// }

function getProperties(item) {
    var props = "Width=\"";
    props += item.width + "\"";
    props += " ";
    props += "Height=\"";
    props += item.height + "\"";

    return props;
}

function getElementType(element) {
    if (element instanceof Rectangle) {
        return "Rectangle";
    }
    else if (element instanceof Ellipse) {
        return "Ellipse";
    }
    else if (element instanceof Polygon) {
        return "Polygon";
    }
    else if (element instanceof Line) {
        return "Line";
    }
    else if (element instanceof Text) {
        return "Text";
    }
    else if (element instanceof Path) {
        return "Path";
    }
    else if (element instanceof Group) {
        return "Group";
    }

}

function createElement(element) {
    if (element instanceof Rectangle) return CreateShape("Rectangle", element);
        
    else if (element instanceof Ellipse) {
        //console.log(element);
        return CreateShape("Ellipse", element);
    }
    else if (element instanceof Polygon) {
        return CreateShape("Polygon", element);
    }
    else if (element instanceof Line) {
        return CreateShape("Line", element);
    }
    else if (element instanceof Text) {
        return CreateTextBlock(element);
    }
    else if (element instanceof SymbolInstance) {
        return CreateControl(element);
    }
    else if (element instanceof Group) {
        return CreateLayout(element);
    }

    else{
        return "";
    }
}

function getTabPosition(spaces) {
    var  res = "";
    for (let index = 0; index < spaces; index++) {
        res += " ";
    }
    return res;
}


module.exports = {
    Convert: convert,
};
