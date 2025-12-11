# Machine Name Infrastructure

This repository contains the Infrastructure as Code (IaC) configuration for the **Machine Name** project, managing shared resources and individual application deployments using Terraform on Google Cloud Platform (GCP).

## Architecture Overview

The infrastructure follows a hub-and-spoke model where shared resources are centralized in one project, and applications are deployed as Cloud Run services that connect to these shared resources.

### 1. Shared Infrastructure (`machine-name-infra`)
Located in `infra/machine-name-infra/`, this component sets up the foundation:
*   **Networking**: A custom VPC (`machine-infra-vpc`) with Private Services Access enabled for internal communication.
*   **Database**: A shared Cloud SQL instance (`shared-postgres-17`) configured with Private IP to ensure security.
*   **Security**: Google Secret Manager is used to store sensitive data like the database password (`db-password`).

### 2. Application Module (`language-model-book-app`)
Located in `infra/language-model-book-app/`, this is a reusable Terraform module designed to standardize application deployments. It handles:
*   **Compute**: Deploys the application to Cloud Run (`google_cloud_run_v2_service`).
*   **Connectivity**: Configures VPC Access to allow the Cloud Run service to communicate with the shared Cloud SQL instance via the VPC.
*   **IAM & Security**: Grants the necessary permissions (IAM bindings) for the service account to access secrets and connect to Cloud SQL.
*   **Configuration**: Injects environment variables, including the database password fetched from Secret Manager.

### 3. Applications (`language-model-books`)
Located in `infra/language-model-books/`, this directory contains the specific implementations for the different "Book" applications. Each application utilizes the shared module to deploy its own instance.

Current applications include:
*   **betbooklm** (`betbooklm`)
*   **tradebooklm** (`tradebooklm`)
*   **wealthbooklm** (`wealthbooklm`)

Each application project is configured to:
1.  Initialize the Google Provider for its specific project ID.
2.  Call the `language-model-book-app` module to deploy the service.

## Directory Structure

```text
machine-name/
└── infra/
    ├── machine-name-infra/       # Shared Infrastructure
    │   ├── main.tf               # VPC, Cloud SQL, Secret Manager definitions
    │   └── variables.tf          # Variable definitions
    │
    ├── language-model-book-app/  # Reusable App Module
    │   ├── main.tf               # Cloud Run & IAM configuration
    │   └── variables.tf          # Module inputs
    │
    └── language-model-books/     # Application Deployments
        ├── betbooklm/            # BetBookLM App
        │   └── main.tf
        ├── tradebooklm/          # TradeBookLM App
        │   └── main.tf
        └── wealthbooklm/         # WealthBookLM App
            └── main.tf
```

## Getting Started

### Prerequisites
*   [Terraform](https://www.terraform.io/) installed.
*   [Google Cloud SDK](https://cloud.google.com/sdk) installed and authenticated.

### Deployment Order
1.  **Deploy Shared Infrastructure**:
    Navigate to `infra/machine-name-infra` and apply the configuration to set up the VPC and Database.
    ```sh
    cd infra/machine-name-infra
    terraform init
    terraform apply
    ```

2.  **Deploy Applications**:
    Navigate to the specific application directory (e.g., `infra/language-model-books/betbooklm`) and apply the configuration.
    ```sh
    cd infra/language-model-books/betbooklm
    terraform init
    terraform apply
    ```
