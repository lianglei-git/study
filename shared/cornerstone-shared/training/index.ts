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

const table: any = document.getElementById("table-debug");
const tableTipsEl:any = document.getElementById("tableTips")
table.addTh = (idx,v) => {
  let th = document.createElement("tr")
  let td1 = document.createElement("td")
  let td2 = document.createElement("td")
  td1.innerText = idx;
  td2.innerText = v;
  th.append(td1, td2)
  table?.appendChild(th)
} 




const stack = {
    simple:false,
    data: [],
    len: 1000,
    status: "nil",
    totalTimeStart:0,
    getTotalTime() {
    return ((performance.now() - this.totalTimeStart)/1000).toFixed(3) 
    },
    clear() {
      this.data.length = 0;
      table.innerHTML = "";
      tableTipsEl.innerHTML = "";
    },
    add(idx){
      const lastNowTime = performance.now();
      return () => {
      tableTipsEl.innerHTML = `已经加载完成${this.data.length}个，用时 ${stack.getTotalTime()} 秒`
        const time = (performance.now() - lastNowTime)/1000;
        const v = time.toFixed(3);

        this.data.push(v + "秒")
        table.addTh(idx, v + "秒");
      }
    },
    print() {
      console.log(stack.getTotalTime() + "秒")
      console.table(this.data);
    }
}

// document.getElementById("tools-simple").onchange = e => {
//   console.log(e.target.value)
// }
// document.getElementById("tools-tasks").onchange = e => {
//   if(stack.status == "running"){
//     alert("运行完再说吧")
//     return;
//   }
//   if(isNaN(e.target.value)) {
//     alert("数字啊")
//     return;
//   }
//   stack.len = +e.target.value;
//   console.log(stack.len);
// } 


window.stack = stack;
const render = (file, idx, finishCallback = () => {}) => {
  const callback = stack.add(idx);
  const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
  cornerstoneDICOMImageLoader.wadouri
    .loadImage(imageId)
    .promise.then((res) => {
      callback();
      finishCallback();
      // 解压后结果
      // canvas.width = canvas.height = res.height;
      // const imagedata = new ImageData(res.width, res.height);
      // const pixelData = res.getPixelData();
      // console.log("pixelData", pixelData);
      // for (let k = 0, i = 0; k < pixelData.length; k++, i += 4) {
      //   if (pixelData[k] == -2000) {
      //     imagedata.data[i] = 255;
      //     imagedata.data[i + 1] = 0;
      //     imagedata.data[i + 2] = 0;
      //     imagedata.data[i + 3] = 255;
      //     continue;
      //   }
      //   imagedata.data[i] = 0;
      //   imagedata.data[i + 1] = pixelData[k] * 0.124;
      //   imagedata.data[i + 2] = 0;
      //   imagedata.data[i + 3] = 255;
      // }
      // ctx?.putImageData(imagedata, 0, 0);
    });
}

((window as any).root as HTMLInputElement).addEventListener(
  "change",
  function (e: any) {
    // Add the file to the cornerstoneFileImageLoader and get unique
    // number for that file
    const file = e.target.files[0];
    // Normal(file);
    // return;
    const startTimeDebug = performance.now()
    stack.clear();
    // 
    stack.totalTimeStart = startTimeDebug;
    if(stack.simple) {
      let idx = 0;
      function simpleRender() {
        if(stack.len == idx) return;
        idx++;
        render(file, idx, simpleRender)
      }
      simpleRender();
      
      return;
    }

    for(let k = 0; k < stack.len; k++) {
      render(file, k);
    }
    
  }
);
