#!/usr/bin/env python3
"""Validate editable HTML CV sources and report exact duplicates."""

from __future__ import annotations

import argparse
import hashlib
import re
import sys
from pathlib import Path


REQUIRED_PATTERNS = {
    "US Letter page size": r"@page\s*\{[^}]*size:\s*Letter",
    "Arial font": r"font-family:\s*Arial",
    "10.5 pt body text": r"font-size:\s*10\.5pt",
    "1.5 line spacing": r"line-height:\s*1\.5",
    "work history": r">(?:Work History(?:\s*\(continued\))?|Experiencia profesional)<",
    "education": r">(?:Education(?:\s*&amp;\s*Certificates)?|Educaci[oó]n)<",
}

FORBIDDEN_PATTERNS = {
    "image": r"<img\b",
    "table layout": r"<table\b",
    "unfinished placeholder": r"\{\{[A-Z0-9_]+\}\}|\bTODO:",
}


def validate_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    errors: list[str] = []
    for label, pattern in REQUIRED_PATTERNS.items():
        if not re.search(pattern, text, flags=re.IGNORECASE | re.DOTALL):
            errors.append(f"missing {label}")
    for label, pattern in FORBIDDEN_PATTERNS.items():
        flags = 0 if label == "unfinished placeholder" else re.IGNORECASE
        if re.search(pattern, text, flags=flags):
            errors.append(f"contains {label}")

    lower = text.lower()
    education = max(
        lower.rfind(">education<"),
        lower.rfind(">education &amp; certificates<"),
        lower.rfind(">educación<"),
    )
    work_positions = [
        pos
        for pos in (lower.find(">work history<"), lower.find(">experiencia profesional<"))
        if pos != -1
    ]
    work = min(work_positions) if work_positions else -1
    if education != -1 and work != -1 and education < work:
        errors.append("education appears before work history")
    return errors


def audit_directory(directory: Path) -> int:
    files = sorted(directory.glob("*.html"))
    hashes: dict[str, list[Path]] = {}
    failures = 0
    for path in files:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        hashes.setdefault(digest, []).append(path)
        errors = validate_file(path)
        legacy_order = "education appears before work history"
        if legacy_order in errors:
            errors.remove(legacy_order)
            print(f"WARN {path}: legacy education placement; move it after experience on the next edit")
        if errors:
            failures += 1
            print(f"FAIL {path}: {'; '.join(errors)}")

    duplicates = [paths for paths in hashes.values() if len(paths) > 1]
    for paths in duplicates:
        failures += 1
        print("DUPLICATE " + ", ".join(str(path) for path in paths))

    print(f"Audited {len(files)} HTML CV sources; failures={failures}")
    return 1 if failures else 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path", nargs="?", type=Path)
    parser.add_argument("--audit-dir", type=Path)
    args = parser.parse_args()

    if args.audit_dir:
        return audit_directory(args.audit_dir)
    if not args.path:
        parser.error("provide an HTML file or --audit-dir")
    errors = validate_file(args.path)
    if errors:
        print(f"FAIL {args.path}: {'; '.join(errors)}")
        return 1
    print(f"PASS {args.path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
