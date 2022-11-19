pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Build.'
                sh 'npm install'
                
            }
        }
    }
    post {
        success {
            sh 'npm run start'

    }
  }
}