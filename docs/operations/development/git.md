# Git

## Purpose

Git is a distributed version control system.

It records changes to files and makes it possible to synchronize work across multiple computers.

## Why Solvinter uses Git

Solvinter uses Git to store documentation, code, configuration and operational notes.

Git makes it possible to work from macOS, Fedora, Raspberry Pi and iPhone while keeping a complete history of the project.

## Concepts

### Repository

A repository is a project together with its complete history.

### Commit

A commit is a saved snapshot of the repository at a specific point in time.

### Remote

A remote repository is a copy stored somewhere else, such as GitHub.

### Pull

Pull means downloading the latest changes from the remote repository.

### Push

Push means uploading local commits to the remote repository.

## Operations

Clone the repository.

```bash
git clone git@github.com:solvinter/edge.solvinter.git
```

Check the current state.

```bash
git status
```

Download latest changes.

```bash
git pull
```

Stage and commit changes.

```bash
git add .
git commit -m "Describe changes"
```

Upload changes.

```bash
git push
```

## Verification

```bash
git status
```

Expected output when everything is synchronized:

```text
nothing to commit, working tree clean
```

