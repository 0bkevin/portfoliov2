# One product idea for every researched opportunity

Verified against the opportunity research and official role descriptions on 2026-07-15.

This document deliberately assigns a different product to every company/role in the ranked research. The first 22 correspond to confirmed active openings. Entries 23–25 are general or future-opening routes. Entries 26–30 are speculative companies or companies without a current matching opening; they are clearly marked so they are not mistaken for active jobs.

Each product is intended to create concrete evidence for the requirements in that specific role—not merely show familiarity with the company's API.

## Confirmed openings with realistic remote potential

## 1. PostHog — Context Engineer

### Product: Context CI

**Pitch:** A continuous-integration system that converts a changing software repository into versioned documentation, agent skills, and MCP resources, while detecting when code and context drift apart.

**Who uses it:** Open-source teams maintaining multiple SDKs, frameworks, examples, and documentation versions.

**What to build:**

- Connect a GitHub repository, documentation site, OpenAPI specification, changelog, and example applications.
- Define declarative “context recipes,” such as “install analytics in SvelteKit SSR” or “debug Django event capture.”
- Produce versioned context bundles with source provenance and publish them as GitHub releases, downloadable skills, and MCP resources.
- Inspect feature pull requests and flag documentation, example, or context packages that became stale.
- Run task-level evaluations against each new bundle before publishing it.
- Provide a human review interface showing generated changes and exact supporting sources.

**Why PostHog would notice:** This is a direct demonstration of the role's context pipelines, knowledge bases, agents, MCP, docs-as-code, technical writing, CI/CD, and systems-thinking requirements. It is close to PostHog's “context mill” problem without copying its implementation.

**Attention hook:** Use Context CI to teach an agent to add PostHog correctly to clean SvelteKit, Next.js, and Django projects. Publish success rate, stale-answer rate, token use, and failure analysis across framework versions.

**Reasonable MVP:** Three source types, two framework recipes, GitHub Action, MCP endpoint, 20 evaluation tasks, and one technical article.

## 2. Mastra — Product Engineer

### Product: Maintainer Pilot

**Pitch:** An open-source maintainer agent that turns an incoming GitHub bug report into a verified reproduction, codebase investigation, proposed fix, preview deployment, and evidence package for a human maintainer.

**Who uses it:** Small open-source teams whose engineers spend substantial time triaging incomplete issues.

**What to build:**

- Import a GitHub issue and ask only the missing diagnostic questions.
- Create a disposable reproduction repository and run it in a sandbox.
- Use Mastra workflows and agents to inspect code, documentation, and recent changes.
- Produce a minimal reproduction, failing test, proposed patch, and preview deployment.
- Include human checkpoints before modifying a repository or posting publicly.
- Track model/tool traces, runtime, cost, retries, and final maintainer decision.
- Deploy the TypeScript/Node service on Railway with Postgres and Redis.

**Why Mastra would notice:** It uses Mastra for a real product rather than a tutorial agent and demonstrates end-to-end TypeScript, database migrations, cloud deployment, issue triage, customer empathy, agent-driven development, and ambiguous problem ownership.

**Attention hook:** Use it on several real Mastra GitHub issues, contribute any framework or documentation fixes discovered, and show the full Friday-demo-style workflow.

**Reasonable MVP:** One repository, one issue category, sandboxed reproduction, preview deploy, human approval, and 15 labeled issues.

## 3. Runlayer — Support Engineer

### Product: MCP Black Box Recorder

**Pitch:** A diagnostic proxy that records, redacts, validates, and safely replays MCP sessions so support engineers can distinguish client, OAuth, connector, policy, and server failures.

**Who uses it:** Enterprise support and platform teams operating internal MCP servers and connectors.

**What to build:**

- Proxy MCP JSON-RPC traffic and capture a correlated timeline without retaining secrets.
- Validate protocol messages, schemas, tool definitions, timeouts, and error responses.
- Simulate expired tokens, missing scopes, OAuth callback problems, rate limits, and connector downtime.
- Replay a failed session against a safe test server.
- Produce a minimal reproduction, suspected ownership area, log queries, and escalation package.
- Convert confirmed failures into runbook steps and searchable knowledge entries.
- Add policy controls and an immutable audit log.

**Why Runlayer would notice:** The role explicitly covers MCP connectors, OAuth, control-plane issues, diagnostic agents, reproduction workflows, runbooks, observability, and clear escalations to Platform, SRE, or Identity engineers.

**Attention hook:** Publish an “MCP failure zoo” with 15 reproducible failure modes and show how the recorder identifies each one.

**Reasonable MVP:** TypeScript proxy, two test MCP servers, OAuth simulator, trace UI, five replayable failures, and generated escalation report.

## 4. Aleph — Software Engineer

### Product: CloseOps

**Pitch:** A collaborative month-end finance workspace that reconciles operational data from disconnected systems, preserves lineage, and explains variances without forcing finance teams to abandon spreadsheets.

**Who uses it:** Startup finance teams performing monthly close and planning across bank exports, billing systems, payroll, and spreadsheets.

**What to build:**

- Import CSVs plus Stripe test data and one accounting-system sandbox.
- Map inconsistent source fields into a canonical financial model.
- Create reusable reconciliation rules and surface unmatched transactions.
- Preserve cell/metric lineage back to source records and transformations.
- Support scenarios, assumptions, approvals, comments, and locked reporting periods.
- Generate variance explanations with citations; require human confirmation before accepting them.
- Provide a spreadsheet-like interface and an audit trail.

**Why Aleph would notice:** It demonstrates complex B2B workflows, data integration, relational modeling, AI-assisted finance work, trustworthy calculations, product judgment, and turning spreadsheet pain into a polished product.

**Attention hook:** Publish a realistic anonymized month-end dataset and show close time falling from a manual multi-step process to a reviewable workflow.

**Reasonable MVP:** Three import types, canonical model, reconciliation rules, variance page, audit trail, and one end-to-end close demo.

## 5. Supabase — Support Engineer (AMER)

### Product: RLS Clinic

**Pitch:** A self-service troubleshooter that converts a Supabase Auth, SQL, or Row Level Security problem into a minimal, shareable, redacted reproduction with an executable regression test.

**Who uses it:** Developers who cannot determine whether an issue comes from SQL, authentication state, RLS policy, client configuration, or framework behavior.

**What to build:**

- Accept schema/policy exports, client snippets, error messages, and expected behavior.
- Redact secrets and user data locally.
- Reproduce the problem in an isolated local Supabase environment.
- Visualize which user/JWT claims reach which RLS policies and why access is allowed or denied.
- Compare anonymous, authenticated, service-role, and custom-claim behavior.
- Produce a SQL test, minimal client example, and shareable diagnostic archive.
- Search official documentation and GitHub issues with citations.

**Why Supabase would notice:** It proves SQL/Postgres fluency, Linux/CLI work, GitHub issue triage, test creation, JavaScript framework knowledge, communication, and the ability to build support tooling that reduces resolution time.

**Attention hook:** Reproduce and explain ten real closed RLS/Auth issues from the Supabase repository, then contribute improved tests or documentation where appropriate.

**Reasonable MVP:** Local CLI, JWT/policy visualizer, Next.js and Svelte examples, five diagnostic rules, and shareable redacted bundle.

## 6. Firecrawl — Growth Engineer, Support Engineering

### Product: Crawl Doctor

**Pitch:** A developer-facing diagnostic service that explains why a URL produced incomplete, blocked, malformed, or stale crawl results and recommends the smallest configuration or product change that fixes it.

**Who uses it:** Developers integrating web data into agents, search, RAG, and data pipelines.

**What to build:**

- Accept a URL and expected output shape.
- Run controlled crawl variants across rendering, waiting, extraction, and format options.
- Capture robots behavior, redirects, page lifecycle, network calls, DOM changes, and extraction stages.
- Compare resulting markdown/JSON and identify where information disappeared.
- Suggest a configuration, parser, documentation, or product-level fix with supporting evidence.
- Cluster similar failures and rank fixes by estimated ticket reduction.
- Generate a clean support escalation when it cannot solve the problem.

**Why Firecrawl would notice:** It is exactly the role's support-scaling problem: full-stack internal tooling, AI-assisted triage, developer experience, measurable ticket deflection, and engineering fixes that eliminate recurring tickets.

**Attention hook:** Create a public benchmark of 50 difficult pages—client rendering, pagination, anti-bot, PDFs, structured data—and publish failure classifications and fixes.

**Reasonable MVP:** Ten failure cases, trace UI, three crawl strategies, issue clustering, and a documentation-fix suggestion flow.

## 7. Resend — Product Engineer, Americas

### Product: MailTrace

**Pitch:** An email flight recorder that shows a developer exactly what happened from API request through domain checks, message processing, provider response, delivery event, and webhook handling.

**Who uses it:** Developers debugging transactional email systems.

**What to build:**

- Send messages through Resend's test or safe development flow.
- Correlate API request, idempotency key, domain/DNS state, email events, webhook attempts, and application handling.
- Display a polished chronological timeline with plain-language explanations.
- Detect common DNS, signature, webhook, retry, and duplicate-event mistakes.
- Replay webhooks safely and compare payload/schema versions.
- Provide copyable minimal reproductions and framework-specific fixes.
- Instrument product usage and measure successful diagnosis.

**Why Resend would notice:** The role specifically asks for polished debugging and observability experiences around emails, webhooks, domains, and API requests, built with TypeScript, React, and Next.js.

**Attention hook:** Make the interface exceptionally polished and fast, then record five realistic failure investigations rather than a successful happy-path send.

**Reasonable MVP:** Request/event correlation, DNS checks, webhook inspector/replay, five diagnostics, and Next.js sample application.

## 8. Lightning Labs — AI Product Engineer

### Product: AgentPay

**Pitch:** A developer kit that lets an AI agent discover an MCP tool, pay for one invocation using L402 on Lightning testnet, enforce a budget, and retain a verifiable receipt.

**Who uses it:** Developers building autonomous agents that need to purchase APIs or compute without a human completing checkout.

**What to build:**

- MCP server exposing two genuinely useful metered tools.
- L402 challenge, Lightning testnet/regtest payment, and authenticated invocation.
- Agent wallet with per-tool, per-run, and daily budget policies.
- Idempotent payment and tool-execution handling.
- Receipt, audit log, retries, cancellation, and failure/refund semantics.
- TypeScript SDK, Python example, and a clear non-crypto developer interface.
- Threat model covering replay, prompt injection, price manipulation, and malicious tools.

**Why Lightning Labs would notice:** The role explicitly names L402-powered agentic commerce, MCP servers, end-to-end demos, internal automation, TypeScript/React/Python/Go, and strong product instincts.

**Attention hook:** Make the purchased action useful—for example, launching a disposable code-analysis environment—and show the agent refusing a tool call that violates its budget.

**Reasonable MVP:** Two tools, testnet payments, budget policy, receipts, TypeScript SDK, and seven-minute demo.

## 9. Railway — Senior Product Engineer, Scalability

### Product: Usage Ledger

**Pitch:** A miniature cloud metering and billing backbone that converts high-volume CPU/RAM/network events into auditable invoices while surviving duplicates, late events, concurrency, worker crashes, and payment-provider failures.

**Who uses it:** Developer-cloud operators and SaaS companies with consumption pricing.

**What to build:**

- At-least-once usage-event ingestion with explicit idempotency.
- Windowed aggregation and versioned rating rules.
- Immutable double-entry or ledger-style billing records.
- Credits, prepayment, tiered rates, invoicing, and Stripe test-mode payment.
- Temporal workflows for billing and reconciliation.
- Fraud signals for abnormal usage, repeated accounts, and payment velocity.
- Operations UI, invariant tests, load generator, and failure injector.
- Postgres bottleneck analysis and optional ClickHouse comparison.

**Why Railway would notice:** It covers nearly every hard requirement in the role: Node/TypeScript, Postgres, Temporal, metering, payments, fraud, concurrency, partial failure, auditability, monitoring, and written architecture.

**Attention hook:** Demonstrate that duplicate delivery and a crash after payment cannot double-charge a customer, then publish the invariant and reconciliation proof.

**Reasonable MVP:** Usage ingestion, rating, ledger, invoice workflow, four injected failures, and benchmark at two load levels.

## 10. Sourcegraph — Agent Engineer

### Product: ChangeScope

**Pitch:** A code-change impact agent that explains which repositories, symbols, tests, owners, documentation, and deployed services are affected by a proposed change—and proves its recommendations with citations and evaluations.

**Who uses it:** Engineers changing APIs or shared libraries across large multi-repository codebases.

**What to build:**

- Index several related repositories and extract symbols, references, dependency edges, ownership, tests, and build metadata.
- Accept an issue or proposed diff and produce a multi-step impact investigation.
- Retrieve and rank code context with exact citations.
- Suggest affected tests and migration steps, then validate suggestions deterministically where possible.
- Track answer quality, recall, latency, token use, and dollar cost.
- Compare models and retrieval strategies on a labeled change-impact dataset.
- Clearly abstain when evidence is insufficient.

**Why Sourcegraph would notice:** It demonstrates code understanding, retrieval/ranking, context packing, citations, multi-step agent loops, pragmatic evaluations, cost/latency constraints, and a developer-facing product.

**Attention hook:** Build a benchmark from historical cross-repository changes and measure whether ChangeScope finds the files/tests actually modified by maintainers.

**Reasonable MVP:** Three related repositories, 20 historical changes, symbol/dependency graph, cited report, and model/retrieval comparison.

## 11. Canonical — Software Developer, Backend SaaS

### Product: FleetPatch

**Pitch:** An open-source Ubuntu fleet-management service that inventories machines, identifies security/package drift, schedules safe update waves, and reports health before and after rollout.

**Who uses it:** Small organizations managing tens or hundreds of Ubuntu servers without an enterprise fleet platform.

**What to build:**

- Lightweight agent reporting OS, hardware, package, security, and health inventory.
- Python/Django backend, public API, PostgreSQL, and operator UI.
- Machine groups, staged rollouts, maintenance windows, and rollback/stop conditions.
- Job queue with retries, idempotency, and release lifecycle.
- Audit history, telemetry, tests, and documented upgrade path.
- Deployment on Ubuntu with packaging and operations documentation.

**Why Canonical would notice:** It directly demonstrates Python, Django, PostgreSQL, Ubuntu, public APIs, fleet observability, security operations, release management, automated testing, and distributed project ownership.

**Attention hook:** Run it against a real five-to-ten-VM lab and publish a safe staged update, an intentionally failed wave, and the resulting operational postmortem.

**Reasonable MVP:** Five VMs, inventory agent, grouping, update job, health gates, audit log, and comprehensive tests.

## 12. PlanetScale — Software Engineer, PlanetScale Postgres

### Product: RecoverPG

**Pitch:** A small Go/Kubernetes control plane that provisions Postgres, performs backups and point-in-time recovery, detects primary failure, promotes a replica, and measures whether the recovered database is correct.

**Who uses it:** Platform engineers learning or validating managed Postgres recovery procedures.

**What to build:**

- Declarative cluster specification and Go reconciliation loop.
- Primary/replica topology, health detection, and controlled failover.
- Backup, restore, and point-in-time-recovery workflows.
- Connection-pool behavior and graceful client reconnection.
- Failure experiments for process kill, node loss, network partition, disk pressure, and corrupted backup.
- RPO/RTO dashboard and data-integrity validation.
- Encrypted credentials, runbooks, and postmortems.

**Why PlanetScale would notice:** It develops and demonstrates the role's exact gaps: Go, Kubernetes, managed Postgres operations, high availability, disaster recovery, fault tolerance, networking/storage thinking, and on-call readiness.

**Attention hook:** Publish repeatable chaos experiments with measured recovery time, data loss window, and correctness—not merely a diagram.

**Reasonable MVP:** Local Kubernetes, one primary/two replicas, scheduled backup, PITR, two chaos cases, and RPO/RTO report.

## Confirmed openings with material geography or specialization constraints

## 13. Infisical — Full Stack Engineer

### Product: GhostKey

**Pitch:** An ephemeral credential broker for AI agents that exchanges a stable agent identity for short-lived, narrowly scoped credentials for each tool invocation.

**Who uses it:** Teams allowing agents to access databases, APIs, cloud accounts, and internal tools.

**What to build:**

- Workload/agent identity and policy-based credential requests.
- Short-lived credential issuance for two sandbox integrations.
- Per-tool, per-resource, time, environment, and budget restrictions.
- Human approval for high-risk capabilities.
- Automatic rotation/revocation and an immutable audit log.
- Secret redaction from prompts, traces, and application logs.
- Attack simulator for exfiltration, confused-deputy, and prompt-injection cases.

**Why Infisical would notice:** It demonstrates secrets management, security product thinking, auth, multi-tenancy, developer experience, auditability, and full-stack ownership in an AI-agent use case.

**Attention hook:** Show the same compromised agent failing to exfiltrate credentials because it never receives a reusable secret.

**Reasonable MVP:** Two credential providers, policy editor, approval flow, audit timeline, and five attack tests.

## 14. Better Stack — Full-Stack Engineer

### Product: Incident Replay

**Pitch:** A collaborative incident timeline that joins logs, traces, metrics, deploys, feature flags, and status updates so responders can replay what changed and test competing failure hypotheses.

**Who uses it:** Small engineering teams handling production incidents across fragmented observability tools.

**What to build:**

- OpenTelemetry ingestion plus GitHub/deployment events.
- Automatic correlated timeline for a selected service and time window.
- Hypothesis cards that link a claim to supporting or contradicting evidence.
- Compare-before/after deploy views and affected-user estimates.
- Human-authored incident notes and status-page update drafting.
- Exportable postmortem with exact evidence links.
- Fast, polished interface optimized for stressful incident use.

**Why Better Stack would notice:** It combines observability data, incident response, product design, full-stack implementation, operational empathy, and a clean developer experience.

**Attention hook:** Instrument a deliberately failing service, run a live incident exercise, and publish the resulting timeline and postmortem.

**Reasonable MVP:** Logs/traces/deploys, correlation, hypothesis UI, postmortem export, and one realistic incident scenario.

## 15. Langfuse — Senior Product Engineer

### Product: EvalDiff

**Pitch:** A regression-review workspace that compares two versions of an agent across a production trace sample and explains quality, cost, latency, tool-use, and failure-mode changes.

**Who uses it:** AI product teams deciding whether a prompt, model, retrieval, or tool change is safe to ship.

**What to build:**

- Import or capture agent traces and define stratified evaluation samples.
- Replay baseline and candidate versions.
- Compare deterministic checks, human ratings, model judges, cost, latency, tool calls, and abstention.
- Cluster regressions by failure type and display representative traces.
- Require approval when configured quality/cost thresholds fail.
- Export a release decision and link it to a deployment.

**Why Langfuse would notice:** It shows trace modeling, evaluations, agent observability, TypeScript/Python integrations, data-heavy UI, self-hosting, and pragmatic product thinking about LLM quality.

**Attention hook:** Publish an honest evaluation where the newer model improves average quality but creates a specific expensive regression that EvalDiff catches.

**Reasonable MVP:** Two agent versions, 50 traces, three evaluator types, regression clusters, and release gate.

## 16. Kestra — Product Engineer, AI

### Product: Data Incident Commander

**Pitch:** A human-supervised AI workflow that investigates a failed data pipeline, gathers evidence, proposes remediation, executes approved steps, and verifies recovery through a durable orchestration engine.

**Who uses it:** Data/platform teams responding to failed scheduled jobs or bad downstream data.

**What to build:**

- Ingest a failed job, logs, schema changes, and upstream/downstream dependencies.
- Use deterministic checks and an agent to propose ranked hypotheses.
- Model investigation, approval, retry, repair, and verification as a durable Kestra workflow.
- Pause for human authorization before data mutation.
- Preserve complete execution state and allow replay from a failed step.
- Produce a postmortem and a new automated guardrail.

**Why Kestra would notice:** It demonstrates AI use cases across engine and UI, orchestration, events, retries, human approval, Docker/cloud execution, and turning a prototype into a reusable product blueprint.

**Attention hook:** Intentionally break a small ELT pipeline in three different ways and show safe, durable investigation and recovery.

**Reasonable MVP:** One pipeline, three failure modes, Kestra workflow, approval UI, replay, and postmortem generation.

## 17. Trigger.dev — Senior Backend Engineer

### Product: Webhook Foundry

**Pitch:** A durable webhook delivery platform that accepts events once, fans them out to subscribers, preserves ordering where needed, and survives slow consumers, retries, duplicates, and long outages.

**Who uses it:** SaaS developers who need reliable outbound integrations without building queue infrastructure themselves.

**What to build:**

- Event ingestion with tenant isolation and idempotency.
- Signed deliveries, configurable retry/backoff, concurrency, and rate limits.
- Pause/resume, replay from time range, dead-letter queue, and manual repair.
- Per-endpoint ordering option and explicit delivery semantics.
- Payload versioning and destination test console.
- Operational UI with trace, attempt history, and aggregate health.
- Load/failure generator and invariant tests.

**Why Trigger.dev would notice:** It demonstrates long-running background work, durable execution, retries, idempotency, concurrency, TypeScript backend systems, operational visibility, and developer-facing API design.

**Attention hook:** Run a 24-hour simulated consumer outage, recover without loss or uncontrolled bursts, and publish the delivery invariants.

**Reasonable MVP:** Ingestion API, two destinations, retries, pause/replay, DLQ, dashboard, and failure test suite.

## 18. E2B — Product Engineer, AI

### Product: ReproBox

**Pitch:** A service that turns an incomplete bug report into a safe, shareable executable sandbox containing the smallest reproduction and a recorded path from failure to fix.

**Who uses it:** Support and engineering teams debugging user-provided code in AI and developer-tool products.

**What to build:**

- Import issue text, repository, lockfiles, commands, and expected behavior.
- Create an isolated E2B sandbox with strict time, CPU, memory, and network policy.
- Run diagnostic commands and capture filesystem/process/network changes.
- Minimize dependencies and input until the failure still reproduces.
- Snapshot the environment and provide a safe share link.
- Compare failed and fixed runs with a trace and patch.

**Why E2B would notice:** It uses sandboxes for an essential AI/developer workflow and demonstrates product engineering, secure execution, SDK integration, debugging UX, and a complete production-quality application.

**Attention hook:** Reproduce several real dependency/environment bugs that are difficult to recreate locally and document the sandbox isolation model.

**Reasonable MVP:** Node and Python templates, sandbox policy, capture/replay, snapshot, and five public bug reproductions.

## 19. Browserbase — Software Engineer, Agent Platform

### Product: Browser Reliability Lab

**Pitch:** An evaluation and debugging platform that runs browser-agent tasks repeatedly across site variants, records every action and page state, and classifies where and why the agent failed.

**Who uses it:** Teams shipping browser agents that currently rely on anecdotal demos rather than repeatable evaluations.

**What to build:**

- Define tasks with success assertions rather than prescribed click paths.
- Run them through Browserbase/Stagehand across multiple browser/session configurations.
- Capture DOM snapshots, screenshots, network activity, console errors, actions, and model reasoning metadata.
- Replay failures and compare two agent/model/prompt versions.
- Classify navigation, locator, auth, timing, content, and reasoning failures.
- Track success rate, step count, latency, and cost.

**Why Browserbase would notice:** It proves browser automation, TypeScript, distributed agent execution, observability, evaluations, debugging, and developer-platform product judgment.

**Attention hook:** Publish a 25-task benchmark with intentionally changing DOM/layout variants and show which agent changes genuinely improve reliability.

**Reasonable MVP:** Ten tasks, Stagehand runner, trace viewer, version comparison, and deterministic success assertions.

## 20. Composio — Member of Technical Staff, Platform Engineering

### Product: Connector Doctor

**Pitch:** A contract-testing and incident-reproduction service for OAuth-based agent connectors that catches scope, refresh, schema, rate-limit, and retry failures before users encounter them.

**Who uses it:** Platform teams maintaining dozens or hundreds of third-party integrations for AI agents.

**What to build:**

- Define a connector contract covering auth, tool schema, permissions, pagination, errors, and rate limits.
- Exercise OAuth authorization, refresh, revocation, and missing-scope paths against sandbox integrations.
- Detect schema drift and breaking provider changes.
- Test retries, idempotency, pagination, and expired credentials.
- Create a reproducible incident bundle with redacted traces.
- Provide connector health, historical reliability, and rollout gates.

**Why Composio would notice:** It directly demonstrates auth, connectors, tool execution, retries, observability, multi-tenancy, API platform work, and the operational realities of agent integrations.

**Attention hook:** Implement Gmail-like and GitHub-like sandbox connectors and deliberately introduce provider changes that the system catches.

**Reasonable MVP:** Two connectors, OAuth test server, contract format, drift detection, health dashboard, and ten failure cases.

## 21. Browser Use — Infrastructure Engineer / generalist opening

### Product: PortalOps

**Pitch:** A resilient browser agent for completing recurring workflows in difficult legacy portals, with checkpoints, human approval, recovery after layout changes, and a public reliability score.

**Who uses it:** Small organizations that repeatedly enter or retrieve information from portals without stable APIs.

**What to build:**

- Choose one legal, publicly testable multi-step portal workflow.
- Separate deterministic state checks from model-driven navigation.
- Save encrypted checkpoints and resume after browser or network failure.
- Require human confirmation before irreversible submission.
- Detect layout/content changes and try bounded recovery strategies.
- Maintain an evaluation suite across page variants.
- Record actions and produce an auditable completion receipt.

**Why Browser Use would notice:** The company values exceptional visible builders. This demonstrates browser-agent reliability, infrastructure thinking, checkpoints, evaluation, security boundaries, and a real use case rather than a toy browsing demo.

**Attention hook:** Run the workflow daily for several weeks and publish success rate, failure taxonomy, and upstream Browser Use fixes discovered.

**Reasonable MVP:** One difficult workflow, 20 variants, resume/checkpoints, approval gate, and reliability dashboard.

## 22. Daytona — Developer Experience or Senior Support Engineer

### Product: Workspace Rewind

**Pitch:** A “reproduction environment as code” service that turns a support issue into a persistent developer workspace, records environmental changes, and lets another engineer rewind to the exact failing state.

**Who uses it:** Developer-tools support teams handling bugs caused by dependencies, environment state, or setup differences.

**What to build:**

- Import repository, branch, runtime versions, environment manifest, and reproduction steps.
- Provision a persistent Daytona workspace from a versioned specification.
- Record package installs, environment changes, commands, and service state.
- Snapshot before failure and after repair.
- Share the workspace and a concise diagnostic handoff.
- Detect differences between the user's environment and a known-good template.

**Why Daytona would notice:** It uses persistent execution infrastructure to solve a DX/support problem and demonstrates developer tooling, environment lifecycle, debugging, open source, and support-to-engineering handoff.

**Attention hook:** Complete a Daytona open-source bounty or submit the missing feature/documentation improvement discovered while building it.

**Reasonable MVP:** Node/Python templates, persistent workspace, state capture, diff, rewind, and five reproduction examples.

## General or future-opening routes—not clean current role matches

## 23. Alpen Labs — General Application

### Product: ProofWatch

**Pitch:** A developer observability dashboard that follows a Bitcoin/ZK proof from transaction or batch input through proof generation, verification, settlement, and final status.

**Who uses it:** Developers integrating with a Bitcoin ZK system who need to understand why a proof or settlement is delayed or rejected.

**What to build:**

- Ingest a test/dev network's proof and settlement events.
- Display proof lifecycle, latency, dependencies, and verification result.
- Decode common verification failures into precise technical explanations.
- Link each state to protocol documentation and source.
- Alert on stalled or anomalous proof flows.
- Include a threat/trust model distinguishing proven facts from off-chain assumptions.

**Why Alpen might notice:** It gives Kevin a credible product/backend contribution in Bitcoin/ZK without pretending to be a senior cryptographer. It demonstrates developer tooling, observability, protocol learning, and clear technical communication.

**Attention hook:** Submit it through the general-application route only after it works against a real public development environment or Alpen-compatible material.

## 24. Nethermind — General application / future AI and ZK engineering

### Product: UpgradeGuard

**Pitch:** An agent-assisted impact analyzer that simulates an EVM/L2 protocol or smart-contract upgrade and produces an evidence-backed report of affected contracts, storage, calls, tests, and operational assumptions.

**Who uses it:** Protocol and application teams reviewing upgrades before deployment.

**What to build:**

- Compare old/new contract bytecode, ABI, storage layout, permissions, and dependencies.
- Fork a public test network and simulate representative transactions.
- Generate Foundry tests for changed invariants and failure cases.
- Use an agent to explain findings, but make deterministic analysis authoritative.
- Produce citations to source, traces, and state diffs.
- Require human review and record accepted/rejected findings.

**Why Nethermind might notice:** It intersects AI agents, EVM tooling, security, simulation, developer infrastructure, and technical writing—the most plausible bridge from Kevin's current strengths into Nethermind's deeper protocol work.

**Attention hook:** Analyze one historical public upgrade and compare predicted impact with what maintainers actually changed.

## 25. OpenZeppelin — Blockchain Security Researcher, Future Openings

### Product: InvariantLab

**Pitch:** A hands-on smart-contract security laboratory containing a realistic vulnerable protocol, executable exploits, invariant/fuzz tests, professional findings, patches, and runtime monitoring rules.

**Who uses it:** Solidity developers learning how economic and access-control vulnerabilities become exploitable systems failures.

**What to build:**

- Design a small lending, vault, or bridge-like protocol with non-trivial state and economics.
- Introduce five realistic vulnerability classes.
- Write Foundry exploit tests and traces.
- Add invariant and fuzz tests that detect the failures.
- Produce an audit-style report with severity, impact, proof, remediation, and residual risk.
- Patch the protocol and add regression tests.
- Create monitoring rules for suspicious on-chain behavior.

**Why OpenZeppelin might notice:** It demonstrates the actual security-research workflow rather than another certificate: threat modeling, Solidity, exploit construction, testing, professional reporting, remediation, and monitoring.

**Attention hook:** Ask independent security practitioners to review the report and publish corrections openly before using it for the future-opening application.

## Speculative companies or no current matching opening

## 26. Fly.io — no current openings

### Product: RegionFail

**Pitch:** A multi-region failure laboratory that deploys a stateful service near users, injects regional/network failures, and visualizes routing, consistency, latency, and recovery tradeoffs.

**What to build:** Deploy an application and workers across Fly regions, introduce latency/partition/region-loss scenarios, test state placement and failover, and publish an operational report with measured tradeoffs.

**Why it could attract Fly.io:** It demonstrates real use of globally distributed compute, developer experience, failure analysis, and unusually transparent infrastructure writing. This is relationship-building, not an application to a nonexistent role.

## 27. Hatchet — no verified opening

### Product: Workflow Autopsy

**Pitch:** A failure-analysis interface for durable workflows that reconstructs why a run stalled, duplicated work, exceeded concurrency, or behaved differently after replay.

**What to build:** Run TypeScript/Python Hatchet workflows, capture event/history/state transitions, compare original and replayed executions, flag non-idempotent steps, and generate a minimal failure scenario.

**Why it could attract Hatchet:** It demonstrates Postgres-backed durable execution, retries, replay, concurrency, observability, open-source contribution, and a concrete product insight for an early-stage team.

## 28. Riza — no verified opening

### Product: CodePermit

**Pitch:** A policy and audit layer for agent-generated code execution that decides what a snippet may access before running it in a secure sandbox.

**What to build:** Static preflight checks, language/network/filesystem/resource policies, signed execution requests, Riza-backed isolated execution, output redaction, complete audit trails, and adversarial tests.

**Why it could attract Riza:** It connects secure code execution to a clear enterprise control-plane problem and lets Kevin contribute product/UI/agent experience while learning the deeper runtime concerns.

## 29. Boundary / BAML — no specific verified requisition

### Product: ContractBench

**Pitch:** An open benchmark showing how typed AI-function contracts behave under schema complexity, partial data, model changes, malformed output, retries, and streaming.

**What to build:** A public dataset of structured tasks, BAML and JSON-schema baselines, conformance/error taxonomy, automatic repair measurement, latency/cost tracking, and a visual comparison explorer.

**Why it could attract BAML:** It demonstrates type-safe AI functions, evaluations, language/tooling curiosity, technical writing, and patient debugging—the traits the team says it values.

## 30. Matter Labs — current technical role is U.S.-only and not a profile match

### Product: ZKsync Differential Fuzzer

**Pitch:** A Foundry-based test harness that generates transactions against two ZKsync system-contract or tooling versions and flags divergent state, events, gas behavior, or revert semantics.

**What to build:** Select a narrow public component, generate constrained transaction sequences, compare results across versions/environments, minimize failures, publish traces, and document which differences are expected versus security-relevant.

**Why it could attract Matter Labs later:** It demonstrates serious ZKsync/EVM learning, testing discipline, low-level debugging, and secure systems thinking. It should support future relationship-building, not justify applying to the unrelated senior U.S. security opening.

## Recommended build order

If the goal is maximum application value with the least duplicated effort:

1. **Context CI** for PostHog because it is the strongest role match and directly uses Kevin's writing, teaching, full-stack, agent, and systems skills.
2. **Crawl Doctor** or **RLS Clinic** because either can use real public failures and could produce upstream contributions quickly.
3. **AgentPay** because it creates a distinctive public artifact at the intersection of agents, MCP, Bitcoin, and product engineering.
4. **Usage Ledger** as the deeper backend project that closes the most important infrastructure gap.

For each application, link directly to that company's product demo and case study. Do not make the reviewer search through a monorepo to discover why the project is relevant.
