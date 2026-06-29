# Solvinter Edge research docs

This directory is the source layer for Solvinter Edge research. Rendered pages,
including whitepapers, should be generated from these files rather than edited
as the source of truth.

Research fields are listed in `research-fields.json`. Each field may contain
YAML fragments in this order:

- `abstract.yaml`
- `background.yaml`
- `history.yaml`
- `market.yaml`
- `economics.yaml`
- `ethics.yaml`
- `africa.yaml`
- `ai.yaml`
- `discussion.yaml`
- `references.yaml`

Each YAML fragment may contain:

- `title`
- `status`
- `version`
- `summary`
- `sections`
- `claims`
- `questions`
- `references`

Rendered publications should identify their source path and generation time.
