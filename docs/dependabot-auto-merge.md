# Dependabot patch auto-merge

This public repository cannot consume actions from the internal
`egym/egym-actions` repository, regardless of sharing or token permissions
([GitHub restriction](https://docs.github.com/en/actions/how-tos/reuse-automations/share-with-your-enterprise)).
The original rollout failed during action resolution, before authentication;
it did not establish whether the app secret was available.

We use public `actions/create-github-app-token` v3.3.0 and
`dependabot/fetch-metadata` v3.1.0, pinned to full commit SHAs in the workflow.
Only the aggregate `version-update:semver-patch` classification is eligible,
for all dependencies without an allowlist. Minor, major, unknown and non-semver
classifications remain manual. No vulnerability-severity mode is enabled.
Weekly npm and GitHub Actions schedules and existing ignores are unchanged.

Dependabot-triggered opened, reopened, synchronize and ready-for-review events
targeting `main` invoke the workflow for non-draft, same-repository bot PRs.
The merge job does not check out or execute PR code; ordinary CI builds the PR.
Metadata verification retains the public action's author and signed-commit checks.
The inline step rechecks the live PR's state, draft status, base and event head.
It uses `gh pr merge --auto --squash --match-head-commit` when reviews are not
required. GitHub then handles remaining requirements without runner polling.

When `reviewDecision` is `REVIEW_REQUIRED`, deferred auto-merge can remain
`BLOCKED` even for an app on the review ruleset's bypass list. Neither the CLI
`--auto` path nor `enablePullRequestAutoMerge` has an explicit bypass input.
Community evidence indicates that the synchronous native merge endpoint honors
the authenticated actor's grant instead
([reported reproduction](https://github.com/orgs/community/discussions/162623)).
For that case only, `gh pr checks --required --watch --fail-fast` waits for
required checks, bounded by the 20-minute job timeout. The step rechecks the PR
and requires every required check's state to be exactly `SUCCESS` (not skipped,
neutral, cancelled or failed), then calls the native REST squash endpoint with
the expected head SHA and requires `merged: true` in its response.
GitHub still enforces up-to-date CI and signatures at merge time. There is no
`--admin`, review submission, arbitrary-check enumeration or settings mutation.
An API rejection or timeout fails visibly; failed checks are not overridden.

## Repository setup

The existing `egym-app` (427619) needs access to this repository and
`EGYM_APP_PRIVATE_KEY` in Dependabot secret scope for these `pull_request` runs.
A missing key fails explicitly before token creation. The token is restricted
to this repository with contents/pull-requests write and checks/statuses read
(needed to inspect required checks). No administration, workflows or
vulnerability-alert permissions are requested. The token action revokes it
automatically in its post step; no git credentials are configured.
Inherited organization secret access and app installation access remain
first-run checks. No credentials were created.

Live `main` protections are split into active rulesets:

- `main-required-ci` (25346365): no bypass actors; up-to-date `Build` from GitHub Actions
  (integration 15368), signed commits, no deletion and no force pushes.
- `main-required-reviews` (25346371): one approval with code-owner review, no stale-review
  dismissal or last-push approval; only `egym-app` has PR-only bypass.

On reinspection for this follow-up, the classic branch protection endpoint
returns 404 and GraphQL lists no classic rules. The earlier documented classic
defense in depth is therefore absent; the active rulesets above enforce the
protections. This follow-up does not restore or change settings. Native
auto-merge is enabled; squash is the only allowed merge method, and there is
no merge queue. CI and signatures remain non-bypassable by the app.

The repository is managed by `egym/github-terraform` under
`egym/repositories/bma-core-growth/repositories.tf` and its shared repository
module. The ruleset additions, classic-review removal and auto-merge enablement
are same-repository live changes, not Terraform changes. The module currently
ignores changes to classic reviews and `allow_auto_merge`; recreation or policy
changes may restore defaults. Reconcile the live settings in Terraform without
granting the app a CI/signature bypass.

## First test after merging the implementation

Already-open PRs do not emit a new opened event, and rerunning an old workflow
does not reliably load the new workflow. After explicit authorization, comment
`@dependabot rebase` on a chosen patch PR so Dependabot updates its branch onto
the new `main`, emitting an eligible synchronize event and rerunning CI.
A no-op rebase may not emit that event; `@dependabot recreate` is a fallback
that regenerates the branch and overwrites edits, requiring separate approval.
Human-generated events and manual dispatch are not substitutes for a Dependabot
actor. No dependency PR has been changed or merged to test this rollout.
Confirm secret access, repository-scoped token creation, metadata classification
and the required-check/review-bypass path on that first authorized run. If CI
exceeds 20 minutes, this job fails rather than leaving a runner waiting forever;
a fresh authorized Dependabot event is needed to retry the bypass path.
Actual app authentication and native review-bypass behavior in this repository
remain unexercised; the community report is not a guarantee of this app's
current behavior.
