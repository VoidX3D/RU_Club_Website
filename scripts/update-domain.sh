#!/usr/bin/env bash
# update-domain.sh — Switch site domain everywhere.
# Usage: bash scripts/update-domain.sh ruclub.rweb.site ruclub.motherland.edu.np
# Or:    bash scripts/update-domain.sh ruclub.motherland.edu.np ruclub.rweb.site

set -euo pipefail

if [ $# -ne 2 ]; then
  echo "Usage: $0 OLD_DOMAIN NEW_DOMAIN"
  echo "Example: $0 ruclub.rweb.site ruclub.motherland.edu.np"
  exit 1
fi

OLD="$1"
NEW="$2"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Switching domain from $OLD → $NEW in static files..."

# Static files that can't import TypeScript constants
FILES=(
  "$ROOT/index.html"
  "$ROOT/public/sitemap.xml"
  "$ROOT/public/robots.txt"
  "$ROOT/README.md"
  "$ROOT/DOCUMENTATION.md"
)

for f in "${FILES[@]}"; do
  if [ -f "$f" ]; then
    sed -i "s|$OLD|$NEW|g" "$f"
    echo "  ✓ $f"
  else
    echo "  ✗ $f (not found)"
  fi
done

echo ""
echo "Done! Don't forget to update src/data/index.ts SITE_URL too, then rebuild and redeploy."
echo "  SITE_URL in src/data/index.ts is the single source of truth for all TS/TSX files."
