#!/usr/bin/env bash
set -euo pipefail
DEST=${1:-}
if [ -z "$DEST" ]; then
  echo "Usage: $0 /path/to/your/webwaka"
  exit 1
fi

mkdir -p "$DEST/app/(admin)/admin/credentials"
mkdir -p "$DEST/app/(admin)/admin/ai"
mkdir -p "$DEST/app/(admin)/admin/pricing"
mkdir -p "$DEST/app/(admin)/admin/partners"
mkdir -p "$DEST/app/(admin)/admin/enterprise"
mkdir -p "$DEST/app/api/credentials/verify"
mkdir -p "$DEST/app/api/credentials/save"
mkdir -p "$DEST/app/api/credentials"
mkdir -p "$DEST/app/api/orchestrate/start"
mkdir -p "$DEST/admin/credentials"
mkdir -p "$DEST/sql"
mkdir -p "$DEST/docs"

cp -r app/(admin)/admin/page.tsx "$DEST/app/(admin)/admin/page.tsx"
cp -r app/(admin)/admin/credentials/page.tsx "$DEST/app/(admin)/admin/credentials/page.tsx"
cp -r app/(admin)/admin/ai/page.tsx "$DEST/app/(admin)/admin/ai/page.tsx"
cp -r app/(admin)/admin/pricing/page.tsx "$DEST/app/(admin)/admin/pricing/page.tsx"
cp -r app/(admin)/admin/partners/page.tsx "$DEST/app/(admin)/admin/partners/page.tsx"
cp -r app/(admin)/admin/enterprise/page.tsx "$DEST/app/(admin)/admin/enterprise/page.tsx"
cp -r app/api/credentials/_crypto.ts "$DEST/app/api/credentials/_crypto.ts"
cp -r app/api/credentials/verify/route.ts "$DEST/app/api/credentials/verify/route.ts"
cp -r app/api/credentials/save/route.ts "$DEST/app/api/credentials/save/route.ts"
cp -r app/api/orchestrate/start/route.ts "$DEST/app/api/orchestrate/start/route.ts"
cp -r admin/credentials/credentials.schema.json "$DEST/admin/credentials/credentials.schema.json"
cp -r sql/credentials.sql "$DEST/sql/credentials.sql"
cp -r docs/WebWaka_Master_Document.md "$DEST/docs/WebWaka_Master_Document.md"

printf "Merge complete. Follow README for next steps."
