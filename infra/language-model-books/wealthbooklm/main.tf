provider "google" {
  project = "wealthbooklm"
  region  = "us-central1"
}

module "wealthbook_app" {
  source = "../../modules/language-model-book-app"

  project_id   = "wealthbooklm"
  service_name = "wealthbook-service"
}
