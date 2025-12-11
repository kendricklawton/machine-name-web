provider "google" {
  project = "tradebooklm"
  region  = "us-central1"
}

module "tradebooklm_app" {
  source = "../../modules/language-model-book-app"

  project_id   = "tradebooklm"
  service_name = "tradebooklm-service"
}
