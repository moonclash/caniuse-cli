#! /usr/bin/env node

import yargs from 'yargs';
import CanIUseFetchService from '../services/caniuseFetchService.js';

function help() {
    const lines = [
        'caniuse {feature} - gets information for a feature - i.e caniuse es6',
        'caniuse {feature} --full - display a full browser list, rather than the most popular browsers',
        'caniuse --h - help menu'
    ]
    console.log(`Options: \n ${lines.join('\n')}`);
}

async function getData(feature, limit) {
    const table = await CanIUseFetchService.getData(feature, limit);
    console.log(table);
}
const argv = yargs(process.argv.slice(2)).argv;

if (argv.h) {
    help();
}
else if (argv.full) {
    getData(argv['_'][0])
}

else {
    getData(argv['_'], 8)
}

