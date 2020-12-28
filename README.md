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

### Rutas
GCP Enpoint: http://35.231.140.86:8082

|Tipo| Ruta | Descripción |
|------| ------ | ------ |
|POST| /api/auth/signup | Registro de Usuario |
|POST| /api/auth/signin | Login de Usuario |
|POST| /api/operations | Operaciones Usuario Loggeado |
|GET| /api/operationsList | Listado de Operaciones |

### /api/auth/signup (POST)
```sh
Body - Raw (JSON)
{
    "username": "NombreUsuario",
    "password": "Contrasena"
}
```

### /api/auth/signin (POST)
```sh
Body - Raw (JSON)
{
    "username": "NombreUsuario",
    "password": "Contrasena"
}
```

### /api/operations (POST)
```sh
Header
x-access-token: TOKEN

Body - Raw (JSON)
{
    "operacion": "suma",
    "valores": ARRAY NUMERICO, Ej: [1,2,3,4,5,6,7,8,9]
}
```

### /api/operationsList (GET)
```sh
Body - Raw (JSON)
{
    "username": "NombreUsuario"
}
```

-----------------------------------

Para instanciar un servidor Jenkins Local
```sh
$ cd jenkins-srv
$ docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
```


### Jobs Jenkins
- Jenkinsfile_build: Compila, genera contendor Docker y lo almacena en GCR
- Jenkinsfile_deploy: Deploya la aplicación en GCP a traves de Kubernetes haciendo uso de Helm-Charts
- Jenkinsfile_restart: Reinicia pod
- Jenkinsfile_shutdown: destruye el pod

Todos los jobs contienen sus variables definidas dentro del codigo, las mismas pueden ser modificadas a decisión

### Infraestructura
Definida con Terraform y GCP

```sh
$ cd terraform
#Actualice los valores en la siguiente ruta: tenpo-devops/terraform/terraform.tfvars
$ terraform init
$ terraform plan
$ terraform apply
```


