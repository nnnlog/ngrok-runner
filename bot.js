process.env.NTBA_FIX_319 = 1;
const config = require("./config");
const api = require("node-telegram-bot-api");

const bot = new api(config.token, {polling: true});
module.exports = message => {
    bot.sendMessage(config.owner, `<code>${message}</code>`, {
        parse_mode: 'HTML'
    });
};
