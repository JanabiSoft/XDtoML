const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");
const {CreateShape} = require("./HtmlShape.js")
//const {getElement} = require("./HtmlType.js")

function createControl(item) {
   
    if (item != null) {
        var type = getControlType(item);

        if (type.toLowerCase().includes("hyperlink")) return createHyperlink(item);

        //console.log("creating Control: " + type);
        var result = "";
        //var ele = "";
        var style = " style=\"";
        var generalProps = " ";
        var  margin = "0";
        if(item.parent instanceof Group) margin = getRelativeMargin(item);
        var width = item.globalDrawBounds.width;
        var height = item.globalDrawBounds.height;
        var text = "";
        //var eleProps = "";

        // general properties
        //console.log("generating Control general properties");
        var id = " id=\"" + item.name + "\"";
        //ele = "<" + type + " id=\"" + item.name + "\"";
        generalProps += " width: " + width + "px;";
        generalProps += " height: " + height + "px;";
        generalProps += " margin: " + margin + "px;";

        // if (type == "RatingControl") {
        //     ele + " " + generalProps + "/>";
        // }
        //if(type == "Button") console.log("general properties for Button" + generalProps);
        //console.log("general properties retireved" + generalProps);
        var result = "";
        var specificProps = "";

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
            console.log(" generating specific proeprties and content for GroupControl: " + type + " : " + item.name);
            var specificProps = getControlSpecificProperties(type, item);

            style += generalProps + specificProps + "\"";
            console.log(" generating content of GroupControl: " + item.name);
            var content = getControlChildren(item);

            result = type + " " + style + " >";
            result += content + "\n\t\t</" + type + ">"
      
        }
        else {
            //getting specific proeprties
            //console.log("generating Specific properties for control: " + item.name);

            var children = item.children;
            //console.log("control has " + children.length + "children");

            if(children.length > 1) {
                children.forEach(function (element, i) {
                    //console.log("Control Child " + i + " is a " + element.constructor.name);
                    
                    if (element instanceof Rectangle && element.name != "Footprint") {
                        specificProps += CreateShape("rect", element);
                    }
                    else if (element instanceof Ellipse) {
                        //console.log(element);
                        specificProps += CreateShape("ellipse", element);
                    }
                    else if (element instanceof Polygon) {
                        specificProps += CreateShape("polygon", element);
                    }
                    else if (element instanceof Line) {
                        //console.log(element);
                        specificProps += CreateShape("line", element);
                    }
                    else if (element instanceof Text) {
                        //text += getControlTextProperties(type, element);
                        //if(type == "Button") console.log("Button text is:" + element.text);
                        text += element.text;
                        //console.log("text proeprties retrieved: prop= " + specificProps);
                    }
                    else if (element instanceof Path) {
                        //console.log("Path:" + element.name);
                        if (element.name != "Footprint" || type == "AppBarButton") {
                            //specificProps += " Background=\"#" + element.fill.value.toString(16) + "\"";
                            specificProps += getControlPathProperties(element, type);
                            if(type == "Button") console.log(element.name + " : " + specificProps);
                        }
                    }
                    else if (element instanceof Group) {
                        specificProps += getControlPropertiesFromGroup(element, type);
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

            style += generalProps + specificProps + "\"";

            result = createHtmlControl(type, id, "", style, text);

            //result = "<" + type + " " + id + style + " >" + text + "</" + type + ">";

        }
   
        //console.log(result);
        //console.log(specificProps);

        return result;
    }
}

function getControlType(item) {
    var name = item.name;
    if(name.includes("HyperlinkButton") || name.includes("Hyperlink Button")) return "Hyperlink";
    else if(name.includes("AppBarButton") || name.includes("Command Bar / _Elements / List Item / Icon + Text")) return "AppBarButton";
    else if(name.includes("Button") && !name.includes("Radio")) return "Button";
    else if(name.includes("CheckBox") || name.includes("Check Box")) return "CheckBox";
    else if(name.includes("RadioButtons") || name.includes("Radio Button") && !name.includes("Group")) return "RadioButton";
    else if(name.includes("RadioButtonGroup") || name.includes("Radio Button Group")) return "RadioButtons";
    else if(name.includes("TextBox") || name.includes("Text Box")) return "TextBox";
    else if(name.includes("ComboBox") || name.match(/Combo Box/i)) return "ComboBox";
    else if(name.includes("Rating")) return "RatingControl";
    else if(name.includes("Slider")) return "Slider";
    else if(name.includes("ToggleSwitch") || name.includes("Switch") || name.includes("Toggle Switch")) return "ToggleSwitch";
    else return "Grid";
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

// function getControlShapeProperties(item) {
//     console.log("getting shapes property of: " +item.name);

//     //hyperlink button
//     return "";
// }

function getControlPathProperties(item, tag) {
    var prop = "";
    //console.log(prop);
    var pathName = item.name;
    //console.log(pathName);

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
            //console.log("Path:" + ele.name);
            if (ele.name != "Footprint") {
                props += getControlPathProperties(ele, tag);
                //console.log(ele.name + " : " + props);
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
    if (type == "RadioButtons") {
        return true;
    } else {
        return false;
    }
}

function createTextBlock(item) {
    //console.log("creating textblock: " + item.name);
    // var tag = item.tag;
    // var prop = "";
    var txt = item.text;

    //console.log("creating Control: " + type);
    var style = " style=\"";
    var result = "";
    var generalProps = "";
    var  margin = "";
    if(item.parent instanceof Group || item.parent instanceof SymbolInstance) margin = getRelativeMargin(item);
    else margin = getMargin(item);

    var width = item.globalDrawBounds.width;
    var height = item.globalDrawBounds.height;

    //create element tag
    var ele = "<span id=\"" + item.name + "\"";


    // general properties
    //console.log("generating TextBlock general properties");
    generalProps += " width:" + width + "px;";
    generalProps += " height:" + height + "px;";
    generalProps += margin;
    

    //specific properties
    var specificProps = "";

    //console.log(specificProps);
    specificProps += " color: #" + item.fill.value.toString(16).slice(2) + ";";
    specificProps += " font-size:" + item.fontSize + "px;";

    //console.log(specificProps);

    style += generalProps + specificProps + "\"";

    //finishing control
    result = ele + style + ">" + txt + "</span>";

    return result;
}

function getControlSpecificProperties(type, item) {
            //getting specific proeprties
            //console.log("generating Control Specific properties for "+ type + " : " + item.name);

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
                //console.log("item has no children");
            }
            return props;
}

function getControlChildren(item) {
    //console.log("getting chilren of control: " + item.name)
    var result = "\n";
    var children = item.children;
    var content = "\n";
    if(children.length > 1) {
        children.forEach(function (element, i) {
            //console.log("Control Child: " + i + " : " + element.constructor.name);
            
            if (element instanceof Group) {
                result += "\t\t\t" + createControl(element) + "\n";
                //console.log("Group proeprties retrieved: prop= " + specificProps);
            }
         
            //console.log(props);
        });
        //console.log("iteraing throug hchildren finished:" + specificProps);

    }
    else{
        //console.log("item has no children");
    }
    return result;
}


function getMargin(item) {
    var x = item.localBounds.x;
    var y = item.localBounds.y;
    //console.log("margins of " + item.name + " is " + x + "," + y);

    return " margin-left:" + x.toString() + " margin-top: " + y.toString() + ";";
}

function getRelativeMargin(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;
    
    //console.log("margins of Layout:" + item.name + " is " + x + "," + y);

    return " margin-left:" + x.toString() + " margin-top: " + y.toString() + ";";
}

function createHtmlControl(type, id, props, style, text) {
    switch (type) {
        case "CheckBox":
            return "<input type=\"checkbox\" " + id + " " + style + " >" + text + "</input>";
        case "RadioButton":
            return "<input type=\"radio\" " + id + " " + style + " >" + text + "</input>";
        case "RadioButton":
            return "<input type=\"input\" " + id + " " + style + " >" + text + "</input>";
        case "HyperLink":
            return "<a href=\"\" " + id + props + " " + style + " >" + text + "</input>";
            default:
            return "<" + type + " " + id + " " + props + " " + style + " >" + text + "</" + type + ">";
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

    return "<a href=\" \">" + attributes + style + ">" + content + "</a>";
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

 
module.exports = {
    CreateControl: createControl,
    CreateTextBlock: createTextBlock
};
