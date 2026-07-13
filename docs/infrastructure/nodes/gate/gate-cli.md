# Gate CLI

Status: draft

This document describes the intended version-controlled Gate CLI.

The current live CLI is named `sol` and exists outside this repository on the
Raspberry Pi Gate. The next repository implementation should introduce `gate`
without breaking the live workflow.

## Purpose

The Gate CLI should provide deterministic infrastructure operations.

It should be usable by:

- Dominic directly in a terminal.
- scripts.
- the future Sol agent through an allowlisted tool interface.

## Target command shape

Initial commands:

```text
gate status
gate nodes
gate ssh 250
gate ssh storage

gate mine status
gate mine log
gate mine follow
gate mine start
gate mine stop
gate mine restart

gate storj status
gate storj log
gate storj follow
gate storj restart

gate log
gate log "message"
```

Compatibility during migration:

```text
sol status
sol mine status
sol storj status
```

may call the new `gate` implementation temporarily.

## Output rules

Human commands may print readable text.

Status commands should also support structured output, preferably JSON:

```text
gate mine status --json
gate storj status --json
gate nodes --json
```

The goal is to prevent language models from parsing raw terminal output.

## Parser rule

Gate parsers should extract values deterministically.

For mining, this may include:

- service state.
- GPU count.
- GPU names.
- hashrate.
- power.
- temperature.
- accepted shares.
- rejected shares.
- missing expected GPUs.

For Storj, this may include:

- container state.
- mounted disks.
- disk usage.
- recent errors.
- service uptime.

## Security rules

Initial implementation constraints:

- no arbitrary shell execution.
- no `sudo`.
- no delete operations.
- no Git push.
- no hidden system modifications.
- explicit command allowlist.
- show commands before execution when confirmation is required.
- log every action.

## Suggested repository structure

Least disruptive next structure:

```text
tools/
  gate/
    README.md
    gate
    commands/
    parsers/
    config/
```

The repository does not currently contain this implementation.

