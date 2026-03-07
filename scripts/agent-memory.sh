#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_FILE="$ROOT_DIR/.github/ISSUE_TEMPLATE/agent-memory-task.md"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

git_repo() {
  git -C "$ROOT_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1
}

infer_repo() {
  if [[ -n "${GITHUB_REPO:-}" ]]; then
    echo "$GITHUB_REPO"
    return
  fi

  if ! git_repo; then
    echo ""
    return
  fi

  local url
  url="$(git -C "$ROOT_DIR" remote get-url origin 2>/dev/null || true)"
  if [[ -z "$url" ]]; then
    echo ""
    return
  fi

  url="${url%.git}"
  url="${url##*:}"
  url="${url#https://github.com/}"
  echo "$url"
}

cmd_init() {
  require_cmd gh
  if ! gh auth status >/dev/null 2>&1; then
    echo "Run: gh auth login"
    exit 1
  fi
  echo "OK: gh is installed and authenticated"

  local repo
  repo="$(infer_repo)"
  if [[ -z "$repo" ]]; then
    echo "Warning: repo not inferred. Set GITHUB_REPO=owner/name"
  else
    echo "Detected repo: $repo"
  fi

  if [[ -n "${GITHUB_PROJECT_NUMBER:-}" && -z "${GITHUB_OWNER:-}" ]]; then
    echo "Set GITHUB_OWNER for project operations"
    exit 1
  fi
}

cmd_new() {
  require_cmd gh

  local title="${1:-}"
  if [[ -z "$title" ]]; then
    echo "Usage: $0 new \"Issue title\""
    exit 1
  fi

  if [[ ! -f "$TEMPLATE_FILE" ]]; then
    echo "Missing template: $TEMPLATE_FILE"
    exit 1
  fi

  local repo
  repo="$(infer_repo)"
  if [[ -z "$repo" ]]; then
    echo "Cannot infer repo. Set GITHUB_REPO=owner/name"
    exit 1
  fi

  local issue_url
  issue_url="$(gh issue create -R "$repo" --title "$title" --body-file "$TEMPLATE_FILE" --label agent-memory)"
  echo "Created: $issue_url"

  if [[ -n "${GITHUB_PROJECT_NUMBER:-}" && -n "${GITHUB_OWNER:-}" ]]; then
    gh project item-add "$GITHUB_PROJECT_NUMBER" --owner "$GITHUB_OWNER" --url "$issue_url" >/dev/null
    echo "Added to project #$GITHUB_PROJECT_NUMBER"
  fi
}

cmd_append() {
  require_cmd gh

  local issue_number="${1:-}"
  local note_file="${2:-}"
  if [[ -z "$issue_number" || -z "$note_file" ]]; then
    echo "Usage: $0 append <issue_number> <note_markdown_file>"
    exit 1
  fi

  if [[ ! -f "$note_file" ]]; then
    echo "File not found: $note_file"
    exit 1
  fi

  local repo
  repo="$(infer_repo)"
  if [[ -z "$repo" ]]; then
    echo "Cannot infer repo. Set GITHUB_REPO=owner/name"
    exit 1
  fi

  gh issue comment "$issue_number" -R "$repo" --body-file "$note_file" >/dev/null
  echo "Appended update to issue #$issue_number"
}

cmd_close() {
  require_cmd gh

  local issue_number="${1:-}"
  local note_file="${2:-}"
  if [[ -z "$issue_number" ]]; then
    echo "Usage: $0 close <issue_number> [final_note_file]"
    exit 1
  fi

  local repo
  repo="$(infer_repo)"
  if [[ -z "$repo" ]]; then
    echo "Cannot infer repo. Set GITHUB_REPO=owner/name"
    exit 1
  fi

  if [[ -n "$note_file" ]]; then
    if [[ ! -f "$note_file" ]]; then
      echo "File not found: $note_file"
      exit 1
    fi
    gh issue comment "$issue_number" -R "$repo" --body-file "$note_file" >/dev/null
  fi

  gh issue close "$issue_number" -R "$repo" >/dev/null
  echo "Closed issue #$issue_number"
}

main() {
  local cmd="${1:-}"
  shift || true

  case "$cmd" in
    init) cmd_init "$@" ;;
    new) cmd_new "$@" ;;
    append) cmd_append "$@" ;;
    close) cmd_close "$@" ;;
    *)
      echo "Usage: $0 {init|new|append|close} ..."
      exit 1
      ;;
  esac
}

main "$@"
