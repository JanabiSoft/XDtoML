let output = "<Page>";
const {Rectangle, Ellipse, Text} = require("scenegraph");



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

            output += "\n";
            
            if (element instanceof Rectangle) {
                tag = createtTag("Rectangle", element);
            }
            else if (element instanceof Ellipse){
                tag = createtTag("Ellipse", element);
            }
            else if(element instanceof Text){
                console.log("item is text");
                tag = createTextBlock(element); 
            }

            output += tag;


        });
        console.log(output);

    }
    else{
        console.log("item has no children");

        if (item instanceof Rectangle) {
            output += "\n";
            output += createtTag("Rectangle", item);
            }
            else if (item instanceof Ellipse){
                output += "\n";
                output += createtTag("Ellipse", item);
                }
    }

    return output += "\n</Page>";

}

function createtTag(tag, item){
    var result = "";
    var ele = "";
    var props = "";
    var content = "";

    if (item != null) {
        ele = "<" + tag;
        var props = getProperties(item);
        result = ele + " " + props + ">\n</"+ tag + ">";
        return result;
    }
}

function getProperties(item) {
    var props = "Width=\"";
    props += item.Width + "\"";
    props += " ";
    props += "Height=\"";
    props += item.Height + "\"";

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
        var props = getProperties(item);
        props += " FontSize=" + item.FontSize + "\"";
        result = ele + " " + props + ">\n</"+ item + ">";
        return result;
    }
}

function resetOutput() {
    output = "<Page>\n";
}

module.exports = {
    convertBoard: convertBoard,
};
