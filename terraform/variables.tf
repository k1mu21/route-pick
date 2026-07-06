variable "project_id" {
  type    = string
  default = "route-pick-501614"
}

variable "region" {
  type    = string
  default = "asia-northeast1"
}

variable "github_repo" {
  description = "GitHub Actionsからのデプロイを許可するリポジトリ (owner/name)"
  type        = string
  default     = "k1mu21/route-pick"
}

variable "service_name" {
  type    = string
  default = "route-pick"
}
