provider "google" {
  project = "machine-name-infra"
  region  = "us-central1"
}

# --- 1. NETWORK (Required for Private IP SQL) ---
resource "google_compute_network" "vpc" {
  name                    = "machine-infra-vpc"
  auto_create_subnetworks = true
}

# Reserve IP range for Google Services (Cloud SQL lives here)
resource "google_compute_global_address" "private_ip_address" {
  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc.id
}

# Connect your VPC to Google's VPC
resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}

# --- 2. CLOUD SQL (Postgres 17) ---
resource "google_sql_database_instance" "postgres" {
  name             = "shared-postgres-17"
  database_version = "POSTGRES_17"
  region           = "us-central1"

  # Depends on the network connection existing first
  depends_on = [google_service_networking_connection.private_vpc_connection]

  settings {
    tier = "db-custom-2-7680" # Example size, adjust as needed

    ip_configuration {
      ipv4_enabled                                  = false # Disable Public IP
      private_network                               = google_compute_network.vpc.id
      enable_private_path_for_google_cloud_services = true
    }
  }

  # Prevent accidental deletion
  deletion_protection = true
}

# --- 3. SECRETS ---
resource "google_secret_manager_secret" "db_password" {
  secret_id = "db-password"
  replication {
    auto {}
  }
}

# (Optional) Create a dummy version so the secret exists
resource "google_secret_manager_secret_version" "db_password_data" {
  secret      = google_secret_manager_secret.db_password.id
  secret_data = "initial-placeholder-password"
}
