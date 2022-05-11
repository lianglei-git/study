import minimist from 'minimist';
import('process');
const argv = minimist(process.argv.slice(2), {
    '--': true,
})

console.log(argv)