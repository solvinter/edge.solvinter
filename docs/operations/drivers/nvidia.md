# NVIDIA Driver

## Purpose

The NVIDIA driver enables Linux to communicate with NVIDIA GPUs.

Without the driver, the operating system can detect the graphics card but cannot use it for GPU computing.

## Why Solvinter uses NVIDIA

NVIDIA GPUs are used for:

- Artificial intelligence
- CUDA applications
- Scientific computing
- Rendering
- Cryptocurrency mining

## Installation

Enable RPM Fusion.

```bash
sudo dnf install \
https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

Install the NVIDIA driver.

```bash
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda
```

Reboot.

```bash
sudo reboot
```

## Verification

```bash
nvidia-smi
```


## Detect NVIDIA Hardware

Before installing the driver, verify that Linux detects the graphics card.

```bash
lspci | grep -i nvidia
```

Example:

```text
01:00.0 VGA compatible controller: NVIDIA Corporation GA104 [GeForce RTX 3060 Ti Lite Hash Rate]
```

Check whether the NVIDIA driver is already installed.

```bash
rpm -qa | grep -i nvidia
```

If only `nvidia-gpu-firmware` is listed, the proprietary NVIDIA driver has not yet been installed.


## Install the Driver

Install the proprietary NVIDIA driver together with CUDA support.

```bash
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda
```

The driver is compiled automatically for the running kernel.

After installation, reboot the workstation.


## Successful Verification

NVIDIA is working when `nvidia-smi` shows the GPU, driver version and CUDA version.

Example from node `250`:

```text
NVIDIA GeForce RTX 3060 Ti
Driver Version: 595.80
CUDA Version: 13.2
8192 MiB VRAM
This confirms that the NVIDIA kernel module was built for the running kernel and loaded correctly.


## Notes

Always verify the running kernel before installing NVIDIA drivers.

```bash
uname -r
rpm -q kernel kernel-devel
```

If the running kernel and the installed kernel development package differ, the NVIDIA kernel module cannot be built.


## Notes

Always verify the running kernel before installing NVIDIA drivers.

```bash
uname -r
rpm -q kernel kernel-devel
```

If the running kernel and the installed kernel development package differ, the NVIDIA kernel module cannot be built.

