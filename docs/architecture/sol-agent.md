# Sol Agent Architecture

Status: draft

Sol is the conversational AI layer for Solvinter infrastructure and
documentation.

Sol is not the physical control node. Gate is the physical control node.

## Purpose

Sol should help the operator understand and operate the system by:

- interpreting natural-language requests.
- searching documentation.
- reading repository context.
- summarizing logs.
- proposing safe next actions.
- selecting allowed Gate tools.
- explaining system state in human language.

## Normal model host

The Raspberry Pi Gate should remain lightweight and predictable.

The normal host for local AI should be Storage, not Gate.

Reasons:

- Storage is always-on.
- Storage has more room for disks, RAM and possibly a GPU.
- Gate should stay responsive for control-plane operations.
- Heavy inference on Gate can consume CPU and make control operations less reliable.

Compute 250 may be used for heavier GPU inference or batch AI workloads, but it
should not be required for basic control-plane use.

## Current prototype

A prototype exists on Gate at:

```text
~/solvinter/agent/gate.py
```

Known behavior:

- sends a natural-language request to Qwen 3 1.7B through Ollama.
- maps the request to an allowed CLI command.
- asks for confirmation.
- runs the command.
- captures output.
- attempted to summarize full terminal output through the model.

Known conclusion:

- the agent loop works conceptually.
- Qwen on Raspberry Pi is too slow for summarizing large command output.
- deterministic parsers should extract structured status first.
- the model should reason over structured output rather than raw terminal text.

## Safety constraints

Initial Sol tool access should follow these rules:

- no arbitrary shell execution.
- no `sudo`.
- no delete operations.
- no Git push.
- no system modifications.
- explicit allowlists only.
- show commands before execution when interactive confirmation is appropriate.
- log every action.
- keep node addresses in config, not embedded in code.

## Relation to Gate

Sol may call Gate tools.

Gate should not depend on Sol.

If Sol is unavailable, the operator should still be able to run:

```text
gate status
gate nodes
gate mine status
gate storj status
```

## Open design questions

- Should Sol run as a local service on Storage or as a manual CLI?
- How should repository indexing be stored and updated?
- What is the minimum useful memory system?
- Which Gate commands should be exposed to Sol first?
- How should confirmations be handled remotely?
- How should action logs be written and reviewed?

