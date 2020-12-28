provider "google" {
  project = var.project_id
  region  = var.region
  credentials = file(var.gcp_auth_file)
}
provider "google-beta" {
  project     = var.app_project
  credentials = file(var.gcp_auth_file)
  region      = var.gcp_region_1
  zone        = var.gcp_zone_1
}