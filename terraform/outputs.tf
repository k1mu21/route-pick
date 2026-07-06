output "cloud_run_url" {
  value = google_cloud_run_v2_service.route_pick.uri
}

output "workload_identity_provider" {
  description = "GitHub Variables の GCP_WIF_PROVIDER に設定する値"
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "deployer_service_account" {
  description = "GitHub Variables の GCP_SA_EMAIL に設定する値"
  value       = google_service_account.deployer.email
}
