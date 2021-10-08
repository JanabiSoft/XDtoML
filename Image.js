const ImageFill = require("scenegraph").ImageFill;
const {GetMargin, GetCornerRadii, GenerateStyle} = require("./Common.js");

function generateImage(item, tab) {
    console.log("generating image started: " + item.name);
    tab += "\t";

    var result = "";
    //var props = "";
    var eleStyle = "style=\"";
    var stroke = "";
    var fill;
    //var ext;
    var imageName;

    var content = "";

    if (item != null) {
        if (item.stroke != null) stroke = item.stroke.value.toString(16).slice(2);
        if (item.fill != null) {
            fill = item.fill;
            //var imageType = fill.mimeType;
            var ext = fill.mimeType.substring(6);
            imageName = item.name + "." + ext;
            //fill = item.fill.value.toString(16).slice(2);
        }

        eleStyle += GenerateStyle(item);

        var tag = "img";
        //props += GetCornerRadii(item.cornerRadii);

        //props += GetMargin(item);
        //eleStyle += props;

        if(stroke != undefined){
            eleStyle += " stroke: #" + stroke + ";";
            if(item.storkeWidth != undefined) eleStyle += "stroke-width:"+ item.storkeWidth + "px;";
            else eleStyle += "stroke-width:1px;";
        } 

        eleStyle += "\"";

        result = "<" + tag + " src=\"" + imageName +  "\" " + eleStyle + "/>";
        return result;
    }
}

function generateSVG(item, tab) {
    console.log("generating svg started: " + item.name);
    tab += "\t";

    var result = "";
    var eleStyle = "style=\"";
    var stroke = "";
    var fill;
    var imageName;

    var content = "";

    if (item != null) {
        imageName = item.name + ".svg";

        eleStyle += GenerateStyle(item);

        var tag = "img";

        eleStyle += "\"";

        result = "<" + tag + " src=\"" + imageName +  "\" " + eleStyle + "/>";
        return result;
    }
}


function hyperLink() {
    return "<a ";
}

module.exports = {
    GenerateImage: generateImage,
    GenerateSVG: generateSVG
    
};