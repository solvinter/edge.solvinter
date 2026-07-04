# Docker

## Purpose

Docker runs applications inside isolated containers.

## Why Solvinter uses Docker

Many AI systems, databases and research applications are distributed as Docker containers.

## Installation

```bash
sudo dnf install docker
sudo systemctl enable --now docker
docker --version
```

## Verification

```bash
docker run hello-world
```


## Result

Docker is installed and verified.

The first test may require `sudo`:

```bash
sudo docker run hello-world
If the command prints Hello from Docker!, the installation is working.

