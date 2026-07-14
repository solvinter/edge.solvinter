# ADR-0003 — Responsible Storage

Status: Accepted  
Date: 2026-07-14  
Decision owner: Founder of Solvinter

## Context

Solvinter continuously weighs technical and economic opportunities against ethical principles.

Working conditions may be more important than a few additional percentage points of profit. Local usefulness may be more important than participating blindly in a global market. The same principle must apply to the infrastructure Solvinter builds and operates.

The emerging world of distributed computing, artificial intelligence and networked storage creates new possibilities. It will also create new forms of misuse and new ethical conflicts.

These questions cannot be treated as secondary to technical performance or revenue.

## Distinctions

Solvinter distinguishes between several concepts that are often combined:

- distributed infrastructure;
- decentralised control;
- privacy;
- anonymity;
- local ownership;
- accountable governance.

Distributed infrastructure does not necessarily require anonymous storage.

Local control does not require the infrastructure to be incapable of knowing what it stores.

Privacy should protect people. It does not automatically follow that every storage system should be designed as a general-purpose place where neither operators nor institutions can ever inspect or govern what is stored.

## Ethical concern

There are legitimate reasons for people to require exceptionally protected storage.

Journalists, artists, human-rights defenders and people living under political repression may need systems that protect information from governments, institutions or other powerful actors.

Solvinter respects this need.

However, designing and governing such infrastructure is a specialised ethical, legal and technical field. It requires careful threat modelling, legal expertise, safeguards against abuse and a deep understanding of the people it is intended to protect.

This is not currently Solvinter's speciality.

General-purpose systems in which nobody can know what is being stored may also be used by organised crime and other actors involved in severe forms of exploitation and harm.

For Solvinter, the legitimate benefits of participating in such a storage network do not currently outweigh the ethical risks.

This is a risk assessment and a decision about Solvinter's own participation. It is not a claim that every decentralised storage project or every operator shares the same purpose.

## Decision

Solvinter will not participate in general-purpose storage systems whose defining purpose is that infrastructure operators cannot know or govern what is stored.

The Storj storage-node experiment will therefore be discontinued.

Solvinter will instead develop accountable storage infrastructure with:

- a defined purpose;
- clear ownership;
- transparent governance;
- lawful-use requirements;
- technical security;
- appropriate privacy protections;
- identifiable responsibility for operation and policy.

The project will not treat anonymity or operator blindness as goals in themselves.

## Storage node role

The Dell Storage server will remain part of Solvinter infrastructure.

Its intended responsibilities are:

- hosting Ollama and local language models;
- hosting Sol's retrieval and knowledge systems;
- storing RAG indexes and source documents;
- maintaining Git repositories and mirrors;
- backing up Solvinter documentation;
- backing up Gate and other nodes;
- preserving project archives;
- eventually providing affordable personal and organisational storage.

In the longer term, Solvinter may provide storage for people and small organisations in Ghana who cannot justify the recurring cost of services such as Google Drive or Apple iCloud.

Such a service should protect users' private information while retaining accountable governance and a clear prohibition against illegal material.

## Design principle

> Distributed does not mean anonymous.

Solvinter distributes infrastructure to create resilience, local ownership, access and local economic value.

It does not distribute infrastructure in order to remove responsibility.

## Operational record

On 2026-07-13, the Storj Docker node on Storage was shut down cleanly.

The following actions were completed:

- the bind mounts were identified as `/storj` and `/storj/identity`;
- the Docker restart policy was changed from `unless-stopped` to `no`;
- the container was stopped using a 300-second timeout;
- the container exited successfully with exit code `0`;
- ports `28967` and `14002` were confirmed closed;
- the existing container, identity and stored data were retained temporarily pending final removal.

The shutdown was performed with:

```bash
docker update --restart=no storagenode
docker stop -t 300 storagenode
docker ps -a --filter name=storagenode
sudo ss -lntup | grep -E '28967|14002'
