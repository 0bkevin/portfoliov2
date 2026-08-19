# Kevin Bravo: CV source of truth

Use this file to prevent date drift and unsupported claims. Prefer newer explicit user statements over older generated CVs. Ask for confirmation when a material claim is not listed.

## Contact and preferences

- Name: Kevin Bravo
- Email: `0bravokevin@gmail.com`
- Phone: `+58 412 205 7346`
- Portfolio: `https://kevinbravo.com`
- GitHub: `https://github.com/0bkevin`
- LinkedIn: `https://www.linkedin.com/in/0bkevin/`
- Location: Venezuela; remote roles in LATAM
- Languages: Spanish native, English C1
- Education belongs at the end of the CV.
- Default output: English, two balanced US Letter pages, Arial 10.5 pt, 1.5 spacing.

## Professional history

### Free2Z — Senior Product Engineer

- March 2025 to current; United States, remote.
- Free2Z is a production creator platform for publishing, live streaming, and direct community support.
- Led the migration of the legacy React frontend to SvelteKit while the platform remained live.
- Improved responsive navigation, publishing workflows, article creation, and internationalization.
- Maintains TypeScript/SvelteKit frontend work and Python/Django/PostgreSQL backend work, including REST APIs, authentication, streaming, and content systems.
- Hardened Zcash challenge authentication against replay and proxy-spoofing attacks with durable one-use PostgreSQL claims; updated OpenAPI, NGINX, deployment configuration, tests, and runbooks.
- Currently building an MCP server and improving backend and infrastructure security, reliability, and maintainability.
- Uses AI coding models throughout development, with reviewer agents and executable checks.
- GCP, Kubernetes, Pub/Sub, and other infrastructure details appear in older CV sources. Verify them against the current codebase or with the user before making them central claims.

### U.S. Department of State via AVAA — Product Engineer

- October 2024 to August 2025; remote.
- Sole engineer for Billingua Talent, a multi-tenant talent and program operations platform.
- Owned requirements discovery, architecture, data modeling, product design, full-stack implementation, testing, and launch preparation.
- Worked with non-technical AVAA and U.S. Embassy stakeholders and explained technical tradeoffs in plain language.
- Designed RBAC for candidates, employers, advisors, and administrators.
- Built profiles, job workflows, English-level tracking, courses, services, registrations, dashboards, analytics, and reports.
- Used React/Next.js, TypeScript, Node.js, PostgreSQL, and Prisma.
- The product was completed and validated but did not enter production because program funding ended.

### Freelance Full-Stack Engineer

- July 2024 to December 2024; remote.
- Worked with education, finance, and professional-services clients.
- Owned requirements, scope, product and technical decisions, implementation, deployment, iteration, and support.
- Built websites with Astro, including `jenndolinski.com`, `rodolfomedinadelrio.com`, and Proyecto Educa's site.
- Built Flutter/Dart mobile applications, automations, integrations, and data-cleanup workflows.
- Proyecto Educa later invited Kevin to become CTO and co-founder. Confirm title and dates before presenting it as separate employment.

### AVAA — Full-Stack Engineer

- October 2022 to July 2024; Caracas, hybrid.
- Sole engineer for SEP and SEA, two production platforms replacing spreadsheet-based operations for AVAA and EducationUSA.
- Used Next.js, TypeScript, Node.js, PostgreSQL, Prisma, Auth.js, Python, and Azure.
- SEP supports about 400 monthly active users across three Venezuelan states.
- Designed data models, permissions, validation, dashboards, reports, payments, receipts, and operational workflows.
- Deployed and operated both products on Azure and handled production support.
- Added an internal RAG feature to SEP that retrieves program records before generating answers.
- Helped establish a program in which AVAA scholarship recipients maintain and extend SEP.

### AVAA — Junior Software Engineer

- September 2021 to August 2022; Caracas, on-site.
- Built Python ETL scripts to clean, normalize, validate, deduplicate, and reconcile four years of spreadsheet data.
- Recovered participant activity data from 2020 through 2023; it became SEP's initial dataset.
- Built a Power BI dashboard for demographic, academic, employment, satisfaction, and outcome data.
- Automated recurring activity management with Google Apps Script.

## Selected projects

### Viamu

- Private repository at `https://github.com/0bkevin/viamu`; current project.
- Go API, Nuxt/TypeScript clients, PostgreSQL/pgvector, Docker, standalone Supabase Auth, and AWS.
- Includes authentication, application workspaces, eligibility, ingestion and reconciliation, translations, semantic retrieval, contextual AI chat, alerts, measurement, saved opportunities, and subscription entitlements.
- Uses Ent and Atlas for relational models and migrations.
- Has worktree-aware isolated development environments.
- GitHub Actions run Go race tests, vetting, vulnerability checks, real PostgreSQL migrations, frontend tests, type checks, dependency audits, infrastructure validation, shell tests, and Docker builds.
- AWS deployment uses OIDC, ECR, immutable artifacts, Systems Manager, observability configuration, smoke checks, and serialized releases.
- Do not claim Supabase RLS, Stripe, Sentry, or Playwright from this project unless later verified.

### Zrode

- Public repository at `https://github.com/0bkevin/zrode`.
- Open-source environment used daily for Codex and OpenCode coding agents.
- TypeScript, React, Node.js, and WebSockets.
- Includes persistent sessions, typed events, provider integrations, multiple-agent workflows, runtime logs, message steering, recovery, usage tracking, file previews, and regression tests.

### RegistroCiberVE

- Python research and incident-verification pipeline using Playwright, browser tools, PDF extraction, LLM APIs, and structured outputs.
- Includes source scoring, field-level citations, retries, fallbacks, caching, model comparison, rejection reasons, uncertainty states, and human review.
- Adversarial cases include dead links, conflicting dates, incomplete PDFs, duplicate reports, weak sources, inaccessible pages, and similar entity names.

### Veo Create

- Public repository at `https://github.com/0bkevin/veo-create`.
- Created for a master's course project.
- Coordinates generative video and audio services to turn Markdown scenes into a completed video.

### Brio

- Appears in older CV sources as a Go/PostgreSQL/React Native agent control-plane project.
- Confirm its current status, repository, and exact implementation before using it as primary evidence.

## Open-source contributions

### Zed

- Contributed Rust changes to `zed-industries/zed`.
- Merged [PR #62022](https://github.com/zed-industries/zed/pull/62022), preserving `--user-data-dir` across Linux, macOS, and Windows restarts and adding regression coverage for restart and updater argument handling.
- Merged [PR #60938](https://github.com/zed-industries/zed/pull/60938), deriving non-empty LSP workspace-folder names consistently across initialization, notifications, and workspace-folder responses.
- Merged [PR #60864](https://github.com/zed-industries/zed/pull/60864), resolving relative Markdown links with line and column positions and adding regression coverage.

### Orca

- Merged [PR #10453](https://github.com/stablyai/orca/pull/10453) with TypeScript and React changes that detect missing `npx.cmd` during Windows skill setup, provide recovery guidance, preserve other platforms, and add focused tests.

### T3 Code

- Merged [PR #5379](https://github.com/pingdotgg/t3code/pull/5379) with TypeScript server changes that unsnooze a thread when it is settled, repair legacy settled-and-snoozed state, and cover lifecycle behavior with tests.

### Space Rabbit

- Submitted [PR #35](https://github.com/Tahul/space-rabbit/pull/35), an opt-in Swift/macOS Mission Control gesture feature with failure fallbacks, localization, build checks, and runtime validation. The PR was closed without merge; describe it as submitted, not merged or shipped.

## Volunteer and education

- Education Committee Member at AVAA, September 2024 to current.
- Code Mentor at Technovation Girls Venezuela, January 2026 to May 2026; guided four students through research, prototyping, debugging, and a final presentation.
- Master of Public Administration at IESA, in progress; expected 2027.

## Claims that require confirmation

Do not infer or invent:

- years of experience beyond the employment dates;
- C++, Java, C#, Ruby, MongoDB, BigQuery, Databricks, FoundationDB, ClickHouse, NATS, or other unlisted technologies;
- Supabase Row Level Security;
- Sentry, Stripe, or Playwright usage outside the projects listed above;
- U.S., Canadian, European, or other work authorization;
- production deployment for Billingua Talent;
- arbitrary performance percentages, cost savings, revenue, or user scale.
