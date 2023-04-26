#!/usr/bin/env node

const { exit } = require('process');
const fs = require('fs');
const tsGen = require('json-schema-to-typescript');

const tsOut = './src/data/inscription.ts';
var schemaUri = 'https://json-schema.ivyteam.ch/process/11.1.26/inscription.json';

const args = process.argv.slice(2);
if (args.length > 0) {
  if (args[0] === 'clean') {
    console.log('cleaning ' + tsOut);
    if (fs.existsSync(tsOut)) {
      fs.unlinkSync(tsOut);
    }
    exit(0);
  }
  schemaUri = args[0];
}

function loadJson(uri) {
  const http = require('https');
  console.log(`loading ${uri}`);
  const download = new Promise(result =>
    http.get(uri, res => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        body = JSON.parse(body);
        result(body);
      });
    })
  );
  return download;
}

function writeSrc(ts) {
  const nonNullTs = ts.replace(/\?:/g, ':');
  fs.writeFileSync(tsOut, nonNullTs);
  console.log(`generated ${tsOut}`);
}

if (schemaUri.startsWith('http')) {
  loadJson(schemaUri)
    .then(schema => tsGen.compile(schema, 'inscription'))
    .then(ts => writeSrc(ts));
} else {
  tsGen.compileFromFile(schemaUri).then(ts => writeSrc(ts));
}
