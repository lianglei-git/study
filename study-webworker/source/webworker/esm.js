const esm_name = Symbol('dispose');

const doRequest = () => {
    globalThis.postMessage("esm_name -> " + esm_name.toString());
    globalThis.postMessage("开始发送请求")
    baiduSearch().then(a => a.json())
    .then((data) => {
        globalThis.postMessage(data)
    })
}

function baiduSearch() {
   return fetch("https://ug.baidu.com/mcp/pc/pcsearch", {
        "headers": {
          "accept": "*/*",
          "accept-language": "zh-CN,zh;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        "referrer": "https://www.baidu.com/s?wd=webworker%20esmodule%20&rsv_spt=1&rsv_iqid=0x88a3b82300264067&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=0&rsv_dl=tb&oq=webworker%2520esmodule&rsv_t=adfaNiih6Mfge%2FaJml9Jkt1qJO%2FRrjed%2FEAcSt8%2FD3qOQwlUBqxd5v%2BfNTv722RDLSaG&rsv_btype=t&inputT=9196&rsv_sug3=20&rsv_pq=f73a7caa0024be36&rsv_sug4=10266",
        "referrerPolicy": "unsafe-url",
        "body": "{\"invoke_info\":{\"pos_1\":[{}],\"pos_2\":[{}],\"pos_3\":[{}]}}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });
}


export {
    esm_name,
    doRequest
}