# Dependabot patch auto-merge

We use `egym/egym-actions/auto-merge-dependabot`, pinned to published `v1`
commit `c9b288b4779a3ffe238f8297cac4586749232eed`. Minor, major and alert-only
modes are disabled; there is no package allowlist. Dependabot's aggregate
update type determines eligibility, including non-semver classification.
Weekly npm and GitHub Actions schedules and existing ignores are unchanged.

Dependabot-triggered opened, reopened, synchronize and ready-for-review events
targeting `main` invoke the workflow for non-draft, same-repository bot PRs.
The merge job does not check out or execute PR code; ordinary CI builds the PR.
The shared action approves eligible PRs, waits for required checks, rejects
non-`SUCCESS` results and attempts an admin squash merge, falling back to native
auto-merge. It does not add per-entry, exact-head or changed-file checks, or
explicit revocation on updates.

## Repository setup

The existing `egym-app` (427619) needs access to this repository and
`EGYM_APP_PRIVATE_KEY` in Dependabot secret scope. Its helpers request an
organization-scoped token with contents/pull-requests write and
vulnerability-alerts read, configure git credentials and use mutable nested tags.
Repository Dependabot secrets are empty; inherited organization secret access
and app installation access could not be verified without organization
permissions and remain first-run checks. No credentials were created.

Live `main` protections are split into active rulesets:

- `main-required-ci` (25346365): no bypass actors; up-to-date `Build` from GitHub Actions
  (integration 15368), signed commits, no deletion and no force pushes.
- `main-required-reviews` (25346371): one approval with code-owner review, no stale-review
  dismissal or last-push approval; only `egym-app` has PR-only bypass.

Only the redundant classic review requirement was removed, after both rulesets
were verified active. Classic CI, signatures, admin enforcement, force-push and
deletion protections remain as defense in depth. Native auto-merge is enabled;
squash remains the only allowed merge method. No merge
queue was required before this rollout, and none was added. CI and signatures
remain non-bypassable by the app, including its admin-merge attempt.

The repository is managed by `egym/github-terraform` under
`egym/repositories/bma-core-growth/repositories.tf` and its shared repository
module. The ruleset additions, classic-review removal and auto-merge enablement
are same-repository live changes, not Terraform changes. The module currently
ignores changes to classic reviews and `allow_auto_merge`, so an ordinary apply
should retain them; recreation or policy changes may restore defaults. Adopt
these settings in Terraform without granting the app a CI/signature bypass.

## First test after merging the implementation

Already-open PRs do not emit a new opened event, and rerunning an old workflow
does not reliably load the new workflow. After explicit authorization, comment
`@dependabot rebase` on a chosen patch PR so Dependabot updates its branch onto
the new `main`, emitting an eligible synchronize event and rerunning CI.
A no-op rebase may not emit that event; `@dependabot recreate` is a fallback
that regenerates the branch and overwrites edits, requiring separate approval.
Human-generated events and manual dispatch are not substitutes for a Dependabot
actor. No dependency PR has been changed or merged to test this rollout.
