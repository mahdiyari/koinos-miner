'use strict';

const { program } = require('commander');

program
   .version('1.0.0', '-v, --version')
   .usage('[OPTIONS]...')
   .requiredOption('-a, --addr <addr>', 'An ethereum address')
   .option('-e, --endpoint <endpoint>', 'An ethereum endpoint', 'https://ropsten.rpc.fiews.io/v1/free')
   .option('-t, --tip <percent>', 'The percentage of mined coins to tip the developers', '5')
   .option('-p, --proof-period <seconds>', 'How often you want to submit a proof on average', '86400')
   .parse(process.argv);

console.log(` _  __     _                   __  __ _`);
console.log(`| |/ /    (_)                 |  \\/  (_)`);
console.log(`| ' / ___  _ _ __   ___  ___  | \\  / |_ _ __   ___ _ __`);
console.log(`|  < / _ \\| | '_ \\ / _ \\/ __| | |\\/| | | '_ \\ / _ \\ '__|`);
console.log(`| . \\ (_) | | | | | (_) \\__ \\ | |  | | | | | |  __/ |`);
console.log(`|_|\\_\\___/|_|_| |_|\\___/|___/ |_|  |_|_|_| |_|\\___|_|`);
console.log(``);
console.log(`[JS](app.js) Mining with the following arguments:`);
console.log(`[JS](app.js) Ethereum Address: ${program.addr}`);
console.log(`[JS](app.js) Ethereum Endpoint: ${program.endpoint}`);
console.log(`[JS](app.js) Developer Tip: ${program.tip}%`);
console.log(`[JS](app.js) Proof Period: ${program.proofPeriod}`);
console.log(``);

let KoinosMiner = require('.');

let hashrateCallback = function(hashrate) {
   console.log(`[JS](app.js) Hashrate: ` + KoinosMiner.formatHashrate(hashrate));
}

let proofCallback = function(submission) {
   console.log(`[JS](app.js) Proof:`);
   console.log(submission);
}

const oo_address       = '0xCd06f2eb4E5424f9681bA07CB3C7487FEc0341EC';
const contract_address = '0x536D49f3a0498A9E38FA3D90Df828Dc5BFc7c7F4';

var miner = new KoinosMiner(program.addr, oo_address, contract_address, program.endpoint, program.tip, program.proofPeriod, hashrateCallback, proofCallback)

miner.start();
