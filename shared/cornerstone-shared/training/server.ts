
import {readFile} from "fs"

readFile("/Users/sparrow/Downloads/2018176250_20240429143401/817/3126/356683.dcm",(err,buffer) => {
    console.log(err, buffer);
})

// /Users/sparrow/Downloads/cornerstone3D-main/packages/dicomImageLoader/src/imageLoader/wadouri/loadFileRequest.ts
// 它不支持这种
console.log(FileReader)