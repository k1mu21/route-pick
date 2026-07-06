resource "google_artifact_registry_repository" "route_pick" {
  repository_id = var.service_name
  location      = var.region
  format        = "DOCKER"
  description   = "route-pick container images"

  depends_on = [google_project_service.apis]
}
