#!/bin/bash

mvn --batch-mode versions:set-property versions:commit -f integrations/standalone/tests/engine/project/pom.xml -Dproperty=project.build.plugin.version -DnewVersion=${2} -DallowSnapshots=true
mvn --batch-mode versions:set-property versions:commit -f integrations/standalone/tests/screenshots/project/pom.xml -Dproperty=project.build.plugin.version -DnewVersion=${2} -DallowSnapshots=true
