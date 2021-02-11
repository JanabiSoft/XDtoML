const {Rectangle, Ellipse, Text, Polygon, Line, Color, SymbolInstance, Group} = require("scenegraph");
const {CreateControl} = require("./controls.js")
const {CreateTextBlock} = require("./controls.js")

const {CreateShape} = require("./Shape.js")
const {CreateLayout} = require("./Layout.js")


function convertBoard(item) {
    //resetOutput();
    var children = item.children;
    console.log(item.name + "- selected");
    console.log("output is :" + output);

    var page = "<Page";
    page += " xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"";
    page += "\n\txmlns:x=\"http://schemas.microsoft.com/winfx/2006/xaml\"";
    page += "\n\txmlns:d=\"http://schemas.microsoft.com/expression/blend/2008\"";
    page += "\n\txmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\"";
    page += "\n\tmc:Ignorable=\"d\">\n\t<Grid>\n";

    var output = page;

    var tag = "";

    if(children.length > 1) {

        console.log("item has many children: " + children.length);
        children.forEach(element => {
            console.log(element.name + "....");

            if (element instanceof Rectangle) {
                tag = CreateShape("Rectangle", element);
            }
            else if (element instanceof Ellipse) {
                //console.log(element);
                tag = CreateShape("Ellipse", element);
            }
            else if (element instanceof Polygon) {
                tag = CreateShape("Polygon", element);
            }
            else if (element instanceof Line) {
                tag = CreateShape("Line", element);
            }
            else if (element instanceof Text) {
                tag = CreateTextBlock(element);
            }
            else if (element instanceof SymbolInstance) {
                //console.log(element);
                tag = CreateControl(element);
            }
            else if (element instanceof Group) {
                console.log(element.name  + " is group");
                tag = CreateLayout(element);
            }

            else{
                //console.log(element);
            }
          
            output += tag + "\n";

        });
        //console.log(output);
    }
    else{
        console.log("item has no children");
    }

    return output += "\n\t</Grid>\n</Page>";
}

// function CreateShape(tag, item){
//     console.log("Creating: " + item.name );
//     var result = "";
//     var ele = "";
//     var props = "";
//     var content = "";

//     if (item != null) {
//         var stroke = item.stroke.value.toString(16);
//         var fill = item.fill != null ? item.fill.value.toString(16) : undefined;
//         var margin = getMargin(item);
    
//         var props = " ";
    
//         switch (tag) {
//             case "Rectangle":
//                 props += "Width=\"" + item.width + "\"";
//                 props += " Height=\"" + item.height + "\"";
//                     break;
//             case "Ellipse":
//                 props += "Width=\"" + (item.radiusX * 2).toString()+ "\"";
//                 props += " Height=\"" + (item.radiusY * 2).toString()+ "\"";
//                     break;
//             case "Polygon":
//                 props += "Width=\"" + item.width + "\"";
//                 props += " Height=\"" + item.height + "\"";
//                 break;
//             case "Line":
//                 props += "X1=\"" + item.start.x+ "\"" + " X2=\"" + item.end.x+ "\"";
//                 props += " Y1=\"" + item.start.y+ "\"" + " Y2=\"" + item.end.y+ "\"";
//                     break;
//             default:
//                 break;
//         }
    
//         props += " Margin=\"" + margin + "\"";

//         if(stroke != undefined) props += " Stroke=\"#" + stroke + "\"";
//         if(fill != undefined) props += " Fill=\"#" + fill + "\"";

//         ele = "\t\t<" + tag;
//         result = ele + " " + props + " HorizontalAlignment=\"Left\" VerticalAlignment=\"Top\" />";
//         return result;
//     }
// }

// function createTextBlock(item) {
//     console.log("creating textblock");
//     var result = "";
//     var ele = "";
//     var props = "";
//     var content = "";
//     var margin = getMargin(item);

//     if (item != null) {
//         ele = "\t\t<TextBlock";
//         //var props = getProperties(item);
//         var props = " FontSize=\"" + item.fontSize + "\"";
//         props += " Text=\"" + item.text + "\"";
//         props += " Margin=\"" + margin + "\"";

//         result = ele + " " + props + "/>";
//         return result;
//     }
// }

function getMargin(item) {
    var x = item.globalDrawBounds.x;
    var y = item.globalDrawBounds.y;
    return x.toString() +","+ y.toString() + ",0,0";
}

module.exports = {
    convertBoard: convertBoard,
};
