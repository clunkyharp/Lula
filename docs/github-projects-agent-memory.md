# GitHub Projects as AI Agent Memory

This project uses GitHub Issues + GitHub Projects as persistent memory across coding sessions.

## Why

- Agent context windows reset between sessions.
- Issue + Project state keeps durable memory: goals, constraints, progress, decisions, blockers.
- Every session starts from existing memory instead of re-discovery.

## Workflow

1. Create one issue per task using the `agent-memory-task` template.
2. Add the issue to your GitHub Project board.
3. Keep fields up to date after each session:
   - status
   - summary
   - decisions
   - next steps
   - blockers
4. Link PRs/commits in issue comments.
5. Close issue only when acceptance criteria are met.

## Suggested Project Columns

- Backlog
- Ready
- In Progress
- Blocked
- Review
- Done

## Minimal Team Rules

- Never start implementation without a memory issue.
- Every meaningful architectural decision must be captured in the issue.
- Session handoff must include explicit next action.
- Keep one source of truth: issue thread + project status.

## CLI Setup

Install GitHub CLI and grant required scopes:

- macOS: `brew install gh`
- Auth: `gh auth login`
- Scopes for Projects: `gh auth refresh -s project`

## Automation Script

Use `scripts/agent-memory.sh`:

- `init`: checks prerequisites
- `new`: creates a memory issue from template and optionally adds to project
- `append`: appends a session update comment
- `close`: closes issue with final handoff note

### Environment Variables

- `GITHUB_OWNER` (required for project operations)
- `GITHUB_REPO` (default inferred from git remote)
- `GITHUB_PROJECT_NUMBER` (optional, enables auto-add to project)

## Example Session Update

- What was completed
- What changed technically
- Risks and unresolved questions
- Exact next action for the next session
