#!/usr/bin/env node
// @ts-check
const CLI = require('3h-cli'),
    // @ts-ignore
    packageInfo = require('./package.json'),
    { init, getLatestVersion, log } = require('./lib');

const DEFAULT_PORT = 8080;

const cli = CLI.create({
    name: packageInfo.name,
    title: packageInfo.description,
    lineGapSize: 1,
    nameSize: 11,
}).first({
    name: 'name',
    help: 'Your app name'
}).arg({
    name: 'h',
    alias: ['-help'],
    help: 'Show help info'
}).arg({
    name: 'd',
    alias: ['-dir'],
    val: 'dir',
    help: 'The directory to create\n' +
        'Default: the app name'
}).arg({
    name: 'v',
    alias: ['-ver'],
    val: 'ver',
    help: 'The version of `super-x` to use\n' +
        'Default: the latest'
}).arg({
    name: 'p',
    alias: ['-port'],
    val: 'port',
    help: 'The local port to use\n' +
        `Default: ${DEFAULT_PORT}`
}).on('exec', args => {
    if (args.has('h')) {
        return cli.help();
    }
    (async () => {
        if (!args.has('name')) {
            cli.help();
            console.log();
            throw "Missing app name!";
        }
        const appName = args.get('name')[0];
        init({
            dirName: args.has('d') ? args.get('d')[0] : appName,
            appName,
            libVersion: args.has('v') ? args.get('v')[0] : await getLatestVersion(),
            port: args.has('p') ? args.get('p')[0] : DEFAULT_PORT,
        });
    })().catch(error => {
        log(`An error occurred: ${error}`);
        process.exit(1);
    });
}).exec(process.argv);
