const chalk = require("chalk");
const consola = require("consola");

const logger = {
    startup(message) {
        console.log(chalk.cyan.bold(message));
    },

    success(message) {
        consola.success(chalk.green(message));
    },

    info(message) {
        consola.info(chalk.blue(message));
    },

    warn(message) {
        consola.warn(chalk.yellow(message));
    },

    error(message) {
        consola.error(chalk.red(message));
    },

    line() {
        console.log(chalk.gray("────────────────────────────────────────────"));
    }
};

module.exports = logger;