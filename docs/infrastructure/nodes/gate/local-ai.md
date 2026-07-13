# Local AI and Gate

Status: draft

Gate should not be the normal host for local language models.

## Current finding

A prototype agent on Gate used Qwen 3 1.7B through Ollama.

It showed that natural-language command selection can work, but it also showed
that the Raspberry Pi is too constrained for heavy model use. The model used
nearly all four CPU cores and timed out while summarizing larger `systemctl`
output.

## Architectural decision

Gate remains the control node.

Storage becomes the normal local AI host.

Compute 250 can provide heavier GPU inference or batch work when needed.

## Why Storage

Storage is better suited for always-on local AI because:

- it is already an always-on server.
- it has more disk capacity.
- it can separate model storage from Storj data.
- it has room for more RAM.
- it may later host a GTX 1060.

## What Gate should do

Gate should:

- call known services.
- collect status.
- run deterministic parsers.
- return structured output.
- expose allowlisted tools to Sol.

Gate should not:

- summarize large terminal output with a local model.
- run heavy inference as a normal operating mode.
- depend on AI for basic operations.

## Open tasks

- Document Ollama installation target on Storage.
- Decide model storage path.
- Define separation between Storj data and AI model data.
- Define Sol memory/index storage.
- Define how Sol calls Gate tools.

