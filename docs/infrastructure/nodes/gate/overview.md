# Gate Overview

Status: draft

Gate is the always-on physical control node for Solvinter infrastructure.

Current hardware:

- Raspberry Pi 4.

Current role:

- lightweight control plane.
- Tailscale access point.
- SSH jump/control node for other machines.
- operator interface for infrastructure commands.

Gate should remain stable, predictable and low-power. It should not be the main
machine for running language models.

## Current live implementation

The current live Bash CLI exists on Gate at:

```text
~/solvinter/bin/sol
```

It reads node configuration from:

```text
~/solvinter/config/nodes.conf
```

Known implemented command families include:

```text
sol status
sol nodes
sol compute
sol storage
sol ssh 250
sol ssh storage

sol mine start
sol mine stop
sol mine restart
sol mine status
sol mine log
sol mine follow

sol storj
sol storj status
sol storj log
sol storj follow
sol storj restart

sol log
sol log "message"
```

The CLI uses SSH to reach Compute 250 and Storage.

## Naming migration

The old command name `sol` should be migrated.

New naming:

- `gate`: CLI/API for deterministic infrastructure operations.
- `sol`: conversational AI interface.

The live system should not be broken during migration. A compatibility wrapper
from `sol` to `gate` may be kept temporarily.

## Design principles

Gate should:

- remain online.
- run headless.
- avoid sleep/suspend/hibernate.
- expose explicit, allowlisted operations.
- log actions.
- use Tailscale for private network access.
- use config files for node addresses.
- keep working if Sol is offline.

Gate should not:

- run heavy model inference.
- expose arbitrary shell execution to AI.
- embed private IPs or secrets in versioned code.
- modify systems without explicit allowed commands.

## Related files

Existing documentation:

- `docs/operations/gate1.md`
- `docs/operations/network/tailscale.md`
- `docs/logs/2026/2026-07-04.md`

Recommended future implementation:

- `tools/gate/gate`
- `tools/gate/README.md`
- `tools/gate/commands/`
- `tools/gate/parsers/`
- `tools/gate/config/`

