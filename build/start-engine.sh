#!/bin/bash

projectDir=./$1/target
appName=$2
baseUrl=http://localhost:8080
deployDir=$projectDir/ivyEngine/deploy/$appName

echo 'Copy project to deploy dir'
mkdir $deployDir
cp $projectDir/*.iar $deployDir

echo 'Start engine'
$projectDir/ivyEngine/bin/AxonIvyEngine &

echo 'wait until engine ready'
maxTries=60

while true;do
    wget -t 1 -q $baseUrl/$appName -O /dev/null && break
    sleep 1
    if [ "$maxTries" = 0 ]; then
        break
    fi
    echo "try again: $maxTries left"
    ((maxTries--)) 
done

if [ "$maxTries" = 0 ]; then
    echo 'engine never was ready'
    exit 1
else
    echo 'engine ready'
fi
