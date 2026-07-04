# Gate1

## Purpose

Gate1 is the control node of the Solvinter infrastructure.

Its primary purpose is not computation, but orchestration, automation and interaction between the operator and the distributed system.

## Responsibilities

- SSH access to all nodes
- Tailscale connectivity
- Git operations
- Documentation
- Cluster status
- Automation
- AI interface
- Monitoring

## Design principles

Gate1 should:

- always remain online
- consume little power
- operate headless
- never suspend
- require minimal maintenance
- remain independent of GPU workloads

## Long-term vision

Rather than remembering IP addresses and complex shell commands, the operator interacts with the infrastructure through a small set of high-level commands.

Examples:

sol status
sol ssh 250
sol mine start
sol temps
sol storj

In the future these commands may be executed through a language model, making Gate1 the natural interface between the human operator and the infrastructure.
