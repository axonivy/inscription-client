#!/bin/bash
set -e

mvn --batch-mode -f integrations/standalone/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode -f integrations/standalone/tests/screenshots/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode -f integrations/standalone/tests/engine/project/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode -f integrations/standalone/tests/screenshots/project/pom.xml versions:set versions:commit -DnewVersion=${1}

yarn install --ignore-scripts
yarn lerna version ${1/SNAPSHOT/next} --no-git-tag-version --no-push --ignore-scripts --exact --yes
yarn install --ignore-scripts
