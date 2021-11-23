const {Path, Text, Rectangle, Ellipse, Line, Polygon, Group, SymbolInstance} = require("scenegraph");
const {GenerateShape} = require("./HtmlShape.js");
const {GenerateAttributes, GetColors, GetCornerRadii, } = require("./Common.js");
const {GenerateStyle} = require("./Common.js");
const {CreateText} = require("./Text.js");
const { GetTextStyle, GetTextColor } = require("./styles.js");


function createControl(item, tab) {
   
    if (item != null) {
        tab += "\t";

        var type = getControlType(item);
        var itemName = item.name.toLowerCase().split(" ").join("");
        console.log("16 creating control: " + item.constructor.name + " type: " + type + " name: " + itemName );
        if (itemName.includes("hyperlink")) return createHyperlink(item);
        else if(itemName.includes("accentbutton") ) return createButton(item);
        else if(itemName.includes("radiobuttongroup") ) return createRadioButtons(item);
        else if(itemName.includes("combobox") ) return createSelect(item);
        else if(itemName.includes("button") ) return createButton(item);
        else if(itemName.includes("pageheader")) return CreatePageHeader(item);
        else if(itemName.includes("navbar")) return CreateNavbar(item, tab);
        else if(itemName.includes("-card")) return CreateCard(item, tab);

        var style = getStyle(item);
        var attrib = getAttributes(item);
        var generalProps = " ";
        var text = "";
        var result = "";
        var content = "";

        if (IsLayout(type)) {
            result = type + ">";
            var children = item.children;
            if(children.length > 1) {
                children.forEach(function (element, i) {
                    content += "\n";
                    
                    if (element instanceof Rectangle) {
                        content += GenerateShape("rect", element);
                    }
                    else if (element instanceof Ellipse) {
                        content += GenerateShape("ellipse", element);
                    }
                    else if (element instanceof Polygon) {
                        content += GenerateShape("polygon", element);
                    }
                    else if (element instanceof Line) {
                        content += tab + "\t\t\t" + GenerateShape("line", element);
                    }
                    else if (element instanceof Text) {
                        content += tab + "\t\t\t" + createTextBlock(element);
                    }
                    else if (element instanceof Path) {
                        if (element.name != "Footprint") {
                            content += getControlPathProperties(element, type);
                        }
                    }
                    else if (element instanceof Group) {
                        specificProps += getControlPropertiesFromGroup(element, type);
                    }
                 
                });
   
            }
            else{
            }

            style += generalProps + "\"";
            result = ele + " " + style + ">";
            result += content + "\n\t\t" + tab + "</" + type + ">\n";
        } 
        else if (isGroupControl(type)){
            style += getControlSpecificProperties(type, item);
            content = getControlChildren(item);
            result = "<" + type + " " + style + " >\n" + content + "\n\t\t" + tab + "</" + type + ">";
        }
        else {
            //getting specific proeprties
            var specificProps = "";
            if(item.children.length > 1) {
                item.children.forEach(function (element, i) {
                    if (element instanceof Rectangle && element.name != "Footprint") {
                        specificProps += GenerateShape("rect", element);
                    }
                    else if (element instanceof Ellipse) {
                        specificProps += GenerateShape("ellipse", element);
                    }
                    else if (element instanceof Polygon) {
                        specificProps += GenerateShape("polygon", element);
                    }
                    else if (element instanceof Line) {
                        specificProps += GenerateShape("line", element);
                    }
                    else if (element instanceof Text) {
                        text += element.text;
                    }
                    else if (element instanceof Path) {
                        if (element.name != "Footprint" || type == "AppBarButton") {
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
        }
   
        return result;
    }
}

function getControlType(item) {
    var name = item.name.toLowerCase().split(" ").join("");
    if(name.includes("hyperlinkbutton")) return "Hyperlink";
    else if(name.includes("appbarbutton") || name.includes("Command Bar / _Elements / List Item / Icon + Text")) return "AppBarButton";
    else if(name.includes("checkbox")) return "CheckBox";
    else if(name.includes("radiobuttons") && !name.includes("Group")) return "RadioButton";
    else if(name.includes("radiobuttongroup")) return "RadioButtons";
    else if(name.includes("textbox")) return "TextBox";
    else if(name.includes("combobox")) return "ComboBox";
    else if(name.includes("rating")) return "RatingControl";
    else if(name.includes("slider")) return "Slider";
    else if(name.includes("toggleswitch") || name.includes("switch")) return "ToggleSwitch";
    else if(name.includes("pagetitle")) return "Custome";
    else if(name.includes("pagetitle")) return "Custome";
    else if(name.includes("button") || name.includes("accentbutton")) return "Button";
    else if(name.includes("pageheader")) return "PageHeader";
    else if(name.includes("navbar")) return "Navbar";
    else return "unknown";
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

    var conditions = ["Base", "Track"];

    if (conditions.some(el => pathName.includes(el)) || tag == "AppBarButton") {
        prop += " background-color: #" + item.fill.value.toString(16).slice(2) + ";";
    }

    else if(pathName.includes("Indicator")) prop += " color: #" + item.fill.value.toString(16).slice(2) + ";";
    else if(pathName.includes("Outer Ellipse")) prop += "";
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
    var conditions = ["pagetitle", "custome"];
    if (conditions.some(e => typ.includes(e))) return true;
    else return false;
}

function createTextBlock(item, tab) {
    var txt = item.text;
    var style = "style=\"" + GenerateStyle(item) + GetTextColor(item) + GetTextStyle(item) + "\"" ;
    var textStyle = "";
    var attrib = GenerateAttributes(item);
    return "<span " + attrib + " " + style +">" + txt + "</span>";
}

function getControlSpecificProperties(type, item) {
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
    var x = item.boundsInParent.x;
    var y = item.boundsInParent.y;

    return " margin-left:" + x.toString() + "px;" + " margin-top: " + y.toString() + "px;";
}

function getRelativeMargin(item) {
    var parentX = item.parent.localBounds.x;
    var parentY = item.parent.localBounds.y;
    var x = item.boundsInParent.x - parentX;
    var y = item.boundsInParent.y - parentY;

    return " margin-left:" + x.toString() + "px; margin-top: " + y.toString() + "px;";
}

function createHtmlControl(type, attrib, props, style, text) {
    switch (type) {
        case "CheckBox":
            return "<input type=\"checkbox\" " + attrib + " " + style + " >" + text;
        case "RadioButton":
            return "<input type=\"radio\" " + attrib + " " + style + " >" + text ;
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

function createRadioButtons(item) {
    var attributes = GenerateAttributes(item);
    var style = " style=\"" + GenerateStyle(item);

    var control = "<div class=\"form-check\"";
    var content = "";
    var header = "\n\t";

    if(item.children.length > 1) {
        item.children.forEach(function (element, i) {
            if (element instanceof Text) {
                header = "<label>" + element.text + "</label>";
            }
            else if (element instanceof Path) {
                if (element.name != "Footprint" || type == "AppBarButton") {
                    specificProps += getControlPathProperties(element, type);
                }
            }
            else if (element instanceof Group) {
                content += '\n\t<div class="form-check">';
                content += '\n\t\t<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">';
                content += '\n\t\t<label class="form-check-label" for="flexRadioDefault1">' + element.children.at(1).text + '</label>';
                content += '\n\t</div>';
            }
        });
    }

    return control + attributes + style + '">' + header + content + '\n</div>';
}

function createSelect(ele) {

    var header = "";

    var attributes = GenerateAttributes(ele);
    var style = " style=\"" + GenerateStyle(ele, "Select");

    if(ele.children.count == 4){
        var title = ele.children.at(3);
        header = "<label" + GenerateAttributes(title) + GenerateStyle(title) + ">" + title.text + "</label>\n";
    }

    var control = "<div>";
    control += "\n\t" + header; 
    control += '\n\t<select class="form-select" aria-label="Default select example"';
    var content = '\t\t<Option value="1"></Option>';
    return control + attributes  + style + '\" >' + "\n" + content + '\n\t</select>\n</div>';
}

function createButton(item) {
    var label = item.children.at(1).text;
    var labelColor = "color:" + GetColors(item.children.at(1));
    var colors = "background-color:" + GetColors(item.children.at(0));
    var attributes = GenerateAttributes(item);
    var style = " style=\"" + GenerateStyle(item) + labelColor + colors;

    return "<button " + attributes + style + "\">" + label + '</button>';
}

function CreatePageHeader(item) {
    console.log("creating page header");
    var title = item.children.at(0).text;
    var border = item.children.at(1);
    var titleColor = "color:" + GetColors(item.children.at(0));

    var control = "<div>\n";
    control += CreateText(item.children.at(0)) + "\n";
    control += GenerateShape(item.children.at(1)) + "\n";
    control += "</div>";

}
 
function CreateNavbar(item, tab) {
    console.log("409 creating navigation bar");
    var backColor = item.children.at(0).fill.value.toString(16).slice(2);
    var navStyle =" style=\"background-color:#" + backColor + ";";
    navStyle += GenerateStyle(item);
    if(item.children.at(0).cornerRadii != 0) navStyle += GetCornerRadii(item.children.at(0).cornerRadii);
    var forground = item.children.at(1).children.at(0).children.at(1).fill.value.toString(16).slice(2);
    
    var control = "<nav class=\"navbar navbar-expand-lg navbar-light\"" + navStyle +  "\">\n";
    //base
    control += tab + "<div class=\"container-fluid\">\n";
    //var end = tab + "</div>\n</nav>";
    var internalTab = tab + "\t";

    control += internalTab + "<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n";
    control += internalTab + "\t<span class=\"navbar-toggler-icon\"></span>\n";
    control += internalTab + "</button>\n";


    //menu
    control += internalTab + "<div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n";
    var menu = item.children.at(1);
    control += internalTab + "\t<ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\n";
    var navItems = "";

    console.log("427 menu name: " + menu.constructor.name + " : " + menu.name);
    console.log("428 menu children: " + menu.children.length);
    
    menu.children.forEach(function (element, i) {
        console.log("431 i: " + i);

        // if(i == 0){
        //     navItems += internalTab +"<li class=\"nav-item\">\n";
        //     navItems += internalTab + "\t<a class=\"nav-link active\" aria-current=\"page\" href=\"#\">" + element.children.at(1).text + "</a>\n";
        // }
        if(element.name.endsWith("Dropdown")){
            navItems += internalTab + "\t\t<li class=\"nav-item dropdown\">\n";
            navItems += internalTab + "\t\t\t<a class=\"nav-link dropdown-toggle\" id=\"navbarDropdown\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" href=\"#\">" + element.children.at(1).text + "</a>\n";
            navItems += internalTab + "\t\t\t<ul class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n";
			navItems += internalTab + "\t\t\t\t<li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n";
			navItems += internalTab + "\t\t\t\t<li><hr class=\"dropdown-divider\"></li>\n";
			navItems += internalTab + "\t\t\t\t<li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n";
			navItems += internalTab + "\t\t\t</ul>\n";
        }
        else {
            navItems += internalTab + "\t\t<li class=\"nav-item\">\n";
            navItems += internalTab + "\t\t\t<a class=\"nav-link\" href=\"#\">" + element.children.at(1).text + "</a>\n";
        }
        navItems += internalTab +"\t\t</li>\n";
    });
    control += navItems + internalTab +"\t</ul>\n";

    if(item.children.count == 3){
        control += "<form class=\"d-flex\">\n" +
        "\t<input class=\"form-control me-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\n" +
        "\t<button class=\"btn btn-outline-success\" type=\"submit\">Search</button>\n" +
        "</form>\n";
    }
    control += internalTab + "</div>\n";
    control += tab + "</div>\n";
    control += tab + "</nav>";

    return control;
}

function CreateCard(item, tab) {
    console.log("409 creating card");

    //get card width
    //var style = " style=\"width:" + item.globalDrawBounds.width.toString() + "px;";
    var style = " style=\"" + GenerateStyle(item);


    var control = "<div class=\"card\"" + style + "\">\n";

    var internalTab = tab + "\t";

    control += "\t" + "<div class=\"card-body\">\n";
    

    control += internalTab + "<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n";
    control += internalTab + "\t<span class=\"navbar-toggler-icon\"></span>\n";
    control += internalTab + "</button>\n";

    //menu
    control += internalTab + "<div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n";
    var menu = item.children.at(1);
    control += internalTab + "\t<ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\n";
    var navItems = "";

    console.log("427 menu name: " + menu.constructor.name + " : " + menu.name);
    console.log("428 menu children: " + menu.children.length);
    
    menu.children.forEach(function (element, i) {
        console.log("431 i: " + i);

        // if(i == 0){
        //     navItems += internalTab +"<li class=\"nav-item\">\n";
        //     navItems += internalTab + "\t<a class=\"nav-link active\" aria-current=\"page\" href=\"#\">" + element.children.at(1).text + "</a>\n";
        // }
        if(element.name.endsWith("Dropdown")){
            navItems += internalTab + "\t\t<li class=\"nav-item dropdown\">\n";
            navItems += internalTab + "\t\t\t<a class=\"nav-link dropdown-toggle\" id=\"navbarDropdown\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" href=\"#\">" + element.children.at(1).text + "</a>\n";
            navItems += internalTab + "\t\t\t<ul class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n";
			navItems += internalTab + "\t\t\t\t<li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n";
			navItems += internalTab + "\t\t\t\t<li><hr class=\"dropdown-divider\"></li>\n";
			navItems += internalTab + "\t\t\t\t<li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n";
			navItems += internalTab + "\t\t\t</ul>\n";
        }
        else {
            navItems += internalTab + "\t\t<li class=\"nav-item\">\n";
            navItems += internalTab + "\t\t\t<a class=\"nav-link\" href=\"#\">" + element.children.at(1).text + "</a>\n";
        }
        navItems += internalTab +"\t\t</li>\n";
    });
    control += navItems + internalTab +"\t</ul>\n";

    if(item.children.count == 3){
        control += "<form class=\"d-flex\">\n" +
        "\t<input class=\"form-control me-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\n" +
        "\t<button class=\"btn btn-outline-success\" type=\"submit\">Search</button>\n" +
        "</form>\n";
    }
    control += internalTab + "</div>\n";
    control += "\t" + "</div>\n";
    control += tab + "</div>";

    return control;
}


module.exports = {
    CreateControl: createControl,
    CreateTextBlock: createTextBlock,
    GetControlPathProperties: getControlPathProperties
};

