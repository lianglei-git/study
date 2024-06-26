import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import * as cornerstone from "@cornerstonejs/core";
import dicomParser from "dicom-parser/dist/dicomParser.min";

cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
cornerstoneDICOMImageLoader.external["dicomParser"] = dicomParser;
var config = {
  maxWebWorkers: navigator.hardwareConcurrency || 1,
  startWebWorkersOnDemand: true,
  taskConfiguration: {
    decodeTask: {
      initializeCodecsOnStartup: true, //默认情况下web worker 不会在启动时初始化图片解码器，如果希望开启设置为:true
    },
  },
};
cornerstoneDICOMImageLoader.webWorkerManager.initialize(config);

const canvas = document.createElement("canvas");
canvas.width = canvas.height = 512;
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

const Normal = (file) => {
  const fileReader = new FileReader();

  fileReader.onload = (e) => {
    const dicomPart10AsArrayBuffer = e.target.result as ArrayBuffer;
    var set = dicomParser.parseDicom(new Uint8Array(dicomPart10AsArrayBuffer));
    var pixelDataElement = set.elements.x7fe00010;
    var pixelData = new Uint16Array(
      set.byteArray.buffer,
      pixelDataElement.dataOffset,
      pixelDataElement.length / 2
    );
    console.log("pixelData", pixelData);
  };

  fileReader.onerror = console.error;
  fileReader.readAsArrayBuffer(file);
};

((window as any).root as HTMLInputElement).addEventListener(
  "change",
  function (e: any) {
    // Add the file to the cornerstoneFileImageLoader and get unique
    // number for that file
    const file = e.target.files[0];
    Normal(file);
    return;
    const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
    cornerstoneDICOMImageLoader.wadouri
      .loadImage(imageId)
      .promise.then((res) => {
        canvas.width = canvas.height = res.height;
        const imagedata = new ImageData(res.width, res.height);
        const pixelData = res.getPixelData();
        console.log("pixelData", pixelData);
        for (let k = 0, i = 0; k < pixelData.length; k++, i += 4) {
          if (pixelData[k] == -2000) {
            imagedata.data[i] = 255;
            imagedata.data[i + 1] = 0;
            imagedata.data[i + 2] = 0;
            imagedata.data[i + 3] = 255;
            continue;
          }
          imagedata.data[i] = 0;
          imagedata.data[i + 1] = pixelData[k] * 0.124;
          imagedata.data[i + 2] = 0;
          imagedata.data[i + 3] = 255;
        }
        ctx?.putImageData(imagedata, 0, 0);
      });
  }
);
