// const http = require('http');
const { fork } = require('child_process');
const { join } = require('path');
const CommonServer = require('./commonServer');
const childs = {
    pidIdx: 3000,
    list: []
};
function mountedCal(type) {
    if (type == 'run') {
        let c = fork(join(__dirname, './commonServer'));
        childs.pidIdx++;
        childs.list.push({
            [childs.pidIdx]: c
        });
        c.send(childs);
        c.on('message', (type) => {
           type == 'openNew' && mountedCal('run')
        })
        c.on('error', err => {
            console.log(err);
        })
    }

}
new CommonServer({
    port: childs.pidIdx,
    childs,
    mountedCal
});