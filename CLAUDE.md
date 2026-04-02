# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Mantis is a CLI scaffold tool. Running `mantis new myapp` generates a production-ready project with Next.js frontend, FastAPI backend, and Pocketbase for auth/DB. The generated project uses NixOS flakes as the primary dev environment.

## CLI Development (Go)

All CLI source is in `cli/`. No external dependencies — stdlib only.

```bash
# Run directly
cd cli && go run . new my-project

# Build
cd cli && go build -o mantis .

# Test with a local template override (avoids GitHub download)
cd cli && go run . new my-project --template-path ../template
```

The CLI has no test files yet. When adding tests, run them with `go test ./...` from `cli/`.

## Template Structure

`template/` contains the files copied into each generated project:

- `template/frontend/` — Next.js app (App Router, TypeScript, Tailwind, shadcn/ui)
- `template/backend/` — FastAPI app wired to Pocketbase auth
- `template/ops/` — NixOS flake (`flake.nix`), deploy script, direnv config

The placeholder `__project_name__` in template files gets replaced with the actual project name at scaffold time. Binary files (SVG, PNG, fonts) and `package-lock.json` are skipped during replacement.

## How Template Resolution Works

`template_source.go` resolves templates in this priority order:
1. `--template-path <path>` flag (local directory)
2. `~/.mantis/cache/` (cached from last GitHub download, validated against latest release tag)
3. GitHub latest release of `alvinliju/mantis` (zipball downloaded and extracted)

Override the source repo with `MANTIS_TEMPLATE_REPO=owner/repo`. Set `MANTIS_GITHUB_TOKEN` to avoid GitHub API rate limits.

**To test CLI changes against the local template without a GitHub release**, always use `--template-path ../template`.

## Generated Project Dev Workflow

Inside a generated project:
```bash
nix develop        # starts the full dev environment (frontend + backend + pocketbase)
direnv allow       # alternative: auto-loads on cd
```

Deploy to a VPS via `ops/deploy.sh`. Secrets go in `.env`, never in `flake.nix`. Update the domain in `ops/nixos/configuration.nix`.

## Frontend Template Notes

The frontend CLAUDE.md (`template/frontend/CLAUDE.md`) references `template/frontend/AGENTS.md`, which warns: this Next.js version may have breaking changes from training data — read `node_modules/next/dist/docs/` before writing frontend code.
