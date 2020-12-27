
def customCheckout (branch, repo, credentials){
    echo "Cloning ${branch} from ${repo}"

    checkout([
        $class: 'GitSCM'
        , branches: [[name: "*/${branch}"]]
        , doGenerateSubmoduleConfigurations: false
        , extensions: []
        , submoduleCfg: []
        , userRemoteConfigs: [[
            credentialsId: "${credentials}"
            , url: "${repo}"
        ]]
    ])
}

pipeline{
    agent {
        label "master"
    }

    parameters {
        string (name:'repoUrl', defaultValue: 'https://github.com/baihusystems/tenpo-devops.git', description: 'URL Repo')
        string (name:'repoCredentials', defaultValue: 'tenpo-github-app', description: 'Credentials Repo')
        string (name:'branchName', defaultValue: 'main', description: 'Branch Checkout')
        string (name:'gcrProjectId', defaultValue: 'tenpo-299813', description: 'ID GCR Project')
        string (name:'artifactID', defaultValue: 'node-tenpo', description: 'Artifact Name')
    }
    stages{
        stage ("preparation"){
            steps{
                echo "Deleting workspace..."
                deleteDir()
            }
        }
        stage ("checkout"){
            steps{
                script {
                    customCheckout("${branchName}", "${params.repoUrl}", "${params.repoCredentials}")
                }
            }
        }
        stage ("compile"){
            steps{
                echo "Node App Compiled..."
            }
        }
        stage('Build image') {
            steps{
                script {
                    app = docker.build("us.gcr.io/${params.gcrProjectId}/${params.artifactID}")
                }
            }
        }
        stage('Push image') {
            steps{
                script {
                    docker.withRegistry('https://us.gcr.io', "gcr:${params.gcrProjectId}") {
                        app.push("1.0.0_${env.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
}