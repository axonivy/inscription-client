#!/bin/bash
set -e

mvn --batch-mode -f playwright/tests/screenshots/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode -f playwright/inscription-test-project/pom.xml versions:set versions:commit -DnewVersion=${1}

npm install
npx lerna version ${1/SNAPSHOT/next} --no-git-tag-version --no-push --ignore-scripts --exact --yes
npm install
