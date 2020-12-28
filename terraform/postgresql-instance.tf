resource "google_sql_database_instance" "postgresql" {
  name = "${var.app_name}-db2"
  project = var.project_id
  region = var.region
  database_version = var.db_version
  
  settings {
    tier = var.db_tier
    activation_policy = var.db_activation_policy
    disk_autoresize = var.db_disk_autoresize
    disk_size = var.db_disk_size
    disk_type = var.db_disk_type
    pricing_plan = var.db_pricing_plan
    
    ip_configuration {
      ipv4_enabled = "true"
      authorized_networks {
        value = var.db_instance_access_cidr
      }
    }
  }
  deletion_protection  = "false"
}

# create database
resource "google_sql_database" "postgresql_db" {
  name = var.db_name
  project = var.project_id
  instance = google_sql_database_instance.postgresql.name
  charset = var.db_charset
  collation = var.db_collation
}

# create user
resource "random_id" "user_password" {
  byte_length = 8
}
resource "google_sql_user" "postgresql_user" {
  name = var.db_user_name
  project  = var.project_id
  instance = google_sql_database_instance.postgresql.name
  host = var.db_user_host
  password = var.db_user_password == "" ? random_id.user_password.hex : var.db_user_password
}