variable "region" { type = string }
variable "environment" { type = string }

locals {
  tags = {
    ManagedBy   = "terraform"
    Environment = var.environment
    Platform    = "launchpad"
  }
}
