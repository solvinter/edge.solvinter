# Compute 250 Overview

Status: draft

Compute 250 is the current GPU compute node.

It is based on the B250 GPU cluster documented in:

- `docs/operations/hardware/b250-gpu-cluster.md`
- `docs/operations/workstations/fedora-workstation.md`

## Current role

Compute 250 currently runs mining as a validation workload.

Mining is not the main purpose of Solvinter. It is used to verify that the node
can run sustained GPU workloads with stable drivers, power and cooling.

## Known hardware

Known configuration:

- Fedora-based workstation.
- B250 mining motherboard.
- Two AMD Radeon RX 6600 GPUs.
- NVIDIA RTX 3060 Ti, when installed and detected.
- Corsair 1000 W power supply.
- Open-air frame.

The NVIDIA GPU may not always appear in active miner output. Gate status should
therefore distinguish between expected hardware and detected hardware.

## Known services

Known mining service:

```text
mining.service
```

Known workload:

- lolMiner.
- Ergo / Autolykos2 via HeroMiners.

## Future role

Compute 250 may later support:

- heavier AI workloads.
- batch jobs.
- GPU inference.
- scientific compute.
- rendering.

## Gate integration

Gate should be able to ask Compute 250 for:

- service state.
- miner log tail.
- GPU count.
- GPU names.
- hashrate.
- power draw.
- temperatures.
- accepted and rejected shares.
- warnings when expected GPUs are absent.

Gate should parse these values in normal code and expose JSON when requested.

## Related files

- `docs/operations/mining/ergo-herominers.md`
- `docs/operations/mining/lolminer.md`
- `docs/operations/drivers/nvidia.md`
- `docs/operations/drivers/rocm.md`
- `docs/operations/network/tailscale.md`
- `docs/logs/2026/2026-07-04.md`

