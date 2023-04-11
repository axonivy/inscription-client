#!/bin/bash

tsOut=packages/protocol/src/data/inscription.d.ts

generate() {
  uri=https://json-schema.axonivy.com/process/11.1.20/schema.json
  if ! [ -z "$1" ]; then
    uri="$1"
  fi 
  if ! [ -f inscription.json ]; then 
    curl -o inscription.json ${uri}
  fi
  yarn json2ts inscription.json ${tsOut}
}

clean() {
  rm -v inscription.json
  rm -v ${tsOut}
}

if [[ "$1" == "clean" ]]; then
  clean
  exit 0
fi

if ! [ -z "$1" ]; then
  clean
  generate "$1"
else
  generate
fi