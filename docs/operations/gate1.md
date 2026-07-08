# Gate1

Gate1 is the entry point into Solvinter Edge.

It runs on a Raspberry Pi and provides a simple operational interface to the rest of the node.

## Current role

- SSH entry point
- Tailscale access
- Sol CLI
- control of Compute 250
- mining start/stop/status
- future AI assistant

## Access

From the Mac:

```bash
ssh gate
Sol CLI
sol status
sol nodes
sol compute
sol storage
sol mine start
sol mine stop
sol mine status
sol mine log
sol mine follow
Mining

Mining runs on Compute 250 as a systemd service:
mining.service
Gate controls it remotely through:
sol mine start
sol mine stop
sol mine status
Philosophy

Gate is not only a server.

It is the human entry point into Solvinter Edge.

Its purpose is to reduce cognitive load by remembering commands, nodes and procedures.
