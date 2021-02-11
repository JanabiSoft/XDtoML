//create complex componente from blazorise framework
const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");


function create(item) {
    console.log("Starting blazorise");

    if (item != null) {
        // var type = getControlType(item);

        // if (type == "Field") return createField(item);
        // else if (type == "Select") return createSelect(item);
        // else if (type == "Slider") return createSlider(item);

        var name = item.name;
        if(name.includes("TextBox") || name.includes("Text Box")) return createField(item);
        else if(name.includes("Combo Box") ) return createSelect(item);
        else if(name.toLowerCase().includes("slider") ) return createSlider(item);
        else if(name.toLowerCase().includes("switch") ) return createSwitch(item);
    
        else return "Grid";
    }
}

// function getControlType(item) {
//     var name = item.name;
//     if(name.includes("TextBox") || name.includes("Text Box")) return "Field";
//     else if(name.includes("Combo Box") ) return "Select";
//     else if(name.toLowerCase().includes("slider") ) return "Slider";
//     else if(name.toLowerCase().includes("switch") ) return "Switch";

//     else return "Grid";
// }

function createField(ele) {

    console.log("creating blazorise field");
    var result = "";
    var style = " style=\"";
    //var generalProps = " ";
    //var  margin = "0";
    // if(ele.parent instanceof Group) margin = getRelativeMargin(item);
    // var width = item.globalDrawBounds.width;
    // var height = item.globalDrawBounds.height;
    var text = "";
    var name = ele.name;
    var content = "";

    // attributes
    var attributes = generateAttributes(ele);

    //style
    style += generateStyle(ele, "Field");


    //content
    //var type = getControlType(ele);

    console.log(" generating content for Field");

    //result = type + ">";
    //getting specific proeprties
    console.log("extracting style for control: " + ele.name);

    var children = ele.children;
    console.log("control has " + children.length + "children");

    if(children.length > 1) {
        children.forEach(function (element, i) {
            console.log("Control Child " + i + " is a " + element.constructor.name);
            
            // if (element instanceof Rectangle && element.name != "Footprint") {
            //     content += CreateShape("rect", element);
            // }
            // else if (element instanceof Ellipse) {
            //     //console.log(element);
            //     content += CreateShape("ellipse", element);
            // }
            // else if (element instanceof Polygon) {
            //     content += CreateShape("polygon", element);
            // }
            // else if (element instanceof Line) {
            //     //console.log(element);
            //     content += CreateShape("line", element);
            // }
            if (element instanceof Text) {
                if(element.name.includes("header")) content += "\n\t<FieldLabel>" + element.text + "</FieldLabel>";
                if (element.name.toLowerCase().includes("hint")) content += "\n\t<TextEdit Placeholder=\"" + element.name + "\"/>";
            }
            else if (element instanceof Path) {
                //console.log("Path:" + element.name);
                if (element.name != "Footprint" || type == "AppBarButton") {
                    specificProps += getControlPathProperties(element, type);
                    if(type == "Button") console.log(element.name + " : " + specificProps);
                }
            }
            else if (element instanceof Group) {
                style += extractStyleFromContent(element, "Field");
                //console.log("Group proeprties retrieved: prop= " + specificProps);
            }
         
            //console.log(props);
        });
        //console.log("iteraing throug hchildren finished:" + specificProps);

    }
    else{
        if (type == "HyperlinkButton") {
            specificProps += getControlTextProperties(type, item);
        }
    }

    //style += generalProps + specificProps + "\"";

    //result = finishControl(type, id, "", style, text);
    result = "<Field " + attributes  + style + "\" >" + "\n" + content + "\n\t</Field>";

        //result = "<" + type + " " + id + style + " >" + text + "</" + type + ">";
    //console.log(result);
    //console.log(specificProps);

    return result;
}

function createSelect(ele) {

    var result = "";
    var style = " style=\"";
    var text = "";
    var name = ele.name;
    var content = "";

    // attributes
    var attributes = generateAttributes(ele);

    //style
    style += generateStyle(ele, "Select");

    //content
    var children = ele.children;
    console.log("control has " + children.length + "children");

    if(children.length > 1) {
        children.forEach(function (element, i) {
            if (element instanceof Text) {
                //if(element.name.includes.toLowerCase().includes("header")) content += "\n\t<FieldLabel>" + element.text + "</FieldLabel>";
                //if (element.name.toLowerCase().includes("selected list item")) content += "\n\t<TextEdit Placeholder=\"" + element.name + "\"/>";
            }
            else if (element instanceof Path) {
                if (element.name != "Footprint" || type == "AppBarButton") {
                    specificProps += getControlPathProperties(element, type);
                    if(type == "Button") console.log(element.name + " : " + specificProps);
                }
            }
            else if (element instanceof Group) {
                if(!element.name.toLowerCase().includes("chevron")) style += extractStyleFromContent(element, "Field");
            }
        });
    }
    else{
        if (type == "HyperlinkButton") {
            specificProps += getControlTextProperties(type, item);
        }
    }

    result = "<Select " + attributes  + style + "\" >" + "\n" + content + "\n\t</Select>";
    return result;
}

function createSlider(ele) {

    var result = "";
    var name = ele.name;

    // attributes
    var attributes = generateAttributes(ele);

    //style
    var style = " style=\"" + generateStyle(ele, "Select");

    //content
    var content = "";


    if(ele.children.length > 1) {
        ele.children.forEach(function (element, i) {
            if (element instanceof Text) {
                //if(element.name.includes.toLowerCase().includes("header")) content += "\n\t<FieldLabel>" + element.text + "</FieldLabel>";
                //if (element.name.toLowerCase().includes("selected list item")) content += "\n\t<TextEdit Placeholder=\"" + element.name + "\"/>";
            }
            else if (element instanceof Group) {
                //style += extractStyleFromContent(element, "Slider");
            }
        });
    }

    return "<Slider " + attributes  + style + "\" />";
}

function createSlider(ele) {

    var result = "";
    var name = ele.name;

    var attributes = generateAttributes(ele);
    var style = " style=\"" + generateStyle(ele, "Select");
    var content = "";

    if(ele.children.length > 1) {
        ele.children.forEach(function (element, i) {
            if (element instanceof Text) {
                //if(element.name.includes.toLowerCase().includes("header")) content += "\n\t<FieldLabel>" + element.text + "</FieldLabel>";
                //if (element.name.toLowerCase().includes("selected list item")) content += "\n\t<TextEdit Placeholder=\"" + element.name + "\"/>";
            }
            else if (element instanceof Path) {
                if (element.name != "Footprint" || type == "AppBarButton") {
                    specificProps += getControlPathProperties(element, type);
                    if(type == "Button") console.log(element.name + " : " + specificProps);
                }
            }
            else if (element instanceof Group) {
                //style += extractStyleFromContent(element, "Slider");
            }
        });
    }

    return "<Slider " + attributes  + style + "\" />";
}

function generateAttributes(ele) {
    var id = " id=\"" + ele.name + "\"";
    return id;
}

function generateStyle(ele, type) {
    console.log("generating style for" + ele.type);
    var genProps = " ";
    var width = ele.globalDrawBounds.width;
    var height = ele.globalDrawBounds.height;

    genProps += " width: " + width + "px;";
    genProps += " height: " + height + "px;";

    if(ele.parent instanceof Group){
        genProps += " margin: " + getRelativeMargin(item) + "px;";
    }
    return genProps;
}

function IsLayout(type) {
    if (type == "div") {
        return true;
    } else {
        return false;
    }
}

function isGroupControl(type) {
    if (type == "RadioButtons") {
        return true;
    } else {
        return false;
    }
}

function finishControl(type, id, attributes, style, content) {
    switch (type) {
        case "Field":
            return "<Field " + id + attributes + style + " >" + "\n" + content + "\n</Field>";
            default:
            return "<" + type + " " + id + " " + props + " " + style + " >" + text + "</" + type + ">";
    }
}

function getRelativeMargin(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;
    
    //console.log("margins of Layout:" + item.name + " is " + x + "," + y);

    return " margin-left:" + x.toString() + " margin-top: " + y.toString() + ";";
}

function extractStyleFromContent(item, tag) {
    var props = "";
    item.children.forEach(ele => {
        if (ele instanceof Path) {
            //console.log("Path:" + ele.name);
            props += getControlPathProperties(ele, tag);
        }
        else if (ele instanceof Text) {
            props += getControlTextProperties(tag, ele);
        }
        else if (ele instanceof Group) {
            props += extractStyleFromContent(ele, tag);
        }
    });

    return props;
}

function getControlTextProperties(tag, item) {
    //console.log("getting text property of: " + tag);
    var prop = "";
    //console.log(prop);
    var txt = item.text;
    console.log("item " + item.name  + " text is: " + txt );

    if(txt.includes("header") || item.name.includes("header")) {
        prop += " Header=\"" + txt + "\"";
        //console.log("header if chosen");
    }
    else if (txt.includes("Hint") || txt.includes("placeholder")) {
        prop += " PlaceholderText=\"" + txt + "\"";
        //console.log("hint if chosen");
    }
    else if (item.name.includes("Label")) {
        prop += " Label=\"" + txt + "\"";
        //console.log("label if chosen");
    }
    else if (item.name.includes("Icon") && tag == "AppBarButton") {
        prop += " Icon=\"" + "Add" + "\"";
        //console.log("icon if chosen");
    }
    else if (tag == "ComboBox" && item.name == "Selected list item") {
        prop += " PlaceholderText=\"" + txt + "\"";
        //console.log("combobox if chosen");

    }
    else if (tag == "ToggleSwitch" && !txt.includes("header")) {
        if(txt.includes("Off")) prop += " OffContent=\"" + txt + "\"";
        else if(txt.includes("On")) prop += " OnContent=\"" + txt + "\"";
        else prop += " OffContent=\"" + txt + "\"";
        //console.log("toggleswitch if chosen");
    }
    else if(tag == "Button") {
        console.log(prop);
        prop += " Content=\"" + txt + "\"";
        prop += " color: #" + item.fill.value.toString(16) + ";";
        prop += " font-size: " + item.fontSize + ";";
        //console.log("else if chosen");
    }
    else if(tag == "HyperlinkButton") {
        console.log(prop);
        prop += " Content=\"" + txt + "\"";
        prop += " color: #" + item.fill.value.toString(16) + ";";
        prop += " font-size: " + item.fontSize + ";";
        //console.log("else if chosen");
    }


    //console.log(prop);

    return prop;
}

function getControlPathProperties(item, tag) {
    var prop = "";
    //console.log(prop);
    var pathName = item.name;
    //console.log(pathName);

    var conditions = ["Base", "Track", "Frame"];

    if (conditions.some(el => pathName.includes(el)) || tag == "AppBarButton") {
        if(item.fill != undefined) prop += " background-color: #" + item.fill.value.toString(16).slice(2) + ";";
        //if(item.stroke != undefined) prop += " background-color: #" + item.fill.value.toString(16).slice(2) + ";";
    }

    //if(pathName.includes("Base")) prop += " Background=\"#" + item.fill.value.toString(16) + "\"";
    else if(pathName.includes("Indicator")) prop += " color: #" + item.fill.value.toString(16).slice(2) + ";";
    //else if(pathName.includes("Track")) prop += " Background=\"#" + item.fill.value.toString(16) + "\"";
    else if(pathName.includes("Outer Ellipse")) prop += "";
    //else if(pathName.includes("Outer Ellipse")) prop += "";
    //else if(pathName.includes("Toggle")) prop += " Background=\"#" + item.fill.value.toString(16) + "\"";
    return prop;
}



module.exports = {
    CreateBlazorise: create
};

