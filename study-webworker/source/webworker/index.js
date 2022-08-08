import { createApp, onMounted, ref, defineComponent, reactive, onBeforeMount } from 'vue';
const worker1 = import.meta.url.replace('index', 'worker');
const worker2 = import.meta.url.replace('index', 'workerThread');


const Thread1CMP = defineComponent({
    template: `
        <div id="tp1">
            <span v-for="item in tp1">{{item.message}}</span>
        </div>
    `,
    props: ['tp1'],
})

const Thread2CMP = defineComponent({
    template: `
        <div id="tp2">
            <span v-for="item in tp2">{{item.message}}</span>
        </div>
    `,
    props: ['tp2'],
})

const loggerHook = (fn) => {
    // let now = new Date().getTime();
    // while(new Date().getTime() - now < 5000) {};
    // fn();
    function _log() {
        fn();
        setTimeout(_log, 1000)
    }
    _log();
}



const app = {
    template: ` 
        <b id="title">Web Worker</b>
        <button @click="() => flag = !flag">change</button>
        <button @click="terminateTp1">断开线程1链接</button>
        <div id="main">
            <div id="tp" :class="flag && 'flag'">
            <template v-if="flag">
                <div>
                    <span v-for="item in tp">{{item.branch && item.message}}</span>
                </div>
                <div>
                    <span v-for="item in tp" v-html="!item.branch && item.message || '' "></span>
                </div>
            </template>
            <template v-else>
                 <span v-for="item in tp" v-html="item.message" :class="!item.branch && flag ? 'other': ''"></span>
            </template>
            </div>    
            <Thread1CMP :tp1="tp1"/>
            <Thread2CMP :tp2="tp2"/>
        </div>
    `,
    components: {
        Thread1CMP,
        Thread2CMP
    },
    setup(){
        const count = ref(0);
        const flag = ref(true);
        let terminateTp1 = ref(null)
        const tp = reactive([{message: "主线程", branch: true}]);
        const tp1 = reactive([{message: "线程1"}]);
        const tp2 = reactive([{message: "线程2"}]);
        onMounted(() => {
            loggerHook(() => {
                count.value++;
                tp.push({message: count.value, branch: true})
            })
            window.performance.mark('start1');
            const thread1 = new Worker(worker1, {name: 'parent'});
            let s = false;
            thread1.onmessage = (MessageEvent) => {
                window.performance.mark('end1');
                window.performance.measure('d1', 'start1', 'end1');
                const duration = ~~window.performance.getEntriesByName('d1')[0].duration;
                const data = MessageEvent.data;
                !s && tp1.push({message:'初始化时间为： ' + duration + '毫秒'});
                tp1.push({message: data});
                s = true;
                tp.push({
                    message: '<span style="color: red">线程1信息：'+data+'</span>'
                });

            }
            terminateTp1.value = () => {
                // 断开进程链接
                thread1.terminate();
                tp1.push({message: '断开连接'})
                tp.push({message: '<span style="color: red">线程1断开连接</span>'})
            }

            const thread2 = new Worker(worker2, {type: 'module'});
            thread2.onmessage = ({data}) => {
                tp2.push({message: data});
                tp.push({
                    message: '<span style="color: green">线程2信息：'+data+'</span>'
                })
            }
        })
        return {
            count,
            tp1,
            tp2,
            tp,
            flag,
            terminateTp1
        }
    }
};

export default () => {
    return createApp(app);
};