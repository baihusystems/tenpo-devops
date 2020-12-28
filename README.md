# Tenpo-devops
por Alberto Salazar

Tecnologias Utilizadas:
  - NodeJs: API REST de Registro, acceso y operaciones 
  - Docker: Dockerizacion de Aplicacion API REST
  - Groovy: Pipelines de build, push, deploy, restart y shutdown
  - Jenkins: Automatizacion de procesos en Groovy
  - Kubernetes: Automatizacion de despliegues
  - Helm-Charts: Herramienta para gestionar despliegues con Kubernetes
  - Terraform: Despliegue de infraestructura como codigo en GCP
  - Google Cloud Plataform: Plataforma de servicios Cloud
  
### Instalación
Clonar Repo
```sh
$ git clone https://github.com/baihusystems/tenpo-devops.git
```

Si desea correr localmente la API
```sh
$ cd node-api
$ npm install
$ node server.js
```

Para instanciar un servidor Jenkins Local
```sh
$ cd jenkins-srv
$ docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
```

### Plugins Jenkins
...

### Jobs Jenkins
- Jenkinsfile_build: Compila, genera contendor Docker y lo almacena en GCR
- Jenkinsfile_deploy: Deploya la aplicación en GCP a traves de Kubernetes haciendo uso de Helm-Charts
- Jenkinsfile_restart: Reinicia pod
- Jenkinsfile_shutdown: destruye el pod

Todos los jobs contienen sus variables definidas dentro del codigo, las mismas pueden ser modificadas a decisión

### Infraestructura
Definida con Terraform y GCP

```sh
$ cd terraform
$ terraform init
$ terraform plan
$ terraform apply
```