import {createApp} from 'vue';

createApp({
    template: `
        <button @click="go_webworker">webworker</button>
        <button @click="go_serviceworker">serviceworker</button>
        <button @click="go_home">home</button>
    `,
    setup() {
        let lastApp = null;
        const func = _module => {
            lastApp = _module.default();
            lastApp.mount('#root')
        }
        const go_webworker = () => {
            lastApp && lastApp.unmount();
            import('./source/webworker/index.js').then(func)
        }
        const go_serviceworker = () => {
            lastApp && lastApp.unmount();
            import('./source/serviceworker/index.js').then(func)
        }
        
        return {
            go_webworker,
            go_serviceworker,
            go_home() {
                history.go(0);
            }
        }
    }
}).mount('#app');
