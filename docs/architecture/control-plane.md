# Control Plane Architecture

Status: draft

This document defines the separation between Gate, Sol, Compute 250 and Storage.

## Core distinction

Gate is the physical control node.

Sol is the AI agent.

The earlier Bash command name `sol` mixed these two ideas. That name worked as
a useful convention during prototyping, but the system now needs a clearer
boundary:

- `gate`: deterministic infrastructure CLI/API.
- `sol`: conversational AI interface.

## Intended control flow

```text
Dominic
  -> Sol
  -> Gate
  -> Compute 250 / Storage / future nodes
```

Sol interprets language, plans, summarizes and chooses tools.

Gate executes allowed infrastructure operations.

Compute 250 and Storage perform the work.

## Gate responsibilities

Gate should handle:

- SSH access.
- Tailscale access.
- `systemctl` checks for known services.
- `journalctl` reads for known services.
- Docker status checks on Storage.
- node status.
- monitoring.
- simple automation.
- action logging.

Gate should avoid:

- arbitrary shell execution exposed to AI.
- heavy language model inference.
- deleting files.
- pushing Git changes through AI tools.
- uncontrolled `sudo`.
- direct IP addresses in code when config can be used.

## Sol responsibilities

Sol should handle:

- natural language.
- planning.
- documentation and repository search.
- code assistance.
- summaries.
- reasoning over structured status.
- selecting appropriate Gate tools.

Sol should not be required for basic operation. If Sol is offline, Gate should
still allow deterministic commands from a terminal.

## Structured data rule

The language model should not parse large terminal tables or invent operational
values.

Normal code should extract values such as:

- uptime.
- service state.
- GPU count.
- hashrate.
- power.
- temperature.
- accepted shares.
- rejected shares.
- warnings.

The language model may interpret already structured data.

Example target output:

```json
{
  "node": "compute-250",
  "service": "active",
  "workload": "ergo-mining",
  "total_hashrate_mhs": 103.7,
  "total_power_w": 173.3,
  "warnings": [
    "Expected RTX 3060 Ti is not present"
  ]
}
```

## Capability layers

Documentation is not enforcement.

Application-level capability is what the Gate CLI/API exposes.

Linux permissions are what the operating system allows the user account to do.

AI tool access is the subset of Gate operations intentionally exposed to Sol.

These layers should be documented separately so the project does not confuse
"the AI is allowed to ask" with "the system can execute anything."

## Migration principle

Do not break the live Raspberry Pi.

The current live command is:

```text
~/solvinter/bin/sol
```

The migration should introduce `gate` while keeping a compatibility wrapper or
clear transition path for the old `sol` command.

