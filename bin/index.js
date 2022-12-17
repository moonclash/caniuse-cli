#! /usr/bin/env node

import yargs from 'yargs';
import Table from 'cli-table';
import axios from 'axios';

function help() {
    const lines = [
        'caniuse {feature} - gets information for a feature - i.e caniuse es6',
        'caniuse {feature} --full - display a full browser list, rather than the most popular browsers',
        'caniuse --h - help menu'
    ]
    console.log(`Options: \n ${lines.join('\n')}`);
}

async function getData(feature, limit) {
    const response = await axios.get(`https://m5fg5afuue.execute-api.eu-west-1.amazonaws.com/latest/${feature}`);
    const data = response.data;
    const browsersResult = Object.keys(data); 
    const browsersLimit = limit ? limit : browsersResult.length;
    const browsers = browsersResult.slice(0, browsersLimit);
    const table = new Table();
    browsers.forEach(browser => {
        const row = {};
        row[browser] = data[browser];
        table.push(row);
    })
    console.log(table.toString())
}
const argv = yargs(process.argv.slice(2)).argv;

console.log(argv);

if (argv.h) {
    help();
}
else if (argv.full) {
    getData(argv['_'][0])
}

else {
    getData(argv['_'], 8)
}

