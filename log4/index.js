const log4js = require("log4js");
const  util = require('util');
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "all" } },
});

const logger = log4js.getLogger("cheese");
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");
// logger.log('9999999999')

// logger.log(logger);
// logger.log();
const demo = [{name: 'Nikos'}, () => () => () => 10,  32, 'ball', [Promise.resolve('10'),  /** Symbol('92'), */ new Set([{kiss: false}])], BigInt(10), Array(Array([]))]
debugger
logger.log(...demo);

// logger.log(null)
// logger.log(undefined)
// logger.log(() => [])

// const fs = require('fs')

// fs.writeFile('./a.log', util.format(...demo, logger), () => {})
// process.exit(0)

