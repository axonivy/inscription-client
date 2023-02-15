def build(def name, def projectDir = 'integrations/standalone/tests/screenshots/project', def yarnCmd = 'webtest:screenshot') {
  def random = (new Random()).nextInt(10000000)
  def networkName = "build-" + random
  def ivyName = "ivy-" + random
  def appName = "test-app"
  try {
    sh "docker network create ${networkName}"
    docker.build('maven', '-f build/Dockerfile .').inside("--network ${networkName}") {
      maven cmd: "-ntp -f ${projectDir} verify -Dengine.page.url=${params.engineSource}"
      // engine needs to be started as service (withRun)
      // so first step: run dev engine docker image and deploy app
      // second step: build docker engine image from downloaded engine?
      sh "build/start-engine.sh ${projectDir} ${appName}"
      docker.image('mcr.microsoft.com/playwright:v1.30.0').withRun("-e TEST_APP=${appName} -e BASE_URL=http://${ivyName}:8080 --network ${networkName}") {
        sh 'build/use-mirror-npm.sh'
        sh "yarn && yarn standalone ${yarnCmd}"
      }
    }
    
    archiveArtifacts artifacts: '**/standalone/test-results/**', allowEmptyArchive: true
    archiveArtifacts artifacts: '**/standalone/**/target/**/ivy.log', allowEmptyArchive: true
    withChecks(name) {
      junit testDataPublishers: [[$class: 'AttachmentPublisher'], [$class: 'StabilityTestDataPublisher']], testResults: '**/node_modules/**/report.xml'
    }

  } finally {
    sh "docker network rm ${networkName}"
  }
}

return this
