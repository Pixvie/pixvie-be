pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Build.'
                sh 'docker rm pixvie-backend --force'
                sh 'docker build -t pixvie-be .'
                sh 'docker run --name pixvie-backend -d -p 3000:3000 --env MONGODB_URI=$MONGODB_URI pixvie-be'
                
            }
        }
    }
}