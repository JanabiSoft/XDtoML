function getControlType(item) {
    var name = item.name;
    if(name.includes("HyperlinkButton") || name.includes("Hyperlink Button")) return Hyperlink();
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

function hyperLink() {
    return "<a ";
}



module.exports = {
    getElement: getControlType,
    CreateTextBlock: createTextBlock
};
