const {spawn} = require("child_process");
const path = `${__dirname}/ngrok.log`;

const fs = require("fs");
const Tail = require('tail').Tail;

const bot = require("./bot");

let tail = new Tail(path), running = false;

tail.on("line", function (data) {
    console.log(data);
    bot(data);

    if (!running) {
        running = true;
        setTimeout(run1, 1000);
    }
});

tail.on("error", function (error) {
    console.log('ERROR: ', error);
});

const run = () => {
    fs.writeFileSync(path, '');
    console.log(`Start ngrok...`);
    setTimeout(() => {
        const proc = spawn("ngrok", ["tcp", "22", `--log=${path}`], {
            stdio: 'ignore'
        });

        proc.on('exit', code => {
            console.log(`ngrok exited with ${code}`);
            run();
        });
    }, 1000);

};

run();

const run1 = () => {
    const proc = spawn(`${__dirname}/main`, [], {
        stdio: 'ignore',
    });

    proc.on('exit', code => {
        console.log(`go exited with ${code}`);
        run1();
    });
};

run1();
