pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Build.'
                //sh 'docker stop pixvie-backend'
                sh 'docker build -t pixvie-be .'
                sh 'docker run --name pixvie-backend -d -p 3000:3000 pixvie-be'
                
            }
        }
    }
}