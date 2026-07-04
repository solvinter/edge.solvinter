# Tailscale

## Purpose

Tailscale creates a secure private network between all Solvinter devices, regardless of their physical location.

Once connected, every workstation, server and Raspberry Pi behaves as if they were connected to the same local network, even when they are located in different countries.

This makes it possible to administer systems remotely using SSH without exposing services directly to the public Internet or configuring complex firewall rules.

Typical use cases include:

- Remote SSH access
- File transfers
- Cluster administration
- Development from laptops
- Remote monitoring
- Access between Sweden and Ghana


## Verification

Confirm that the node has successfully joined the private network.

```bash
tailscale status
tailscale ip
```

The workstation should appear in the list of connected devices and be reachable over SSH using its Tailscale IP address.


## Result

The workstation is now fully operational as a headless node.

From this point forward, a monitor, keyboard and mouse are no longer required.

All administration can be performed remotely using SSH over the private Tailscale network.

