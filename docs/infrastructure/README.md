# Solvinter Infrastructure

Status: draft

This directory describes the operational infrastructure behind Solvinter Edge.
It is not the public story of Solvinter. It is the working manual for the
machines, network, services and control plane that make the system observable
and controllable.

## Current model

Solvinter infrastructure is organized around three practical roles:

- Gate: the always-on control node.
- Storage: the always-on storage and local AI service host.
- Compute 250: the GPU compute node for validation workloads and heavier jobs.

The intended control flow is:

```text
Dominic
  -> Sol
  -> Gate
  -> Compute 250 / Storage / future nodes
```

Gate must continue to work when Sol is unavailable. Sol may use Gate as a tool,
but Gate should not depend on Sol.

## Current repository state

Material already in the repository:

- `docs/operations/gate1.md` describes Gate1 as the control node.
- `docs/operations/network/tailscale.md` documents Tailscale as the private network layer.
- `docs/operations/hardware/b250-gpu-cluster.md` documents the B250 GPU cluster.
- `docs/operations/workstations/fedora-workstation.md` documents Fedora setup for the GPU node.
- `docs/operations/mining/ergo-herominers.md` documents Ergo mining as a validation workload.
- `docs/operations/mining/lolminer.md` documents lolMiner.
- `docs/logs/2026/2026-07-04.md` records Gate1, Node250 and Dell/Storj status.
- `docs/logs/2026/2026-06-30-first-year.md` records first-year infrastructure experiments.

Known live-system material not yet versioned here:

- `~/solvinter/bin/sol` on Gate: current Bash CLI.
- `~/solvinter/config/nodes.conf` on Gate: node address configuration.
- `~/solvinter/agent/gate.py` on Gate: prototype natural-language command mapper.

Known expected file not visible in this local checkout:

- `docs/operations/gate-capabilities.yaml`

If that file exists on another clone or on Gate, it should be reintroduced or
superseded by a versioned capabilities document under `docs/infrastructure/`.

## Source of truth

Stable documentation should live in `docs/infrastructure/`.

Chronological observations should live in `docs/logs/`.

Older operational notes under `docs/operations/` should be preserved until they
are migrated into the infrastructure tree.

Generated frontend data such as `src/app/generated/research-data.js` is not the
source of truth. It is generated from `docs/`.

