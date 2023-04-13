#!/usr/bin/env node

const { exit } = require('process');
const fs = require('fs');

const tsOut = './src/data/inscription.ts';
var schemaUri = 'https://json-schema.axonivy.com/process/11.1.22/inscription.json';

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

async function fetchSchema() {
  const http = require('https');
  http.get(schemaUri, res => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', data => {
      body += data;
    });
    res.on('end', () => {
      body = JSON.parse(body);
      codegen(body);
    });
  });
}

function codegen(schema) {
  const tsGen = require('json-schema-to-typescript');
  tsGen.compile(schema, 'inscription').then(ts => {
    const nonNullTs = ts.replace(/\?:/g, ':');
    fs.writeFileSync(tsOut, nonNullTs);
    console.log(`generated ${tsOut}`);
  });
}

fetchSchema();
