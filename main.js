/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */


const {Rectangle, Ellipse, Color} = require("scenegraph");
//const application = require("application");
//const fs = require("uxp").storage.localFileSystem;
let clipboard = require("clipboard");
let output = "";

//main function
function convertSelection(selection) { 

    console.log("conversion initiated");

    if (selection) {
        console.log("selection available");
        var item = selection.items[0];
        var children = item.children;
        console.log(item.name + "- selected");

        if(children.length > 1) {
            console.log("item has many children");
            children.forEach(element => {
                console.log(element.name + "....");

                if (element instanceof Rectangle) {
                    exportTag("Rectangle", element);
                }
                else if (element instanceof Ellipse) exportTag("Ellipse", element);
            });
        }
        else{
            console.log("item has no children");
    
            if (item instanceof Rectangle) {
                    exportTag("Rectangle", item);
                }
                else if (item instanceof Ellipse) exportTag("Ellipse", element);
        }

    }
}

function exportOutput(text){
    if (text != null) {
        var output = "<" + text + "> </" + text + ">";
        console.log(output);
    }
}

function exportTag(tag, item){
    var result = "";
    var ele = "";
    var props = "";
    var content = "";

    if (item != null) {
        ele = "<" + tag;
        var props = getProperties(item);
        result = ele + " " + props + ">\n</"+ tag + ">";


        //txt = "<" + tag + ">\n</" + tag + ">";
        output += "\n" + result;

        console.log(result);
        clipboard.copyText(output);
    }
}


function exportShape(item){
    var txt = "";
    if (item != null) {
        if (item instanceof Ellipse) {
            txt = "<svg> <ellipse> </ellipse> </svg>";
        }

        output += "\n" + txt;
        console.log(txt);
        clipboard.copyText(output);

    }
}

function getProperties(item) {
    var props = "Width=\"";
    props += item.width + "\"";
    props += " ";
    props += "Height=\"";
    props += item.height + "\"";

    return props;



    // var props = {
    //     names:["width", "height"],
    //     values:[0, 0]
    // };
    // props.values[0] = item.width;
    // props.values[1] = item.Height;

    // style += props.names[0] + " : " + props.values[0];
    // style += "\; ";
    // style += props.names[1] + " : " + props.values[1];
    // style += "\"";


    //return props;
}


module.exports = {
    commands: {
        convert: convertSelection
    }
};
