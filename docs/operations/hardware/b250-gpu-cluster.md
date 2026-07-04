# B250 GPU Cluster

## Purpose

The B250 GPU Cluster is the standard Solvinter compute node.

It is designed to provide inexpensive and modular GPU computing for artificial intelligence, scientific research and cryptocurrency mining.

The design prioritizes simplicity, low cost, remote administration and ease of maintenance.


## Hardware

### Motherboard

B250 mining motherboard.

The motherboard provides one PCIe x16 slot and multiple PCIe x1 slots for GPU expansion using risers.

### CPU

Intel processor compatible with the B250 chipset.

CPU requirements are modest because most computation is performed on the GPUs.

### Memory

Install sufficient RAM for Linux and GPU workloads.

Memory requirements depend on the intended applications.

### GPUs

Current configuration

- AMD Radeon RX 6600
- AMD Radeon RX 6600
- NVIDIA GPU (model documented separately)

### Storage

Solid-state drive.

### Power Supply

Corsair 1000 W.

### Cooling

Open-air frame.

Additional cooling fans may be installed depending on ambient temperature.


## Why this hardware?

Mining hardware has become an inexpensive platform for GPU computing.

Instead of securing blockchains alone, the same hardware can now support:

- Artificial intelligence
- Scientific computing
- Medical research
- Rendering
- Software development
- Cryptocurrency mining

The objective is to maximize useful computation per invested dollar.


## Operating System

Fedora Workstation is used as the standard operating system.

Fedora provides current kernels, excellent hardware support and rapid access to modern development tools.

After installation the workstation becomes a headless compute node managed remotely through SSH and Tailscale.

# B250 GPU Cluster

## Boot Verification

Before installing GPU drivers or mining software, verify that the system boots reliably with the intended hardware configuration.

### Risers

A system that boots without risers but fails to boot when risers are installed should be treated as a hardware issue rather than an operating system issue.

Possible causes include:

- defective PCIe riser
- faulty USB cable between riser and adapter
- insufficient power delivery
- BIOS PCIe configuration
- defective GPU

### Troubleshooting

1. Boot without risers.
2. Boot with one riser only.
3. Test each riser individually.
4. Test each USB cable individually.
5. Add one GPU at a time.
6. Only begin software installation after stable hardware has been verified.

Stable hardware should always be established before installing NVIDIA drivers, CUDA, Docker, mining software or research applications.


## PCIe Verification

Verify that all GPUs are detected before installing drivers.

```bash
sudo lspci
```

Expected hardware for the first Solvinter B250 cluster:

- NVIDIA GeForce RTX 3060 Ti LHR
- AMD Radeon RX 6600
- AMD Radeon RX 6600

Detection by `lspci` confirms that the motherboard, PCIe bus and risers are functioning correctly. Driver installation can begin only after successful PCIe detection.

# B250 GPU Cluster

## Boot Verification

Before installing GPU drivers or mining software, verify that the system boots reliably with the intended hardware configuration.

### Risers

A system that boots without risers but fails to boot when risers are installed should be treated as a hardware issue rather than an operating system issue.

Possible causes include:

- defective PCIe riser
- faulty USB cable between riser and adapter
- insufficient power delivery
- BIOS PCIe configuration
- defective GPU

### Troubleshooting

1. Boot without risers.
2. Boot with one riser only.
3. Test each riser individually.
4. Test each USB cable individually.
5. Add one GPU at a time.
6. Only begin software installation after stable hardware has been verified.

Stable hardware should always be established before installing NVIDIA drivers, CUDA, Docker, mining software or research applications.

