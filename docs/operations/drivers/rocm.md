# AMD ROCm

## Purpose

ROCm is AMD's GPU computing platform.

It provides the equivalent of CUDA for AMD GPUs.

ROCm enables:

- AI inference
- AI training
- scientific computing
- rendering
- GPU acceleration

## Supported Hardware

Current Solvinter node 250 contains:

- Radeon RX 6600
- Radeon RX 6600

## Verification

Detect AMD GPUs:

```bash
lspci | grep VGA
```

Verify ROCm:

```bash
rocminfo
```

Monitor GPUs:

```bash
rocm-smi
```

