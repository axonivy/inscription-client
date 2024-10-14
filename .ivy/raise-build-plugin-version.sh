#!/bin/bash
set -e

mvn --batch-mode versions:set-property versions:commit -f playwright/inscription-test-project/pom.xml -Dproperty=project.build.plugin.version -DnewVersion=${2} -DallowSnapshots=true
