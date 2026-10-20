# CV instructions for repository agents

Any agent creating, translating, editing, auditing, rendering, or publishing a CV in this repository must use the `create-tailored-cv` skill at `.agents/skills/create-tailored-cv/SKILL.md`.

## Mandatory process

1. Read the skill completely.
2. Read its recruiter-method reference.
3. For Kevin Bravo's CVs, read its candidate-facts reference and preserve exact titles and dates.
4. Build an evidence matrix from the job title's qualifications before writing.
5. Use qualification bullets that state what was done, how and where it was done, and why it mattered.
6. Keep professional experience ahead of projects and Education at the end.
7. Render to two balanced US Letter pages unless the user requests otherwise.
8. Run the supplied validator and inspect the PDF before delivery.
9. Store editable HTML under `cv/` and local PDFs under `tmp/pdfs/`.
10. Commit only editable sources. Never stage generated PDFs, temporary renders, LaTeX auxiliary files, or exact duplicate CVs.

## Source material

The method is derived from:

- `Resume+guide+2.0+(1).pdf`
- `Example+Resume+.pdf`
- the repository owner's recruiter transcript;
- the published [Qualification sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vRg7oze-BnheKtSvQH2ApktuRYyWaXOuvE9hgke4puccxX4Gs5I9-xAfxaKgRoYxYh6W1DlyqSA9e2c/pubhtml#gid=1421544187).

The detailed, operational version lives in `.agents/skills/create-tailored-cv/references/recruiter-method.md`; do not paste the full transcript into every prompt.
