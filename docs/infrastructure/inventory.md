# Infrastructure Inventory

Status: draft

This document lists the known Solvinter infrastructure nodes and their intended
roles. It should become the practical index for hostnames, operating systems,
services and maintenance responsibilities.

## Gate

Role: control node and control plane.

Known hardware:

- Raspberry Pi 4

Known responsibilities:

- Always-on access point for infrastructure operations.
- Tailscale connectivity.
- SSH access to Compute 250 and Storage.
- Lightweight monitoring and automation.
- Documentation and Git workflow support.

Current live-system paths:

- `~/solvinter/bin/sol`
- `~/solvinter/config/nodes.conf`
- `~/solvinter/agent/gate.py`

Target documentation:

- `docs/infrastructure/nodes/gate/overview.md`
- `docs/infrastructure/nodes/gate/gate-cli.md`
- `docs/infrastructure/nodes/gate/local-ai.md`

## Compute 250

Role: GPU compute node.

Known hardware:

- Fedora-based GPU machine.
- B250 mining motherboard.
- Two AMD Radeon RX 6600 GPUs.
- NVIDIA RTX 3060 Ti, when present.

Known services:

- `mining.service`
- lolMiner / Ergo validation workload.

Target uses:

- GPU validation.
- AI workloads.
- Batch jobs.
- GPU inference.
- Scientific or rendering workloads.

Target documentation:

- `docs/infrastructure/nodes/compute-250/overview.md`
- `docs/operations/hardware/b250-gpu-cluster.md`
- `docs/operations/workstations/fedora-workstation.md`
- `docs/operations/mining/ergo-herominers.md`
- `docs/operations/mining/lolminer.md`

## Storage

Role: storage node and normal local AI model host.

Known hardware:

- Dell storage server.
- Two 1 TB HDDs in RAID.
- 250 GB SSD.
- Room for GTX 1060.
- Room for additional RAM.

Known services:

- Storj in Docker.

Target uses:

- Storj storage node.
- Ollama host.
- Model storage.
- Repository indexing.
- Local memory and agent services.

Important separation:

- Storj data and AI model storage must remain separate.

Target documentation:

- `docs/infrastructure/nodes/storage/overview.md`

## Future nodes

Future nodes should follow the same pattern:

- role
- hardware
- operating system
- network access
- services
- data location
- backup method
- monitoring
- owner and maintenance notes

