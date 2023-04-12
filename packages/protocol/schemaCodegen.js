#!/usr/bin/env node

const { exit } = require('process');
const fs = require('fs');

const tsOut = './src/data/inscription.ts';
const schemaFile = 'inscription.json';
var schema = 'https://json-schema.axonivy.com/process/11.1.22/inscription.json';

const args = process.argv.slice(2);
if (args.length > 0) {
  if (args[0] === 'clean') {
    console.log('cleaning ' + tsOut);
    if (fs.existsSync(tsOut)) {
      fs.unlinkSync(tsOut);
    }
    exit(0);
  }
  schema = args[0];
}

function fetchSchema() {
  const http = require('https');
  const file = fs.createWriteStream(schemaFile);
  http.get(schema, function (response) {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded ' + schema);
    });
  });
}

function codegen() {
  const { exec } = require('child_process');
  exec('yarn json2ts ' + schemaFile + ' ' + tsOut, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error}`);
      return;
    }
    console.log(`${stdout}`);
    patchNull();
  });
}

function patchNull() {
  const contents = fs.readFileSync(tsOut);
  const search = new RegExp('\\?:', 'g');
  const result = contents.toString().replace(search, ':');
  fs.writeFileSync(tsOut, result);
}

fetchSchema();
codegen();
