variable "gke_username" {
  default     = ""
  description = "gke username"
}

variable "gke_password" {
  default     = ""
  description = "gke password"
}

variable "gke_num_nodes" {
  default     = 1
  description = "number of gke nodes"
}
variable "project_id" {
  description = "project id"
}

variable "region" {
  description = "region"
}
# define the GCP authentication file
variable "gcp_auth_file" {
  type = string
  description = "GCP authentication file"
}
variable "app_name" {
  type = string
  description = "App Name"
}

variable "gcp_serviceaccount" {
  type = string
  description = "Service Account with Roles"
}