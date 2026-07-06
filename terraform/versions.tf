terraform {
  required_version = ">= 1.7"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }

  # stateをGCSで管理する場合はバケットを作ってコメントを外す
  # backend "gcs" {
  #   bucket = "route-pick-501614-tfstate"
  #   prefix = "route-pick"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
