let output = "";
const {Rectangle, Ellipse} = require("scenegraph");



function convertSelection(item) {
    var children = item.children;
    console.log(item.name + "- selected");

    if(children.length > 1) {
        console.log("item has many children");
        children.forEach(element => {
            console.log(element.name + "....");

            if (element instanceof Rectangle) {
                output += "\n";
                output += createtTag("Rectangle", element);
            }
            else if (element instanceof Ellipse){
                output += "\n";
                output += createtTag("Ellipse", element);
            } 
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


        //txt = "<" + tag + ">\n</" + tag + ">";
        // output += "\n" + result;

        // console.log(result);
        // clipboard.copyText(output);
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

module.exports = {
    convert: convertSelection,
};
