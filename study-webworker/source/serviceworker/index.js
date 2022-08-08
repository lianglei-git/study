import('./_.js');
import {
    createApp,
    onBeforeUnmount
} from 'vue';

// 
// import('./private/orther.vue').then(res => {
//     console.log(res);
// })

const app = {
    template: `
        <b id="title">Service Worker</b>
        <div id="main">
            <button @click="getImg">请求一张图片</button>
        </div>
        <img src="/source/serviceworker/img/long.png" />
    `,
    setup() {
        const getImg = () => {
            // http://127.0.0.1:8080
            fetch('/source/serviceworker/img/long.png')
            .then(res => {
                return res.blob();
            }).then(r => {
                const blobToBase64 = (blob) => {
                    return new Promise((resolve, reject) => {
                        const fileReader = new FileReader();
                        fileReader.onload = (e) => {
                            resolve(e.target.result);
                        };
                        fileReader.readAsDataURL(blob);
                        fileReader.onerror = () => {
                            reject(new Error('blobToBase64 error'));
                        };
                    });
                }
                blobToBase64(r).then(r => {
                    const img = document.createElement('img');
                    img.src = r;
                    main.append(img);
                })
            })
        }
        return {
            getImg
        }
    }
}



export default () => {
    return createApp(app);
};