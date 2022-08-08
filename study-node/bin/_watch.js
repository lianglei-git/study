const {
    spawn
} = require("child_process");
const {
    watchFile, watch
} = require("fs");
const internal = require("stream");
const { Writable,Readable } = require("stream");
let fs = null;

const argv = process.argv[2];

let run = () => {
    // process.stdout.write('restart \n')
    fs && fs.kill();
    console.log('\x1B[33m%s\x1b[0m', 'restart...')

    fs = spawn('node', [argv])
    fs.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    
    fs.stderr.on('data', (data) => {
        console.log(data.toString())
    })
}

run();
const tmp = new Map();

function notSee(key) {
    let v = Reflect.get(tmp, key);
    if(v) {
        Reflect.set(tmp, key, null)
        return {then(){}}
    }
    Reflect.set(tmp, key, 1);
    return Promise.resolve()
}
watch(argv, { recursive: true },(event, filename) => {
    notSee(event, filename).then(() => {
        console.log(`\x1B[34m%s\x1B[39m`, `${event} ${filename}`)
        run()
        console.log('\x1B[34m%s\x1B[39m ' ,'listen file ...  '+ argv )
    })

    // process.stdout.write('listener '+ argv +' file... \n')
})
// watchFile(argv, (current, prev) => {
//     if(current.mtime !== prev.mtime){
//        console.log(999999999)
//     }
// })

console.log(module.parent.filename)

process.stdin.on('data', (buffer) => {
    if(buffer.toString() == 'q\n') {
        process.exit(0)
    }
})
