const ImageFill = require("scenegraph").ImageFill;
const {GetMargin, GetCornerRadii, GenerateStyle} = require("./Common.js");

// function generateImage(item, tab) {
//     console.log("generating image started: " + item.name);
//     tab += "\t";

//     var result = "";
//     //var props = "";
//     var eleStyle = "style=\"";
//     var stroke = "";
//     var fill;
//     //var ext;
//     var imageName;

//     var content = "";

//     if (item != null) {
//         if (item.stroke != null) {
//             stroke = item.stroke.value.toString(16).slice(2);
//         }
//         if (item.fill != null) {
//             fill = item.fill;
//             var ext = fill.mimeType.substring(6);
//             imageName = item.name + "." + ext;
//         }

//         eleStyle += GenerateStyle(item);

//         var tag = "img";

//         if(stroke != undefined){
//             eleStyle += " stroke: #" + stroke + ";";
//             if(item.storkeWidth != undefined) eleStyle += "stroke-width:"+ item.storkeWidth + "px;";
//             else eleStyle += "stroke-width:1px;";
//         } 

//         eleStyle += "\"";

//         result = "<" + tag + " src=\"" + imageName +  "\" " + eleStyle + "/>";
//         return result;
//     }
// }

function generateImage(item, tab) {
    console.log("generating image started: " + item.name);
    tab += "\t";

    var result = "";
    //var props = "";
    //var ext;
    var imageName;

    var content = "";

    if (item != null) {
        var eleStyle = "style=\"";
        var stroke;
        var fill;
        var opacity;

        if (item.stroke != null) {
            stroke = item.stroke.value.toString(16).slice(2);
            eleStyle += " stroke:#" + stroke + ";";
            if(item.storkeWidth != undefined) eleStyle += "stroke-width:"+ item.storkeWidth + "px;";
            else eleStyle += "stroke-width:1px;";
        }
        if (item.fill != null) {
            fill = item.fill;
            var ext = fill.mimeType.substring(6);
            if (ext == "jpeg") ext = "jpg";
            imageName = item.name + "." + ext;
            
            opacity = "opacity:" + item.opacity + ";";
        }

        eleStyle += GenerateStyle(item) + opacity;

        var tag = "img";

        eleStyle += "\"";

        result = "<" + tag + " src=\"" + imageName +  "\" " + eleStyle + "/>";
        console.log("result: " + result);
        return result;
    }
}


function generateSVG(item, tab) {
    console.log("generating svg started: " + item.name);
    tab += "\t";

    var result = "";
    var eleStyle = "style=\"";
    var imageName;

    if (item != null) {
        imageName = item.name + ".svg";
        console.log("image name: " + imageName);

        eleStyle += GenerateStyle(item);

        var tag = "img";

        eleStyle += "\"";

        result = "<" + tag + " src=\"" + imageName +  "\" " + eleStyle + "/>";
        console.log("svg result: " + result);
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