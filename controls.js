const {Path, Text, Rectangle, Ellipse, Line, Polygon} = require("scenegraph");


function createControl(item) {

    if (item != null) {
        var type = getControlType(item);

        console.log("creating " + type);
        var result = "";
        var ele = "";
        var props = " ";
        var margin = getMargin(item);
        var width = item.globalDrawBounds.width;
        var height = item.globalDrawBounds.height;


        // general properties
        ele = "\t\t<" + type;
        props += "Width=\"" + width + "\"";
        props += " Height=\"" + height + "\"";
        props += " Margin=\"" + margin + "\"";

        //specific proeprties
        switch (type) {
            case "Button":
                props += getButtonProperties(item);
                break;
        
            default:
                break;
        }

        result = ele + " " + props + "/>";
        return result;
    }
}

function getControlType(item) {
    var name = item.name;
    if(name.includes("Button") || name.includes("button")) return "Button";
}


function getButtonProperties(item) {
    var children = item.children;
    var result = "";
    var prop = "";

    if(children.length > 1) {
        console.log("item has many children");
        children.forEach(element => {
            console.log(element.name + "....");

            if (element instanceof Rectangle) {
                prop = createtShape("Rectangle", element);
            }
            else if (element instanceof Ellipse) {
                //console.log(element);
                prop = createtShape("Ellipse", element);
            }
            else if (element instanceof Polygon) {
                prop = createtShape("Polygon", element);
            }
            else if (element instanceof Line) {
                //console.log(element);
                prop = createtShape("Line", element);
            }
            else if (element instanceof Text) {
                var txt = element.text;
                prop = " Content=\"" + txt + "\"";
                prop += " Foreground=\"#" + element.fill.value.toString(16) + "\"";
                prop += " FontSize=\"" + element.fontSize + "\"";
            }
            else if (element instanceof Path) {
                prop = " Background=\"#" + element.fill.value.toString(16) + "\"";
            }

            else if (element instanceof Group) {
                prop = createControl(element);
            }

          
            result += prop;
        });
        return result + "\n";
    }
    else{
        return "";
        console.log("item has no children");
    }

}

function getMargin(item) {
    var x = item.globalDrawBounds.x;
    var y = item.globalDrawBounds.y;
    return x.toString() +","+ y.toString() + ",0,0";
}

module.exports = {
    CreateControl: createControl,
};

