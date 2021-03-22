const {spawn} = require("child_process");
const path = `${__dirname}/ngrok.log`;

const fs = require("fs");
fs.writeFileSync(path, '');
const Tail = require('tail').Tail;

const bot = require("./bot");

let tail = new Tail(path);

tail.on("line", function (data) {
    console.log(data);
    bot(data);
});

tail.on("error", function (error) {
    console.log('ERROR: ', error);
});

const run = () => {
    console.log(`Start ngrok...`);
    const proc = spawn("ngrok", ["tcp", "3389", `--log=${path}`, "--config=C:\\Users\\Administrator\\.ngrok2\\ngrok.yml"], {
        stdio: 'ignore'
    });

    proc.on('exit', code => {
        console.log(`ngrok exited with ${code}`);
        fs.writeFileSync(path, '');
        //run();
    });
};

run();
