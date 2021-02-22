//create complex componente from blazorise framework
const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");

function create(item) {

    if (item != null) {

        var name = item.name.toLowerCase().split(" ").join("");
        if(name.includes("textbox")) return createField(item);
        else if(name.includes("combobox") ) return createSelect(item);
        else if(name.includes("slider") ) return createSlider(item);
        else if(name.includes("switch") ) return createSwitch(item);
        else if(name.includes("radiobutton") ) return createRadioButtons(item);
        else return createUnknown(item);
    }
}

function createField(ele) {

    var result = "";
    var style = " style=\"";
    var content = "";

    // attributes
    var attributes = generateAttributes(ele);

    //style
    style += generateStyle(ele, "Field");

    var children = ele.children;

    if(children.length > 1) {
        children.forEach(function (element, i) {
            if (element instanceof Text) {
                if(element.name.includes("header")) content += "\n\t<FieldLabel>" + element.text + "</FieldLabel>";
                if (element.name.toLowerCase().includes("hint")) content += "\n\t<TextEdit Placeholder=\"" + element.name + "\"/>";
            }
            else if (element instanceof Path) {
                if (element.name != "Footprint" || type == "AppBarButton") {
                    specificProps += getControlPathProperties(element, type);
                }
            }
            else if (element instanceof Group) {
                style += extractStyleFromContent(element, "Field");
            }
         
        });

    }
    else{
        if (type == "HyperlinkButton") {
            specificProps += getControlTextProperties(type, item);
        }
    }

    result = "<Field " + attributes  + style + "\" >" + "\n" + content + "\n\t</Field>";
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
            }
            else if (element instanceof Group) {
            }
        });
    }

    return "<Slider TValue=\"string\"" + attributes  + style + "\" />";
}

function createSwitch(ele) {

    var attributes = generateAttributes(ele);
    var style = " style=\"" + generateStyle(ele, "Switch");
    var content = "";

    if(ele.children.length > 1) {
        ele.children.forEach(function (element, i) {
            if (element instanceof Text) {
            }
            else if (element instanceof Path) {
                if (element.name != "Footprint" || type == "AppBarButton") {
                    specificProps += getControlPathProperties(element, type);
                }
            }
            else if (element instanceof Group) {
            }
        });
    }

    return "<Switch TValue=\"bool\"" + attributes  + style + "\">" + content + "</Switch>";
}

function createRadioButtons(item) {
    var result = "";
    var name = item.name;

    var attributes = generateAttributes(item);
    var style = " style=\"" + generateStyle(item, "RadioButtons");
    var content = "";

    if(item.children.length > 1) {
        item.children.forEach(function (element, i) {
            console.log("radio buttons element: " + i + " : " + element.name);
            if (element instanceof Text) {
                attributes += "Name=\"" + element.text + "\"";
            }
            else if (element instanceof Path) {
                if (element.name != "Footprint" || type == "AppBarButton") {
                    specificProps += getControlPathProperties(element, type);
                }
            }
            else if (element instanceof Group) {
                //console.log("radio buttons children counts: " + element.children.count);
                console.log("child1 name: " + element.children.at(0).name);

                content += "\n\t<Radio TValue=\"string\" >" +  element.children.at(1).text +"</Radio>";
            }
        });
    }

    return "<RadioGroup TValue=\"string\"" + attributes  + style + "\">" + content + "</RadioGroup>";
}

function createUnknown(item) {
    var attributes = generateAttributes(item);
    var style = " style=\"" + generateStyle(item);
    var content = "";

    if(item.children.length > 1) {
        item.children.forEach(function (element, i) {
            if (element instanceof Text) {
                if(element.name.includes(("title"))) content += element.text;
            }
        });
    }

    style += "\"";

    return "@*< " + item.type + attributes + style + ">" + content + "</" + item.type + ">*@";
}


function generateAttributes(ele) {
    var id = " id=\"" + ele.name + "\"";
    return id;
}

function generateStyle(item, type) {
    var genProps = " ";
    var width = item.globalDrawBounds.width;
    var height = item.globalDrawBounds.height;

    genProps += " width: " + width + "px;";
    genProps += " height: " + height + "px;";

    if(item.parent instanceof Group){
        genProps += " margin: " + getRelativeMargin(item) + "px;";
    }
    return genProps;
}

function getRelativeMargin(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;
    
    return " margin-left:" + x.toString() + " margin-top: " + y.toString() + ";";
}

function extractStyleFromContent(item, tag) {
    var props = "";
    item.children.forEach(ele => {
        if (ele instanceof Path) {
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
    var prop = "";
    var txt = item.text;

    if(txt.includes("header") || item.name.includes("header")) {
        prop += " Header=\"" + txt + "\"";
    }
    else if (txt.includes("Hint") || txt.includes("placeholder")) {
        prop += " PlaceholderText=\"" + txt + "\"";
    }
    else if (item.name.includes("Label")) {
        prop += " Label=\"" + txt + "\"";
    }
    else if (item.name.includes("Icon") && tag == "AppBarButton") {
        prop += " Icon=\"" + "Add" + "\"";
    }
    else if (tag == "ComboBox" && item.name == "Selected list item") {
        prop += " PlaceholderText=\"" + txt + "\"";

    }
    else if (tag == "ToggleSwitch" && !txt.includes("header")) {
        if(txt.includes("Off")) prop += " OffContent=\"" + txt + "\"";
        else if(txt.includes("On")) prop += " OnContent=\"" + txt + "\"";
        else prop += " OffContent=\"" + txt + "\"";
    }
    else if(tag == "Button") {
        prop += " Content=\"" + txt + "\"";
        prop += " color: #" + item.fill.value.toString(16) + ";";
        prop += " font-size: " + item.fontSize + ";";
    }
    else if(tag == "HyperlinkButton") {
        prop += " Content=\"" + txt + "\"";
        prop += " color: #" + item.fill.value.toString(16) + ";";
        prop += " font-size: " + item.fontSize + ";";
    }

    return prop;
}

function getControlPathProperties(item, tag) {
    var prop = "";
    var pathName = item.name;

    var conditions = ["Base", "Track", "Frame"];

    if (conditions.some(el => pathName.includes(el)) || tag == "AppBarButton") {
        if(item.fill != undefined) prop += " background-color: #" + item.fill.value.toString(16).slice(2) + ";";
    }
    else if(pathName.includes("Indicator")) prop += " color: #" + item.fill.value.toString(16).slice(2) + ";";
    else if(pathName.includes("Outer Ellipse")) prop += "";
    return prop;
}

module.exports = {
    CreateBlazorise: create
};

