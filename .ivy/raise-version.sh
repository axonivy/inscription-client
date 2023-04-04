#!/bin/bash

mvn --batch-mode -f integrations/standalone/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode -f integrations/standalone/tests/screenshots/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode -f integrations/standalone/tests/engine/project/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode -f integrations/standalone/tests/screenshots/project/pom.xml versions:set versions:commit -DnewVersion=${1}
