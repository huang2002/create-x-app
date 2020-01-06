// @ts-check
const { get } = require('https'),
    { join } = require('path'),
    { mkdirSync, writeFileSync, readFileSync } = require('fs'),
    { execSync } = require('child_process');

const log = exports.log = content => console.log(`> ${content}`);

exports.getLatestVersion = () => new Promise((resolve, reject) => {
    log('Fetching the latest version...');
    get('https://unpkg.com/super-x', res => {
        const { location } = res.headers,
            version = location && location.slice(location.indexOf('@') + 1);
        if (version) {
            log(`Fetched the latest version: ${version}`);
            resolve(version);
        } else {
            reject('Failed to fetch the latest version.');
        }
    }).end();
});

const ENCODING = 'utf8';

const generate = (fileName, variables) => {
    writeFileSync(
        fileName,
        Object.entries(variables).reduce(
            (content, [key, value]) => content.replace(new RegExp(`\\$${key}\\$`, 'g'), value),
            readFileSync(join(__dirname, 'template', fileName), ENCODING)
        )
    );
};

exports.init = (options) => {

    const { dirName } = options;

    log('Making directories...');
    mkdirSync(dirName);
    process.chdir(dirName);
    ['src', 'test', 'dist', 'dist/public'].forEach(dir => mkdirSync(dir));

    log('Generating files...');
    [
        'package.json',
        'rollup.config.js',
        'tsconfig.json',
        'test/index.html',
        'test/server.js',
        'src/index.js',
        'src/common.js',
        'dist/server.js',
        'dist/public/index.html',
        'dist/public/index.css',
    ].forEach(fileName => {
        generate(fileName, options);
    });

    log('Installing dev dependencies...');
    execSync('npm i', { stdio: 'inherit' });

    log('Done.');

};
