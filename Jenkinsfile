pipeline {
  agent any

  options {
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '5'))
  }

  triggers {
    cron '@midnight'
  }

  stages {
    stage('Client') {
      steps {
        script {
          catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
            docker.build('node').inside {
              sh 'build/use-mirror-npm.sh'
              sh 'yarn ci'
            }
          }
          archiveArtifacts artifacts: '**/integrations/standalone/build/**', allowEmptyArchive: true
          recordIssues enabledForFailure: true, publishAllIssues: true, aggregatingResults: true, tools: [esLint(pattern: '**/node_modules/**/eslint.xml')], qualityGates: [[threshold: 1, type: 'TOTAL', unstable: true]]
          withChecks('Client Tests') {
            junit testDataPublishers: [[$class: 'AttachmentPublisher'], [$class: 'StabilityTestDataPublisher']], testResults: '**/node_modules/**/junit.xml'
          }
        }
      }
    }
    stage('Protocol') {
      when {
        expression { isReleaseOrMasterBranch() }
      }
      steps {
        script {
          catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
            docker.build('node').inside {
              sh '''
                build/use-mirror-npm.sh
                yarn
                yarn codegen clean

                devSchema="https://jenkins.ivyteam.io/job/core_json-schema/job/'''+env.BRANCH_NAME+'''/lastSuccessfulBuild/artifact/workspace/ch.ivyteam.ivy.lsp.inscription/target/schema/process/*/inscription.json/*zip*/process.zip"
                curl -o process.zip ${devSchema}
                unzip -j process.zip
                yarn codegen generate $PWD/inscription.json

                yarn type
              '''
            }
          }
          recordIssues enabledForFailure: true, publishAllIssues: true, aggregatingResults: true, tools: [esLint(id: 'latest', pattern: '**/node_modules/**/eslint.xml')], qualityGates: [[threshold: 1, type: 'TOTAL', unstable: true]]
        }
      }
    }
    stage('Mock Tests') {
      steps {
        script {
          docker.image('mcr.microsoft.com/playwright:v1.30.0-jammy').inside {
            sh 'yarn standalone webtest:mock'
          }
          archiveArtifacts artifacts: '**/standalone/test-results/**', allowEmptyArchive: true
          withChecks('Mock Tests') {
            junit testDataPublishers: [[$class: 'AttachmentPublisher'], [$class: 'StabilityTestDataPublisher']], testResults: '**/node_modules/**/report.xml'
          }
        }
      }
    }
    stage('Deploy') {
      when {
        expression { isReleaseOrMasterBranch() && currentBuild.currentResult == 'SUCCESS' }
      }
      steps {
        script {
          docker.image('maven:3.8.6-eclipse-temurin-17').inside {
            maven cmd: '-ntp -f integrations/standalone clean deploy -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn'
          }
          archiveArtifacts 'integrations/standalone/target/inscription-client-standalone-*.jar'
        }
      }
    }
  }
}

def isReleaseOrMasterBranch() {
  return env.BRANCH_NAME == 'master' || env.BRANCH_NAME.startsWith('release/') 
}
