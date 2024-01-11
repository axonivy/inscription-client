#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

npm unpublish "@axonivy/editor-icons@${1}" --registry $REGISTRY
npm unpublish "@axonivy/inscription-core@${1}" --registry $REGISTRY
npm unpublish "@axonivy/inscription-editor@${1}" --registry $REGISTRY
npm unpublish "@axonivy/inscription-protocol@${1}" --registry $REGISTRY
