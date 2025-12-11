# modules/book-app/main.tf

# 1. The Cloud Run Service
resource "google_cloud_run_v2_service" "app" {
  name     = var.service_name
  project  = var.project_id
  location = "us-central1"

  template {
    containers {
      image = var.image_url

      # Connect to the Secret in the Infra Project
      env {
        name = "DB_PASSWORD"
        value_source {
          secret_key_ref {
            # FIX: Use the full path (projects/PROJECT/secrets/SECRET)
            secret  = "projects/${var.shared_infra_project}/secrets/db-password"
            version = "latest"
          }
        }
      }
    }

    # Cloud SQL Connectivity (Direct VPC Egress)
    vpc_access {
      network_interfaces {
        network    = "projects/${var.shared_infra_project}/global/networks/machine-infra-vpc"
        subnetwork = "projects/${var.shared_infra_project}/regions/us-central1/subnetworks/machine-infra-vpc"
        # Note: Direct VPC Egress usually requires specifying a subnetwork as well,
        # or just pointing to the network if you are using the older "connector" method.
        # If the above fails on "subnetwork required", remove the network_interfaces block
        # and use the "vpc_access.connector" field if you created a Serverless Connector.
      }
      egress = "ALL_TRAFFIC"
    }
  }
}

# 2. IAM: Allow this specific Cloud Run Service Account to read the Shared Secret
# Get the default service account email
data "google_compute_default_service_account" "default" {
  project = var.project_id
}

resource "google_project_iam_member" "secret_accessor" {
  project = var.shared_infra_project
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}

resource "google_project_iam_member" "sql_client" {
  project = var.shared_infra_project
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
}
