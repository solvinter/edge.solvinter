# Tailscale Control Plane

Status: draft

Tailscale is the private network layer for Solvinter infrastructure.

Existing documentation:

- `docs/operations/network/tailscale.md`

This document places Tailscale in the Gate/Sol architecture.

## Role

Tailscale allows Gate, Compute 250, Storage and future nodes to communicate
without exposing services directly to the public Internet.

## Control model

Gate should use Tailscale names or configured addresses to reach nodes.

Node addresses should live in configuration, such as:

```text
~/solvinter/config/nodes.conf
```

They should not be embedded directly in versioned command code.

## Required node records

Each node should eventually have:

- name.
- role.
- hostname.
- Tailscale name or address.
- SSH user.
- operating system.
- expected services.
- notes on whether it is always-on.

## Future document

Create:

```text
docs/infrastructure/network/hostnames.md
```

That file should list actual node names and access details that are safe to
version. Secrets and private credentials should not be committed.

