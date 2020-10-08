const {Path, Text, Rectangle, Ellipse, Line, Polygon} = require("scenegraph");


function createControl(item) {

    if (item != null) {
        var type = getControlType(item);
        console.log("creating " + type);
        var result = "";
        var ele = "";
        var generalProps = " ";
        var margin = getMargin(item);
        var width = item.globalDrawBounds.width;
        var height = item.globalDrawBounds.height;


        // general properties
        ele = "\t\t<" + type;
        generalProps += "Width=\"" + width + "\"";
        generalProps += " Height=\"" + height + "\"";
        generalProps += " Margin=\"" + margin + "\"";

        
        //specific proeprties
        var children = item.children;
        var result = "";
        var specificProps = "";

        //console.log("general properties retireved" + generalProps);

        if(children.length > 1) {
            children.forEach(element => {
   
                if (element instanceof Rectangle) {
                    specificProps += createtShape("Rectangle", element);
                }
                else if (element instanceof Ellipse) {
                    //console.log(element);
                    specificProps += createtShape("Ellipse", element);
                }
                else if (element instanceof Polygon) {
                    specificProps += createtShape("Polygon", element);
                }
                else if (element instanceof Line) {
                    //console.log(element);
                    specificProps += createtShape("Line", element);
                }
                else if (element instanceof Text) {
                    specificProps += getControlTextProperties(type, element);
                    //console.log("text proeprties retrieved: prop= " + specificProps);
                }
                else if (element instanceof Path) {
                    //console.log("Path:" + element.name);
                    if (element.name != "Footprint") {
                        specificProps += " Background=\"#" + element.fill.value.toString(16) + "\"";
                        //console.log("Path:" + specificProps);

                    }
                }
              
                //props += prop;
                //console.log(props);
            });
            //result += props + "\n";
            //console.log("iteraing throug hchildren finished:" + specificProps);

        }
        else{
            //return "";
            //console.log("item has no children");
        }
    
    
        // switch (type) {
        //     case "Button":
        //         props += getButtonProperties(item);
        //         break;
        //     case "CheckBox":
        //         props += getCheckBoxProperties(item);
        //         break;
            
        //     default:
        //         break;
        // }
        result = ele + " " + generalProps + specificProps + "/>";
        //console.log(result);
        //console.log(specificProps);

        return result;
    }
}

function getControlType(item) {
    var name = item.name;
    if(name.includes("Button") && !name.includes("Radio")) return "Button";
    else if(name.includes("CheckBox") || name.includes("Check Box")) return "CheckBox";
    else if(name.includes("RadioButton") || name.includes("Radio Button")) return "RadioButton";
}

function getControlTextProperties(tag, item) {
    //console.log("getting text property of: " + tag);
    var prop = "";
    //console.log(prop);
    var txt = item.text;
    prop += " Content=\"" + txt + "\"";
    prop += " Foreground=\"#" + item.fill.value.toString(16) + "\"";
    prop += " FontSize=\"" + item.fontSize + "\"";

    //console.log(prop);

    return prop;


    switch (tag) {
        case "Button":
            return prop;
        case "CheckBox":
            return prop;
        default:
            return "";
    }
}


// function getButtonProperties(item) {
//     var children = item.children;
//     var result = "";
//     var prop = "";

//     if(children.length > 1) {
//         console.log("item has many children");
//         children.forEach(element => {
//             console.log(element.name + "....");

//             if (element instanceof Rectangle) {
//                 prop = createtShape("Rectangle", element);
//             }
//             else if (element instanceof Ellipse) {
//                 //console.log(element);
//                 prop = createtShape("Ellipse", element);
//             }
//             else if (element instanceof Polygon) {
//                 prop = createtShape("Polygon", element);
//             }
//             else if (element instanceof Line) {
//                 //console.log(element);
//                 prop = createtShape("Line", element);
//             }
//             else if (element instanceof Text) {
//                 var txt = element.text;
//                 prop = " Content=\"" + txt + "\"";
//                 prop += " Foreground=\"#" + element.fill.value.toString(16) + "\"";
//                 prop += " FontSize=\"" + element.fontSize + "\"";
//             }
//             else if (element instanceof Path) {
//                 prop = " Background=\"#" + element.fill.value.toString(16) + "\"";
//             }

//             else if (element instanceof Group) {
//                 prop = createControl(element);
//             }

          
//             result += prop;
//         });
//         return result + "\n";
//     }
//     else{
//         return "";
//         console.log("item has no children");
//     }

// }

function getMargin(item) {
    var x = item.globalDrawBounds.x;
    var y = item.globalDrawBounds.y;
    return x.toString() +","+ y.toString() + ",0,0";
}

module.exports = {
    CreateControl: createControl,
};

