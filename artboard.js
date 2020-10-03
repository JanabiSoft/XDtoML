let output = "<Page>";
const {Rectangle, Ellipse} = require("scenegraph");



function convertBoard(item) {
    var children = item.children;
    console.log(item.name + "- selected");

    var tag = "";

    if(children.length > 1) {
        console.log("item has many children");
        children.forEach(element => {
            console.log(element.name + "....");

            output += "\n";
            
            if (element instanceof Rectangle) {
                tag = "Rectangle";
            }
            else if (element instanceof Ellipse){
                tag = "Rectangle";
            }
            else if(element instanceof Text){ tag = createtTextBlock(element); }

            output += tag;

        });
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
    props += item.width + "\"";
    props += " ";
    props += "Height=\"";
    props += item.height + "\"";

    return props;
}

function createTextBlock(item) {
    var result = "";
    var ele = "";
    var props = "";
    var content = "";

    if (item != null) {
        ele = "<TextBlock";
        var props = getProperties(item);
        props += " FontSize=" + item.FontSize + "\"";
        result = ele + " " + props + ">\n</"+ tag + ">";
        return result;
    }
}

module.exports = {
    convertBoard: convertBoard,
};
