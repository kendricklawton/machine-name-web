provider "google" {
  project = "betbooklm"
  region  = "us-central1"
}

module "betbooklm_app" {
  source = "../../modules/language-model-book-app"

  project_id   = "betbooklm"
  service_name = "betbooklm-service"
}
