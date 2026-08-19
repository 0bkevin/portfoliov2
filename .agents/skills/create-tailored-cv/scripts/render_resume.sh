#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "usage: $0 INPUT.html [OUTPUT.pdf]" >&2
  exit 2
fi

input_path=$(realpath "$1")
if [[ ! -f "$input_path" ]]; then
  echo "input does not exist: $input_path" >&2
  exit 1
fi

if [[ $# -eq 2 ]]; then
  output_path=$(realpath -m "$2")
else
  stem=$(basename "$input_path" .html)
  output_path=$(realpath -m "tmp/pdfs/$stem/$stem.pdf")
fi
mkdir -p "$(dirname "$output_path")"

chromium_path=${CHROMIUM_BIN:-}
if [[ -z "$chromium_path" ]]; then
  for candidate in chromium chromium-browser google-chrome google-chrome-stable; do
    if command -v "$candidate" >/dev/null 2>&1; then
      chromium_path=$(command -v "$candidate")
      break
    fi
  done
fi
if [[ -z "$chromium_path" ]]; then
  chromium_path=$(find /home/kevin/.cache/ms-playwright -type f -path '*/chrome-linux64/chrome' -perm -111 2>/dev/null | sort | tail -1 || true)
fi
if [[ -z "$chromium_path" || ! -x "$chromium_path" ]]; then
  echo "Chromium not found; set CHROMIUM_BIN to an executable path" >&2
  exit 1
fi

"$chromium_path" \
  --headless=new \
  --no-sandbox \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$output_path" \
  "file://$input_path" >/dev/null 2>&1

if ! strings "$output_path" | grep -F '/MediaBox [0 0 612 792]' >/dev/null; then
  echo "rendered PDF is not US Letter: $output_path" >&2
  exit 1
fi

expected_pages=${EXPECTED_PAGES:-2}
if ! strings "$output_path" | grep -F "/Count $expected_pages" >/dev/null; then
  echo "warning: expected $expected_pages pages; inspect $output_path manually" >&2
fi

echo "$output_path"
