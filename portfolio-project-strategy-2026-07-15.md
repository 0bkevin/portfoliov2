# Portfolio projects designed around the target companies

Verified against current official job descriptions and company materials on 2026-07-15.

This is a companion to [the ranked company research](./job-research-2026-07-15.md). The objective is not to build 30 unrelated demos. It is to create a small body of production-quality proof that answers the recurring questions in the job descriptions:

- Can Kevin take an ambiguous developer problem from discovery to a shipped product?
- Can he build reliable agents rather than a chat interface around an API?
- Can he work across frontend, backend, data, infrastructure, documentation, and support?
- Can he reason about context, identity, security, observability, retries, cost, and partial failure?
- Can he measure whether the thing he built actually helped?

## Recommendation

Build one flagship product and two smaller technical proofs:

1. **Incident-to-Fix Workbench** — the flagship. Best for PostHog, Mastra, Runlayer, Firecrawl, Supabase, Resend, Sourcegraph, Langfuse, Composio, and Daytona.
2. **MeterLab** — a correctness-first usage metering and billing system. Best for Railway and useful for Trigger.dev, Hatchet, Aleph, and backend/platform roles.
3. Choose one specialization:
   - **L402 Agent Commerce Lab** for Lightning Labs and agent infrastructure companies, or
   - **Postgres Recovery Operator** for PlanetScale, Canonical, Railway, and infrastructure roles, or
   - **EVM Security Evidence Pack** for OpenZeppelin, Nethermind, Alpen, and Matter Labs.

One finished, instrumented product with real users or real open-source issues is more persuasive than six half-finished repositories.

## 1. Flagship: Incident-to-Fix Workbench

### Product idea

A multi-tenant support-engineering system for open-source developer tools. It accepts a GitHub issue, support transcript, failed API request, or MCP trace and turns it into an evidence-rich resolution:

1. Redact secrets and identify the affected product version.
2. Retrieve the matching version of documentation, OpenAPI definitions, source code, examples, and known issues.
3. Run deterministic diagnostic checks before invoking an agent.
4. Create a disposable reproduction environment.
5. Replay HTTP, webhook, OAuth, SQL, or MCP interactions and capture a trace.
6. Produce a timeline, likely cause, confidence level, and minimal reproduction.
7. Generate a failing regression test, draft documentation change, or engineering issue for human review.
8. Cluster repeated incidents and show which product or documentation fix would remove the most tickets.

This is not a generic support chatbot. Its product promise is: **turn a vague developer complaint into reproducible technical evidence and a fix loop**.

### Why this is the highest-leverage build

- [PostHog's Context Engineer role](https://jobs.ashbyhq.com/posthog/b4bc11c6-49a8-48e1-9815-950ce7eef84d) requires knowledge bases, context pipelines, agents, MCPs, docs-as-code, example apps, and production services.
- [Runlayer's Support Engineer role](https://jobs.ashbyhq.com/runlayer/0b347b9f-11b4-4430-8409-ada973a46f81) explicitly asks for diagnostic agents, log-query templates, reproduction workflows, OAuth/SSO debugging, runbooks, and a support-to-product loop.
- [Firecrawl's Support Engineering role](https://jobs.ashbyhq.com/firecrawl/61f134a9-d91f-4b7b-a35d-14c60916454e) asks for internal tools, AI-assisted triage, ticket deflection, and product/DX fixes that eliminate a class of tickets.
- [Supabase's Support Engineer role](https://jobs.ashbyhq.com/supabase/e4e3ccb7-7b7d-42a2-be0f-26cbb5ae4abd) asks for SQL/Postgres debugging, GitHub issue monitoring, reproduction cases, tests, and internal tooling.
- [Mastra's Product Engineer role](https://jobs.ashbyhq.com/Mastra/3b06208b-34fe-4dda-b409-ee3fd9305cc3) values vague-problem ownership, open-source features, services, issue triage, customer support, agent-driven development, and weekly demos.
- [Resend's Product Engineer role](https://jobs.ashbyhq.com/resend/9b68ba51-3895-4d29-8fd1-364bdf8956e7) specifically calls for debugging and observability experiences around email, webhooks, domains, and API requests.
- [Sourcegraph's Agent Engineer role](https://job-boards.greenhouse.io/sourcegraph91/jobs/6103567004) emphasizes retrieval, context packing, citations, evaluations, reliability, latency, cost, and observable multi-step agents.

### A credible MVP

Use public GitHub issues from one open-source developer product instead of inventing fake customer data. Supabase, Mastra, Firecrawl, or Trigger.dev would provide a realistic corpus.

The MVP should support one incident type deeply—for example, a failed webhook or an OAuth/MCP connection—not five types superficially.

Required features:

- GitHub issue import and a manual incident form
- Tenant, project, incident, artifact, run, trace, and resolution data models
- Version-aware documentation and source ingestion
- Secret/PII redaction before model calls
- Deterministic diagnostic rules with visible results
- Agent plan with tool-call trace and citations
- Disposable reproduction environment or fixture repository
- Human approval before creating an issue, test, or documentation patch
- Incident clustering and a “tickets potentially eliminated” view
- OpenTelemetry traces, token/cost accounting, latency, and outcome metrics
- At least 20 labeled incidents for an evaluation set

### Suggested stack

- TypeScript, Next.js or SvelteKit, and PostgreSQL
- Mastra for the agent/workflow layer
- Firecrawl for documentation ingestion, with direct Git/GitHub ingestion for versioned source
- pgvector or a small purpose-built retrieval layer; do not hide all retrieval decisions behind a framework
- Docker-based disposable repro environments; E2B or Daytona can be an optional adapter
- OpenTelemetry plus a Langfuse adapter for traces and evaluations
- Supabase for a hosted version, or plain Postgres/Auth.js if the objective is to show backend ownership
- Railway for deployment
- Resend for incident notifications and webhook delivery testing

Using target-company products is useful only when each integration has a real reason to exist. The architecture should still be understandable without their logos.

### Evaluation plan

Publish a small benchmark instead of saying the agent “works.” Measure:

- Top-1 and top-3 root-cause accuracy
- Percentage of incidents producing a runnable reproduction
- Citation correctness
- False-confidence rate
- Median time to useful evidence
- Cost and latency per incident
- Resolution acceptance rate by a human reviewer
- Ticket-cluster precision
- Reduction in repeated manual steps

Compare at least three variants: model-only, retrieval without deterministic checks, and the complete hybrid workflow. Document failures and cases where the agent must abstain.

### The demo that gets attention

Use a seven-minute recorded scenario:

1. Import a real closed GitHub issue.
2. Show automatic version detection and redaction.
3. Watch the system retrieve cited docs and source.
4. Run the reproduction and inspect the HTTP/MCP/SQL trace.
5. Show a deliberately failed agent hypothesis being rejected by a deterministic check.
6. Produce a regression test or documentation patch for human approval.
7. Show the same incident joining a cluster and changing the priority dashboard.

### Public artifacts

- A live deployment with a safe seeded workspace
- An Apache-2.0 or MIT repository
- Architecture diagram and threat model
- An engineering requirements document and decision log
- Evaluation dataset and reproducible benchmark command
- A written post: “Why support agents need evidence, not just answers”
- A second post on one failure: stale context, OAuth replay, bad retrieval, or secret leakage
- A 90-second overview and a seven-minute technical demo
- Three small upstream contributions discovered while building it

### Avoid

- A chat UI whose only action is searching documentation
- Claims of ticket deflection without a test corpus or real usage
- Letting the LLM execute arbitrary code or replay credentials without policy controls
- Pretending synthetic scale is production scale
- Auto-opening pull requests without human approval

## 2. Context Supply Chain

This can be a standalone two-week build or a polished subsystem of Incident-to-Fix. It is the most direct attention-grabber for PostHog.

### Product idea

A docs-as-code pipeline that converts changing source material into versioned, composable context packages for humans and agents.

It should:

- Ingest documentation, OpenAPI specs, SDK source, examples, changelogs, and runbooks.
- Preserve product and framework versions rather than flattening everything into one vector index.
- Use declarative recipes to assemble packages for tasks such as “install analytics in SvelteKit SSR” or “debug a Python webhook.”
- Publish packages as GitHub releases, downloadable skills, and MCP resources.
- Detect source/context drift when a feature PR changes behavior without updating docs or examples.
- Run task-level evaluations before publishing a new package.
- Provide provenance down to file, commit, heading, and line range.

### Best demonstration

Create packages for Kevin's own Zrode or Brio documentation, then use one package to onboard an agent into a clean repository. Measure successful setup rate, time, token usage, and stale-answer rate before and after the pipeline.

### Companies reached

PostHog first; Sourcegraph, Mastra, Langfuse, BAML, Firecrawl, and any company building agent-facing documentation second.

## 3. MeterLab: usage, billing, and failure simulator

### Product idea

An open-source miniature cloud billing backbone. It receives high-volume workload usage events, produces auditable invoices, survives duplicate and out-of-order events, reconciles provider failures, and scores abuse.

This aligns almost line-for-line with [Railway's Scalability role and interview domain](https://railway.com/careers/scalability). It should be Kevin's deepest backend artifact, not a broad SaaS product.

### Required components

- Event ingestion for CPU, RAM, network, and storage usage
- At-least-once delivery with deduplication and explicit idempotency keys
- Time-window aggregation and a versioned rating engine
- Credits, prepaid balance, tiered rates, invoice adjustments, and audit trail
- Stripe test-mode payment adapter
- Durable invoice/reconciliation workflows using Temporal or an equivalent
- Dead-letter and manual-repair flows
- Simple fraud signals: impossible usage, free-tier farming, velocity, and repeated payment failures
- GraphQL or REST API and a small operations UI
- Load generator, failure injector, and invariant/property tests
- Postgres first, with an optional ClickHouse event-store comparison

### Evidence to publish

- An ERD and a written explanation of transaction boundaries
- Invariants such as “the same event never bills twice” and “ledger balance is reproducible from immutable entries”
- Failure demonstrations: provider timeout after charge, worker crash mid-run, duplicate delivery, late event, and Postgres saturation
- Benchmarks at 1x and 10x load with honest hardware details
- Reconciliation report proving eventual agreement
- A short ERD/architecture presentation that can be defended without reading notes

### Important boundary

Railway asks candidates to design a scaling system during its interview. This public project should be original prior work and clearly labeled as such. If invited to interview, follow the company's instructions and produce the requested prework independently rather than presenting an old artifact as newly completed work.

### Companies reached

Railway first; Aleph, Trigger.dev, Hatchet, PlanetScale, Canonical, Better Stack, and backend/platform roles second.

## 4. L402 Agent Commerce Lab

### Product idea

An MCP gateway where an agent discovers a paid tool, receives an L402 challenge, pays a testnet Lightning invoice under a configurable budget, invokes the tool, and records a verifiable receipt.

This directly answers the examples in [Lightning Labs' AI Product Engineer description](https://jobs.ashbyhq.com/lightning/324103e5-b9c7-4d4a-b844-3b9fbaebc654): an L402-powered agentic-commerce demo, MCP server, end-to-end developer experience, and cross-functional product explanation.

### Required components

- Two useful MCP tools with different prices, not a paid “hello world”
- L402 challenge and payment flow on testnet/regtest
- Agent wallet budget, per-tool limits, daily cap, and emergency stop
- Idempotent payment and invocation semantics
- Receipt, audit log, retry rules, and refund/failure policy
- TypeScript SDK and one Python example
- Clear threat model for prompt injection, price manipulation, replay, and tool impersonation
- A non-crypto user experience that explains exactly what happened

### Strong product angle

Use it to pay for an expensive diagnostic action inside Incident-to-Fix—for example, launching a disposable reproduction environment or running a premium code-analysis tool. That demonstrates an actual reason for machine-to-machine payment.

### Companies reached

Lightning Labs first; Mastra, Runlayer, Composio, Browserbase, E2B, Riza, and other agent-platform companies second.

## 5. Postgres Recovery Operator

### Product idea

A small Go service/operator that provisions Postgres clusters in local Kubernetes, schedules backups, performs point-in-time restore, detects primary failure, promotes a replica, and reports recovery-point and recovery-time results.

This is the most honest way to close Kevin's gap for [PlanetScale's Postgres role](https://job-boards.greenhouse.io/planetscale/jobs/4251150009), which expects Go, Kubernetes, database operations, high availability, disaster recovery, and fault-tolerant systems.

### Required components

- Go control loop and declarative cluster specification
- Primary/replica topology with health checks
- Backup, restore, and point-in-time-recovery workflows
- Connection pooling and graceful failover behavior
- Encrypted backup storage and credential rotation
- Chaos scenarios: process kill, node loss, network partition, disk pressure, and corrupted backup
- RPO/RTO dashboard and correctness checks after recovery
- Runbook and postmortem for each failure scenario

### Honest positioning

This would demonstrate serious learning and systems judgment, not prove experience operating the world's largest Postgres fleets. The README should make that distinction explicit.

### Companies reached

PlanetScale first; Canonical, Railway, Fly.io, Better Stack, Supabase Control Plane, and infrastructure roles second.

## 6. EVM Security Evidence Pack

### Product idea

Do not build another token or NFT. Produce an evidence pack that demonstrates security reasoning:

- A deliberately vulnerable Solidity protocol with economic and access-control flaws
- Foundry exploit tests for each vulnerability
- Invariant and fuzz tests that would have caught them
- A professional audit report with severity, impact, proof, and remediation
- A patched version and regression suite
- One small monitoring or incident-response tool
- Optional ZK extension explaining which properties are proven and which remain trust assumptions

### Stronger variation

Build an “agent transaction policy firewall”: simulate an agent's proposed EVM transaction, decode approvals and calls, apply spending/contract policies, flag dangerous state changes, and require human approval. Keep deterministic policy evaluation authoritative; use an LLM only for explanation.

### Companies reached

OpenZeppelin, Nethermind, Alpen Labs, Matter Labs, Infisical, Runlayer, and Lightning Labs.

## Company-by-company build map

The following are tailored hooks, not recommendations to create 30 separate repositories.

| Rank | Company | Most persuasive build or extension | What it proves from the job/company material |
|---:|---|---|---|
| 1 | PostHog | Context Supply Chain plus a SvelteKit/Django onboarding skill | Writing and production code, knowledge architecture, context delivery, MCP, docs-as-code, teaching, and system thinking |
| 2 | Mastra | Build Incident-to-Fix with Mastra; contribute a framework fix found during the build | Full-stack TypeScript, vague-to-shipped ownership, framework/platform work, issue triage, cloud deployment, and weekly demo velocity |
| 3 | Runlayer | Add an MCP/OAuth incident replay lab with redaction, policy checks, and runbook generation | MCP, HTTP/OAuth debugging, enterprise support, observability, reproducible escalation, and zero-to-one support tooling |
| 4 | Aleph | Add an operational reconciliation workspace: CSV/API imports, canonical model, scenarios, variances, lineage, and AI explanations | Complex B2B data models, integrations, trustworthy workflows, product judgment, and replacing spreadsheet-heavy operations |
| 5 | Supabase | Build a SQL/RLS/Auth issue reproducer that creates a minimal test case from a GitHub issue | PostgreSQL depth, Linux/CLI, JavaScript frameworks, issue triage, test creation, and internal support tooling |
| 6 | Firecrawl | Ingest public docs/issues with Firecrawl, cluster recurring failures, and show the highest-leverage doc/product fixes | Full-stack internal tools, LLM workflows, support leverage, ticket prevention, speed, and measurable iteration |
| 7 | Resend | Add an Email Flight Recorder: API request, DNS, domain verification, email events, and webhook timeline with replay | TypeScript/React craft, developer UX, debugging, observability, webhooks, API platforms, and end-to-end ownership |
| 8 | Lightning Labs | L402 Agent Commerce Lab with an MCP tool, wallet budget, testnet payment, and receipt | Agentic workflows, MCP, Bitcoin/Lightning curiosity, developer demos, automation, and product instincts |
| 9 | Railway | MeterLab with failure injection, invariants, reconciliation, fraud signals, and a defendable design document | Postgres, Node, queues, Temporal, billing, concurrency, partial failure, auditability, written system design, and 10x thinking |
| 10 | Sourcegraph | Add code-context retrieval, citations, change-impact graph, eval set, cost/latency budgets, and model comparisons | Reliable multi-step agents, retrieval/ranking, evaluations, measurable quality, production controls, and code understanding |
| 11 | Canonical | Build a Python/Django Ubuntu Fleet Lab: agents report package/security/health state and operators schedule safe updates | Python/Django, public APIs, PostgreSQL, Ubuntu, telemetry, security, release management, testing, and distributed ownership |
| 12 | PlanetScale | Postgres Recovery Operator | Go, Kubernetes, backup/restore, failover, fault tolerance, on-call thinking, and communicating infrastructure tradeoffs |
| 13 | Infisical | Add secret scanning, short-lived credentials, tool-level policy, rotation, and an immutable audit log to Incident-to-Fix | Secrets management, security-conscious product engineering, auth, multi-tenancy, and developer infrastructure |
| 14 | Better Stack | Add an incident timeline that joins logs, metrics, traces, deploys, and status communication | Observability product thinking, debugging UX, operational data, and incident response |
| 15 | Langfuse | Publish the Incident-to-Fix evaluation dataset and a Langfuse integration comparing prompts/models/retrievers | Agent observability, evaluations, traces, Python/TypeScript SDK work, and open-source integration quality |
| 16 | Kestra | Implement the reproduction flow as a durable, human-approved Kestra workflow | Orchestration, retries, events, AI workflows, Docker/cloud execution, and product/UI integration |
| 17 | Trigger.dev | Implement long-running reproduction jobs with pause/resume, idempotency, replay, and concurrency controls | Durable background jobs, TypeScript backend work, queues, failures, and developer experience |
| 18 | E2B | Run untrusted reproduction code in a disposable E2B sandbox with resource/network policy and replay | Agent sandboxes, code execution, security boundaries, SDK integration, and developer-facing demos |
| 19 | Browserbase | Add a browser incident reproducer with Stagehand, session replay, screenshots, and deterministic assertions | Browser agents, TypeScript, open source, distributed execution, reliability, and debugging |
| 20 | Composio | Add a connector workbench that tests OAuth setup, refresh, scopes, retries, and tool schemas across integrations | Auth, connectors, MCP, tool execution, multi-tenancy, observability, and platform primitives |
| 21 | Browser Use | Build one difficult browser workflow with checkpoints, recovery, and an evaluation set; contribute the fixes upstream | Browser-agent reliability, visible building, GitHub proof, and high-agency open-source work |
| 22 | Daytona | Use persistent Daytona sandboxes for reproductions and contribute a bounty/fix discovered in production-like use | Agent execution, persistent environments, DX/support, infrastructure, and open-source contribution |
| 23 | Alpen Labs | Build a Bitcoin/ZK developer explorer or proof-verification observability UI, with a precise threat/trust model | Product engineering applied to Bitcoin/ZK without overstating cryptography expertise |
| 24 | Nethermind | Create the EVM Security Evidence Pack and contribute one issue or tool improvement | Solidity security, Foundry, EVM internals, technical writing, AI/tooling crossover, and public learning velocity |
| 25 | OpenZeppelin | Professional audit report, exploit/invariant tests, patched contracts, and Defender-style monitoring rule | Security research process, Solidity, threat modeling, reproducible findings, and clear remediation writing |
| 26 | Fly.io | Deploy Incident-to-Fix workers in multiple regions; test placement, latency, failover, and state consistency | Distributed deployment, developer cloud use, operational writing, and awareness of regional failure modes |
| 27 | Hatchet | Port the incident workflow to Hatchet and contribute replay/observability documentation or an SDK example | Durable workflows, Postgres, TypeScript/Python, retries, concurrency, open source, and early-stage initiative |
| 28 | Riza | Execute generated reproduction snippets under strict language, network, time, and resource policies | Secure code execution, agent infrastructure, auditability, Go/TS/Rust curiosity, and control-plane product work |
| 29 | Boundary/BAML | Define typed incident diagnoses and tool outputs in BAML; benchmark schema adherence and recovery from malformed model output | Type-safe AI functions, evaluations, reliability, language tooling, and technical explanation |
| 30 | Matter Labs | Add a ZKsync-specific Foundry/Yul security case study or developer diagnostic tool | EVM/ZK commitment, low-level learning, secure tooling, and honest long-term protocol specialization |

## Four-week execution plan

### Week 1 — narrow the problem and establish evidence

- Select one public open-source product and one incident category.
- Label 20–30 resolved GitHub issues with cause, version, evidence, and resolution.
- Write the engineering requirements document, threat model, and evaluation plan.
- Implement multi-tenant data models, issue import, redaction, and basic UI.

### Week 2 — build the reliable workflow

- Add version-aware context ingestion and citations.
- Implement deterministic diagnostic tools.
- Create the disposable reproduction environment.
- Add the agent loop, human approval, trace storage, and failure handling.

### Week 3 — close the support-to-product loop

- Produce a runnable reproduction and draft test/docs issue.
- Cluster repeated incidents and rank proposed fixes.
- Add cost, latency, quality, and abstention metrics.
- Run the benchmark and repair the largest failure class.

### Week 4 — make the work legible

- Improve the product experience and seeded demo.
- Publish the repository, architecture, threat model, and evaluation results.
- Record the short and technical demos.
- Publish the failure-analysis article.
- Submit small, relevant upstream fixes discovered during development.

## Minimum quality bar before linking it in an application

- The hosted demo works from a clean browser session.
- A new developer can run it locally from the README.
- CI covers tests, migrations, linting, and a small evaluation smoke test.
- Secrets never appear in traces, prompts, or screenshots.
- The repository includes fixtures and a repeatable demo command.
- The architecture document explains tradeoffs and rejected alternatives.
- The benchmark distinguishes measured results from assumptions.
- At least one non-author has used the product and their feedback changed it.
- The application links directly to the relevant demo, commit, document, or result—not merely the repository homepage.

## Final prioritization

If PostHog is the first target, build **Context Supply Chain** as the centerpiece and make Incident-to-Fix its proof application.

If Mastra, Runlayer, Firecrawl, or Supabase is first, build **Incident-to-Fix** and tailor the deepest adapter to that company.

If Railway is first, build **MeterLab** and spend more time on invariants, load testing, and failure analysis than on UI.

If Lightning Labs is first, build **L402 Agent Commerce Lab** and integrate it into a useful agent workflow.

If PlanetScale or infrastructure roles are the long-term goal, build **Postgres Recovery Operator** and treat it as a serious learning project rather than a weekend demo.

If security/ZK companies are the priority, publish the **EVM Security Evidence Pack** before building another general application.
