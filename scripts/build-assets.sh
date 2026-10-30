#!/usr/bin/env bash
# Ensures moon assets exist before `next build` (renders them on clean checkouts).
set -euo pipefail
cd "$(dirname "$0")/.."
if [ -f public/moon/moon-1000.webp ] && [ -f public/moon/moon-1800.webp ] && [ -f public/og.jpg ]; then
  echo "moon assets present, skipping"
  exit 0
fi
python3 -c "import numpy, PIL" 2>/dev/null || python3 -m pip install --quiet --user numpy pillow || python3 -m pip install --quiet --break-system-packages numpy pillow
python3 scripts/build-moon-assets.py
