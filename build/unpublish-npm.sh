#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

npm unpublish "@axonivy/inscription-editor@${1}" --registry $REGISTRY
npm unpublish "@axonivy/inscription-protocol@${1}" --registry $REGISTRY
