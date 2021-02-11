const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");
const {CreateShape} = require("./HtmlShape.js")
//const {getElement} = require("./HtmlType.js")

function createControl(item) {
   
    if (item != null) {
        var type = getControlType(item);
        console.log("creating control: " + type );
        if (type.toLowerCase().includes("hyperlink")) return createHyperlink(item);
        //else if (type == "unknown") return createUnknowControl(item);

        //var result = "";
        //var ele = "";
        var style = getStyle(item);
        var attrib = getAttributes(item);
        var generalProps = " ";
        //var  margin = "0";
        // if(item.parent instanceof Group) margin = getRelativeMargin(item);
        // var width = item.globalDrawBounds.width;
        // var height = item.globalDrawBounds.height;
        var text = "";
        //var eleProps = "";

        // general properties
        //var id = " id=\"" + item.name + "\"";
        //ele = "<" + type + " id=\"" + item.name + "\"";
        // generalProps += " width: " + width + "px;";
        // generalProps += " height: " + height + "px;";
        // generalProps += " margin: " + margin + "px;";

        // if (type == "RatingControl") {
        //     ele + " " + generalProps + "/>";
        // }
        var result = "";
        //var specificProps = "";

        if (IsLayout(type)) {
            console.log(" generating specific proeprties and content for Layout: " + item.name);

            result = type + ">";
            var children = item.children;
            var content = "";
            if(children.length > 1) {
                children.forEach(function (element, i) {
                    console.log("Layout Child Control" + i + " : " + element.constructor.name);
                    content += "\n";
                    
                    if (element instanceof Rectangle) {
                        content += CreateShape("rect", element);
                    }
                    else if (element instanceof Ellipse) {
                        //console.log(element);
                        content += CreateShape("ellipse", element);
                    }
                    else if (element instanceof Polygon) {
                        content += CreateShape("polygon", element);
                    }
                    else if (element instanceof Line) {
                        //console.log(element);
                        content += "\t\t\t" + CreateShape("line", element);
                    }
                    else if (element instanceof Text) {
                        content += "\t\t\t" + createTextBlock(element);
                        //console.log("text proeprties retrieved: prop= " + specificProps);
                    }
                    else if (element instanceof Path) {
                        //console.log("Path:" + element.name);
                        if (element.name != "Footprint") {
                            //specificProps += " Background=\"#" + element.fill.value.toString(16) + "\"";
                            content += getControlPathProperties(element, type);
                            console.log(element.name + " : " + content);
                        }
                    }
                    else if (element instanceof Group) {
                        specificProps += getControlPropertiesFromGroup(element, type);
                        console.log("Group proeprties retrieved: prop= " + specificProps);
                    }
                 
                    //console.log(props);
                });
                //console.log("iteraing throug hchildren finished:" + specificProps);
    
            }
            else{
                //console.log("item has no children");
            }

            style += generalProps + specificProps + "\"";
            
            result = ele + " " + style + ">";
            result += content + "\n\t\t</" + type + ">\n";

        } 
        else if (isGroupControl(type)){
            //getting specific proeprties
            //result = getControlSpecificProperties(item);
            style += getControlSpecificProperties(type, item);

            //style += generalProps + specificProps + "\"";
            var content = getControlChildren(item);

            // result = "<" + type + " " + style + " >";
            // result += content + "\n\t\t</" + type + ">";

            result = "<" + type + " " + style + " >\n" + content + "\n\t\t</" + type + ">";
      
        }
        else {
            //getting specific proeprties
            var specificProps = "";
            var children = item.children;

            if(children.length > 1) {
                children.forEach(function (element, i) {
                    
                    if (element instanceof Rectangle && element.name != "Footprint") {
                        specificProps += CreateShape("rect", element);
                    }
                    else if (element instanceof Ellipse) {
                        specificProps += CreateShape("ellipse", element);
                    }
                    else if (element instanceof Polygon) {
                        specificProps += CreateShape("polygon", element);
                    }
                    else if (element instanceof Line) {
                        specificProps += CreateShape("line", element);
                    }
                    else if (element instanceof Text) {
                        //text += getControlTextProperties(type, element);
                        text += element.text;
                    }
                    else if (element instanceof Path) {
                        if (element.name != "Footprint" || type == "AppBarButton") {
                            //specificProps += " Background=\"#" + element.fill.value.toString(16) + "\"";
                            specificProps += getControlPathProperties(element, type);
                        }
                    }
                    else if (element instanceof Group) {
                        specificProps += getControlPropertiesFromGroup(element, type);
                    }
                 
                });
    
            }
            else{
                if (type == "HyperlinkButton") {
                    specificProps += getControlTextProperties(type, item);
                }
            }

            style += generalProps + specificProps + "\"";

            result = createHtmlControl(type, attrib, "", style, text);

            //result = "<" + type + " " + id + style + " >" + text + "</" + type + ">";

        }
   
        console.log("control created: " + type);
        return result;
    }
}

function getControlType(item) {
    var name = item.name.toLowerCase().split(" ").join("");
    if(name.includes("hyperlinkbutton")) return "Hyperlink";
    else if(name.includes("appbarbutton") || name.includes("Command Bar / _Elements / List Item / Icon + Text")) return "AppBarButton";
    else if(name.includes("button") && !name.includes("radio")) return "Button";
    else if(name.includes("checkbox")) return "CheckBox";
    else if(name.includes("radiobuttons") && !name.includes("Group")) return "RadioButton";
    else if(name.includes("radiobuttongroup")) return "RadioButtons";
    else if(name.includes("textbox")) return "TextBox";
    else if(name.includes("combobox")) return "ComboBox";
    else if(name.includes("rating")) return "RatingControl";
    else if(name.includes("slider")) return "Slider";
    else if(name.includes("toggleswitch") || name.includes("switch")) return "ToggleSwitch";
    else if(name.includes("pagetitle")) return "Custome";

    else return "unknown";
}

function getControlTextProperties(tag, item) {
    //console.log("getting text property of: " + tag);
    var prop = "";
    var txt = item.text;
    console.log("item " + item.name  + " text is: " + txt );

    if(txt.includes("header") || item.name.includes("header")) {
        prop += " Header=\"" + txt + "\"";
        //console.log("header if chosen");
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
        console.log(prop);
        prop += " Content=\"" + txt + "\"";
        prop += " color: #" + item.fill.value.toString(16) + ";";
        prop += " font-size: " + item.fontSize + ";";
    }
    else if(tag == "HyperlinkButton") {
        console.log(prop);
        prop += " Content=\"" + txt + "\"";
        prop += " color: #" + item.fill.value.toString(16) + ";";
        prop += " font-size: " + item.fontSize + ";";
    }


    return prop;
}

// function getControlShapeProperties(item) {

//     //hyperlink button
//     return "";
// }

function getControlPathProperties(item, tag) {
    var prop = "";
    var pathName = item.name;

    var conditions = ["Base", "Track"];

    if (conditions.some(el => pathName.includes(el)) || tag == "AppBarButton") {
        prop += " background-color: #" + item.fill.value.toString(16).slice(2) + ";";
    }

    //if(pathName.includes("Base")) prop += " Background=\"#" + item.fill.value.toString(16) + "\"";
    else if(pathName.includes("Indicator")) prop += " color: #" + item.fill.value.toString(16).slice(2) + ";";
    //else if(pathName.includes("Track")) prop += " Background=\"#" + item.fill.value.toString(16) + "\"";
    else if(pathName.includes("Outer Ellipse")) prop += "";
    //else if(pathName.includes("Outer Ellipse")) prop += "";
    //else if(pathName.includes("Toggle")) prop += " Background=\"#" + item.fill.value.toString(16) + "\"";
    return prop;
}

function getControlPropertiesFromGroup(item, tag) {
    //slider
    var props = "";
    item.children.forEach(ele => {
        if (ele instanceof Path) {
            if (ele.name != "Footprint") {
                props += getControlPathProperties(ele, tag);
            }
        }
        else if (ele instanceof Text) {
            props += getControlTextProperties(tag, ele);
        }
        else if (ele instanceof Group) {
            props += getControlPropertiesFromGroup(ele, tag)
        }
    });

    return props;
}

function IsLayout(type) {
    if (type == "div") {
        return true;
    } else {
        return false;
    }
}

function isGroupControl(type) {
    var typ = type.toLowerCase().split(" ").join("");
    var conditions = ["radiobuttons", "pagetitle", "custome"];
    if (conditions.some(e => typ.includes(e))) return true;
    else return false;
}

function createTextBlock(item) {
    var txt = item.text;

    //var style = " style=\"";
    var style = getStyle(item);
    //var result = "";
    //var generalProps = "";
    var attrib = getAttributes(item);
    // var  margin = "";
    // if(item.parent instanceof Group || item.parent instanceof SymbolInstance) margin = getRelativeMargin(item);
    // else margin = getMargin(item);

    // var width = item.globalDrawBounds.width;
    // var height = item.globalDrawBounds.height;

    //create element tag
    var ele = "<span id=\"" + item.name + "\"";


    // general properties
    // generalProps += " width:" + width + "px;";
    // generalProps += " height:" + height + "px;";
    // generalProps += margin;
    

    //specific properties
    //var specificProps = "";

    // specificProps += " color: #" + item.fill.value.toString(16).slice(2) + ";";
    // specificProps += " font-size:" + item.fontSize + "px;";

    // style += generalProps + specificProps + "\"";

    //finishing control
    // result = ele + style + ">" + txt + "</span>";

    // return result;

    return "<span " + attrib + " " + style +">" + txt + "</span>";
}

function getControlSpecificProperties(type, item) {
            //getting specific proeprties

            var children = item.children;
            var props = "";

            if(children.length > 1) {
                children.forEach(function (element, i) {
                    if (element instanceof Text && type != "RadioButtons") {
                        props += getControlTextProperties(type, element);
                    }
                });
            }
            else{
            }
            return props;
}

function getControlChildren(item) {
    var result = "\n";
    var children = item.children;
    var content = "\n";
    if(children.length > 1) {
        children.forEach(function (element, i) {
            
            if (element instanceof Group) {
                result += "\t\t\t" + createControl(element) + "\n";
            }
         
        });

    }
    else{
    }
    return result;
}


function getMargin(item) {
    var x = item.localBounds.x;
    var y = item.localBounds.y;

    return " margin-left:" + x.toString() + ";" + " margin-top: " + y.toString() + ";";
}

function getRelativeMargin(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;
    

    return " margin-left:" + x.toString() + " margin-top: " + y.toString() + ";";
}

function createHtmlControl(type, attrib, props, style, text) {
    switch (type) {
        case "CheckBox":
            return "<input type=\"checkbox\" " + attrib + " " + style + " >" + text;
        case "RadioButton":
            return "<input type=\"radio\" " + attrib + " " + style + " >" + text ;
        // case "RadioButton":
        //     return "<input type=\"input\" " + attrib + " " + style + " >" + text;
        case "HyperLink":
            return "<a href=\"\" " + attrib + props + " " + style + " >" + text;
            default:
            return "<" + type + " " + attrib + " " + props + " " + style + " >" + text + "</" + type + ">";
    }
}

function createHyperlink(item) {
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

    return "<a href=\" \"" + attributes + style + ">" + content + "</a>";
}

function getAttributes(item) {
    return "id=\"" + item.name + "\"";
}

function getStyle(item) {
    var style = "style=\"";
    var  margin = "";
    if(item.parent instanceof Group) margin = getRelativeMargin(item);
    else margin = getMargin(item);
    style += " width:" + item.globalDrawBounds.width + "px;";
    style += " height:" + item.globalDrawBounds.height + "px;";
    style += margin;

    if (item.fill != undefined) style += "color: #" + item.fill.value.toString(16).slice(2) + ";";
    if(item instanceof Text) style += "font-size:" + item.fontSize + "px;";

    return style + "\"";

}

 
module.exports = {
    CreateControl: createControl,
    CreateTextBlock: createTextBlock
};

