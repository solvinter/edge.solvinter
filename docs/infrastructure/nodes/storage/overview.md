# Storage Overview

Status: draft

Storage is the Dell storage server.

It should become both the storage node and the normal host for Solvinter local
AI services.

## Known hardware

Known configuration:

- Dell storage server.
- Two 1 TB HDDs in RAID.
- 250 GB SSD.
- Room for a GTX 1060.
- Room for additional RAM.

## Current service

Storage currently runs Storj in Docker.

This is recorded in:

- `docs/logs/2026/2026-07-04.md`

The repository does not yet contain a complete Storj operations guide.

## Target roles

Storage should host:

- Storj.
- Ollama.
- local models.
- repository indexing.
- Sol memory.
- agent services.

## Critical separation

Storj data and AI model storage must remain separated.

Suggested separation:

```text
/srv/storj/
/srv/solvinter/models/
/srv/solvinter/index/
/srv/solvinter/memory/
```

Exact paths should be confirmed on the live server before documenting as final.

## Gate integration

Gate should be able to ask Storage for:

- Docker container status.
- Storj service status.
- recent Storj logs.
- disk usage.
- model service status.
- Ollama availability.

Gate should expose structured output for Sol.

## Missing documentation

Needed next:

- Storj install and recovery guide.
- Docker container configuration.
- disk layout.
- backup policy.
- model storage policy.
- Ollama install target.
- repository indexing plan.

