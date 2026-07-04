docs/operations/hardware/b250-gpu-cluster.md

---
title: Setting Up a B250 GPU Cluster
description: Standard procedure for building a Solvinter B250 GPU compute node.
status: draft
---

# Setting Up a B250 GPU Cluster

## Purpose

This document describes how to build and configure a standard Solvinter GPU compute node.

The objective is a reproducible system that can be assembled in Sweden or Ghana by following this document step by step.

The completed node supports:

- AI development
- scientific computing
- GPU rendering
- cryptocurrency mining
- remote administration

---

# Hardware

## Motherboard

B250 mining motherboard

- Multiple PCIe slots
- One PCIe x16 slot
- Remaining PCIe x1 slots via risers

## CPU

Document supported processors.

Installed CPU:

(TBD)

## Memory

Maximum supported memory:

(TBD)

Installed memory:

(TBD)

## Graphics Processing Units

Installed GPUs

- 2 × AMD Radeon RX 6600
- 1 × NVIDIA GPU (model to be documented)

The configuration may be expanded later.

## Storage

(TBD)

## Power Supply

Corsair 1000 W

## Cooling

Open-air frame.

Additional fan optional depending on ambient temperature.

## Peripherals Required During Installation

- monitor
- keyboard
- mouse
- ethernet connection

After installation the system operates headless over SSH.

# Operating System

Install Fedora Workstation.

During installation:

- create administrator account
- enable SSH later
- update system immediately after first boot


