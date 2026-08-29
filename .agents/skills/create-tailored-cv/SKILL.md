---
name: create-tailored-cv
description: Create, revise, audit, render, and package truthful ATS-friendly CVs for a specific job title. Use when asked to make or tailor a resume/CV from a job description, translate an existing CV, improve resume bullets, balance Letter-size pages, validate a generated PDF, or prepare editable CV sources for GitHub.
---

# Create Tailored CV

Create a plain, evidence-based CV that a recruiter can understand in about 20 seconds. Tailor the document to the job title and its recurring qualifications, while using the supplied posting to prioritize evidence.

## Required references

Read these before drafting:

1. [Recruiter method](references/recruiter-method.md) for qualification selection, bullet construction, formatting, and application heuristics.
2. [Candidate facts](references/candidate-facts.md) when creating a CV for Kevin Bravo. Treat it as the source of truth and verify any material claim not listed there.
3. Repository-level [CV_INSTRUCTIONS.md](../../../CV_INSTRUCTIONS.md) for output paths, validation, and commit rules.

Use [resume-template.html](assets/resume-template.html) as the starting layout for new HTML CVs.

## Workflow

### 1. Establish the target

- Extract the canonical job title. Create a reusable title-based CV, not a company-specific marketing document.
- Read only the requirements, qualifications, must-haves, and equivalent sections first.
- Build a qualification list for the title. Use the posting for priority, then consult the published qualification index and comparable postings when research is requested.
- Separate required, preferred, and unsupported qualifications.

### 2. Build an evidence matrix

For every important qualification, record:

| Qualification | Where used | What was built | How it was used | Business reason or user outcome | Support |
|---|---|---|---|---|---|

Mark support as `strong`, `partial`, or `unsupported`. Draft from strong evidence first. Never turn adjacent experience into direct experience. Do not claim years, tools, scale, authorization, or production status without support.

Aim to demonstrate at least 75% of the title's important qualifications. If the evidence does not reach that threshold, still produce the best truthful CV and state the material gaps in the handoff.

### 3. Select the structure

- Default to reverse chronological work history.
- Use a three-skill-bucket resume only for director-level candidates, candidates with more than half contract work, or clear job-hopping histories.
- Put professional experience before projects.
- Use projects only to prove qualifications that work history cannot show.
- Keep Education at the end for Kevin unless the user explicitly requests otherwise.
- Add a summary only for relocation, visa/work-authorization explanation, or a genuine industry transition.

### 4. Write qualification bullets

- Start each role with a plain-language overview of the product, stack, users, and purpose.
- Write each bullet as `what + how + why/where`.
- Prefer three to six relevant qualification terms per bullet. Do not dump every tool into one sentence.
- Keep bullets at three rendered lines or fewer and one sentence when possible.
- Make the basic requirements easy to find: languages, frontend, backend, APIs, databases, cloud, testing, CI/CD, collaboration, and production ownership.
- Explain technical work so a non-technical recruiter can understand why it existed.
- Use infrastructure scale, leadership scope, dates, and phone numbers when meaningful. Avoid arbitrary percentages and context-free metrics.
- Use present tense only for genuinely ongoing responsibilities; use past tense for completed work.
- Remove adjacent but irrelevant details. The requested qualification is the hamburger; related technology is not a substitute.

### 5. Apply the layout

- US Letter, single column, Arial.
- Name: 14 pt bold. Body: 10.5 pt. Line spacing: 1.5.
- Black and white, with blue only for contact links.
- No photo, icons, charts, rating bars, sidebars, tables, or decorative ATS-hostile elements.
- Target two balanced pages for an experienced engineer. Do not force one page by shrinking the text.
- Keep dates right-aligned and job information italicized.
- Avoid large unused areas. Move whole bullets across the explicit page break until both pages have similar bottom whitespace.

### 6. Render and validate

Run:

```bash
python3 .agents/skills/create-tailored-cv/scripts/validate_resume.py cv/<slug>.html
.agents/skills/create-tailored-cv/scripts/render_resume.sh cv/<slug>.html tmp/pdfs/<slug>/<filename>.pdf
```

Confirm:

- exactly two Letter pages unless the user requested otherwise;
- no clipped or overflowing text;
- similar bottom whitespace on both pages;
- Education remains at the end;
- all links, dates, titles, and claims match the source of truth;
- no generated PDF is staged for commit.

### 7. Handoff or publish

- Save editable sources under `cv/` with a descriptive lowercase slug.
- Save generated PDFs only under `tmp/pdfs/` for local delivery.
- Link both HTML and PDF to the user when working locally.
- For a source-only PR, run the duplicate audit, stage only editable sources and instructions, inspect the staged diff, then push and open the PR.

```bash
python3 .agents/skills/create-tailored-cv/scripts/validate_resume.py --audit-dir cv
git diff --cached --name-only
```

Never commit a generated PDF, LaTeX auxiliary file, temporary render, or duplicate source.
