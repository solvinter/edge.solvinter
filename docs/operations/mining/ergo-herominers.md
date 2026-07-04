# Ergo Mining with HeroMiners

## Purpose

Mining is used as a hardware verification workload.

Successful mining confirms:

- PCIe stability
- GPU driver installation
- CUDA functionality
- ROCm functionality
- cooling
- power delivery
- long-term system stability

Mining is therefore treated as a validation workload before AI and research applications are deployed.

---

## Install lolMiner

```bash
mkdir -p ~/Applications/lolminer
cd ~/Applications/lolminer

wget https://github.com/Lolliedieb/lolMiner-releases/releases/download/1.98a/lolMiner_v1.98a_Lin64.tar.gz

tar -xvf lolMiner_v1.98a_Lin64.tar.gz

cd 1.98a

./lolMiner --version
```

---

## Wallet

Wallet addresses should never be committed to Git.

Create a local configuration file instead.

Example:

wallet.conf

This file should be ignored by Git.

---

## Example Start

```bash
./lolMiner \
--algo AUTOLYKOS2 \
--pool de.ergo.herominers.com:1180 \
--user YOUR_WALLET.WORKER \
--watchdog exit
```

Replace:

YOUR_WALLET

with your own Ergo wallet.

Example worker names:

250

dell

gateway

---

## Verification

Mining has started successfully when:

- shares are accepted
- GPU temperature is stable
- hashrate remains constant
- no hardware errors occur

---

## Philosophy

Mining is not the primary purpose of Solvinter.

Mining serves as a reproducible, real-world GPU workload that validates hardware before deploying AI models, rendering pipelines or scientific computing.

