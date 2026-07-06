resource "google_cloud_run_v2_service" "route_pick" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      # 初回applyはプレースホルダ。以降のイメージ更新はGitHub Actionsが行う
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "256Mi"
        }
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }
  }

  # リビジョン更新（イメージ差し替え）はActionsのデプロイに任せる
  lifecycle {
    ignore_changes = [template[0].containers[0].image, client, client_version]
  }

  depends_on = [google_project_service.apis]
}

# 誰でもアクセス可能にする
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.route_pick.name
  location = google_cloud_run_v2_service.route_pick.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
