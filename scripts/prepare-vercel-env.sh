#!/usr/bin/env bash
# Helper script to add environment variables to Vercel using the Vercel CLI.
# Usage: copy your production values into a local `.env.prod` (gitignored), then run:
#   ./scripts/prepare-vercel-env.sh .env.prod production
# Requires: `vercel` CLI installed and logged in.

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <env-file> <environment>
  environment: preview | production"
  exit 1
fi

ENV_FILE="$1"
ENVIRONMENT="$2"

if [ ! -f "$ENV_FILE" ]; then
  echo "Env file $ENV_FILE not found"
  exit 1
fi

echo "Reading env from $ENV_FILE and setting Vercel env ($ENVIRONMENT)..."

while IFS='=' read -r key value; do
  # skip comments and empty lines
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  # trim whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)
  if [ -z "$value" ]; then
    echo "Skipping $key (empty)"
    continue
  fi
  echo "Adding $key to Vercel ($ENVIRONMENT)"
  vercel env add "$key" "$ENVIRONMENT" <<< "$value"
done < "$ENV_FILE"

echo "Done. Verify variables in Vercel Dashboard." 
