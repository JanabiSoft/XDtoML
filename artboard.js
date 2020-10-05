let output = "<Page>";
const {Rectangle, Ellipse, Text, Polygon, Line, Color} = require("scenegraph");



function convertBoard(item) {
    resetOutput();
    var children = item.children;
    console.log(item.name + "- selected");
    console.log("output is :" + output);


    var tag = "";

    if(children.length > 1) {
        console.log("item has many children");
        children.forEach(element => {
            console.log(element.name + "....");
            //console.log(element);


            //output += "\n";
            //console.log("atg name : " + tagName);

            if (element instanceof Rectangle) {
                tag = createtShape("Rectangle", element);
            }
            else if (element instanceof Ellipse) {
                console.log(element);

                tag = createtShape("Ellipse", element);
            }
            else if (element instanceof Polygon) {
                tag = createtShape("Polygon", element);
            }
            else if (element instanceof Line) {
                console.log(element);

                tag = createtLine(element);
            }
            else if (element instanceof Text) {
                tag = createTextBlock(element);
            }

           
            output += tag + "\n";


        });
        console.log(output);

    }
    else{
        console.log("item has no children");

    }

    return output += "\n</Page>";

}

function createtShape(tag, item){
    var result = "";
    var ele = "";
    var props = "";
    var content = "";

    if (item != null) {
        ele = "<" + tag;
        var props = getProperties(item);
        props += " BorderBrush=\"" + item.stroke + "\"";
        if(tag != "Line") props += " Fill=\"" + item.fill + "\"";
        result = ele + " " + props + ">\n</"+ tag + ">";
        return result;
    }
}

function getProperties(item) {
    var props = "Width=\"";
    props += item.width + "\"";
    props += " ";
    props += "Height=\"";
    props += item.height + "\"";

    return props;
}

function createTextBlock(item) {
    console.log("creating textblock");
    var result = "";
    var ele = "";
    var props = "";
    var content = "";

    if (item != null) {
        ele = "<TextBlock";
        //var props = getProperties(item);
        var props = " FontSize=" + item.fontSize + "\"";
        result = ele + " " + props + ">\n</TextBlock>";
        return result;
    }
}

function createtLine(item) {
    var result = "";
    var ele = "";
    var content = "";

    if (item != null) {
        var stroke = item.stroke.value.toString(16);
        //var stroke = parseInt(hex, 16);
        console.log(stroke);


        ele = "<Line";
        var props = "X1=\"" + item.start.x + " X2=\"" + item.end.x;
        props += " Y1=\"" + item.start.y + " Y2=\"" + item.end.y;

        props += " Stroke=\"#" + stroke + "\"";
        props += " StrokeWidth=\"" + item.strokeWidth + "\"";

        result = ele + " " + props + ">\n</Line>";
        return result;
    }
}

function resetOutput() {
    output = "<Page>\n";
}

module.exports = {
    convertBoard: convertBoard,
};
