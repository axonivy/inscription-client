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
          dir ('client') {
            docker.build('node').inside {
              sh 'yarn build'
            }
          }
        }
      }
    }
    stage('Server') {
      steps {
        script {
          dir ('server') {
            docker.image('maven:3.8.6-eclipse-temurin-17').inside {
              maven cmd: 'clean verify'
            }
          }
        }
      }
    }
  }
  post {
    always {
      discoverGitReferenceBuild defaultBranch: 'master'
      // Record & publish ESLint issues
      recordIssues enabledForFailure: true, publishAllIssues: true, aggregatingResults: true, tools: [esLint(pattern: '**/eslint.xml')], qualityGates: [[threshold: 1, type: 'TOTAL', unstable: true]]
      // recordIssues tools: [mavenConsole()], unstableTotalAll: 1

      withChecks('Client Tests') {
        junit testDataPublishers: [[$class: 'AttachmentPublisher'], [$class: 'StabilityTestDataPublisher']], testResults: '**/junit.xml'
      }
      withChecks('Server Tests') {
        junit testDataPublishers: [[$class: 'AttachmentPublisher'], [$class: 'StabilityTestDataPublisher']], testResults: '**/target/surefire-reports/**/*.xml'
      }
    }
  }
}
