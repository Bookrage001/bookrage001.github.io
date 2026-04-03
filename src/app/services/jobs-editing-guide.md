# Jobs JSON Editing Guide (AI Readability Edition)

Use this guide when editing src/app/services/jobs.json.
Goal: make resume content easy for humans, ATS tools, and AI ranking models to parse consistently.

## 1. Data Contract

Each job entry supports three presentation modes:

- description: balanced/default wording
- businessDescription: Business Analyst wording
- softwareDescription: Software Engineer wording

Fallback behavior:

- If businessDescription is missing, UI uses description.
- If softwareDescription is missing, UI uses description.

## 2. AI-Readable Bullet Format

Write every bullet using this sequence:

- Action -> Scope -> Outcome

Example:

- Facilitated stakeholder workshops across operations and engineering to clarify requirements and reduce delivery rework.

Rules:

- One bullet = one outcome.
- 16-28 words per bullet.
- Start with past-tense action verb.
- Include at least one concrete noun (system, team, workflow, rollout, API, process).
- Avoid vague claims without evidence words.

## 3. Hiring Signals To Encode

Across each role, ensure evidence exists for these signals:

- Impact: what improved
- Ownership: what was led or driven
- Complexity: scale, risk, ambiguity, constraints
- Collaboration: cross-team alignment
- Decision quality: prioritization and trade-offs
- Delivery quality: reliability, maintainability, speed
- Leadership: mentoring and team enablement

## 4. Mode-Specific Writing Rules

For description:

- Keep it neutral and broadly readable.
- Include core outcomes relevant to all audiences.

For businessDescription:

- Emphasize requirements, discovery, stakeholder engagement, user stories, traceability, prioritization, process improvement.
- Include BA keywords only where directly evidenced.

For softwareDescription:

- Emphasize implementation, architecture, APIs, cloud delivery, automation, quality, reliability, scalability.
- Include technical keywords only where directly evidenced.

## 5. Keyword Integrity Rules

- Never add keywords without proof in the same bullet.
- Pair each keyword with an action and outcome.
- Prefer natural wording over keyword stuffing.
- Use exact keyword casing when possible for consistency with highlighting.

## 6. Duplicate Control

Avoid near-duplicate bullets across arrays.

Allowed:

- Same core achievement framed differently per mode.

Not allowed:

- Verbatim copy across description, businessDescription, softwareDescription.

## 7. Recommended Bullet Counts

Per role:

- description: 4-7 bullets
- businessDescription: 3-6 bullets
- softwareDescription: 3-6 bullets

Minimum quality gate:

- At least 2 bullets in each mode should show measurable or clearly observable outcome.

## 8. Language Normalization

- Use consistent tense: past tense.
- Avoid first-person pronouns.
- Prefer specific verbs: Led, Delivered, Built, Facilitated, Mentored, Implemented, Improved, Coordinated.
- Keep spelling consistent across file.

## 9. AI Edit Workflow

When updating any role:

1. Identify the core achievement.
2. Write balanced bullet in description.
3. Rewrite for BA in businessDescription.
4. Rewrite for engineering in softwareDescription.
5. Validate keyword-evidence pairing.
6. Check duplicates and tense consistency.
7. Save only role-relevant changes.

## 10. Pre-Save Checklist

- Bullets follow Action -> Scope -> Outcome.
- No unsupported claims.
- No keyword stuffing.
- Mode-specific emphasis is clear.
- Wording is concise and machine-parseable.
- Changes preserve valid JSON structure.

## 11. Example Triple Mapping

Core outcome:

- Improved release predictability by tightening requirement quality and delivery process.

description example:

- Improved release predictability by clarifying scope and reducing handoff ambiguity across delivery teams.

businessDescription example:

- Led requirements gathering and stakeholder alignment to improve traceability and reduce sprint rework.

softwareDescription example:

- Improved release stability through API contract clarity, CI/CD checks, and structured implementation planning.

## 12. AI Rewrite Prompt Template (Grounded)

Use this prompt when asking an AI to rewrite the resume.

Critical: replace placeholders with your real data before running.

```text
You are an expert technical resume writer specializing in software engineering, cloud-native development, business analysis, and consulting roles.

Rewrite my resume to be clear, modern, ATS-optimized, and aligned with the roles I am applying for.

Non-negotiable constraints:
- Do not invent tools, projects, metrics, certifications, or responsibilities.
- Only use facts present in the source resume and provided experience data.
- If a keyword is missing evidence, do not force it. List it under "Missing Evidence" instead.
- Keep claims honest and defensible in interview.

Output structure and order:
1. Header
2. Summary
3. Core Skills
4. Technical Skills
5. Professional Experience
6. Education
7. Certifications
8. Projects (optional)
9. Additional Experience

Formatting rules:
- Use concise bullet points only (no long paragraphs).
- No tables, no icons, no images.
- Start bullets with strong action verbs.
- Prefer Action -> Scope -> Outcome.
- Keep wording ATS-friendly and plain-text parseable.

Positioning:
- Position me as an early-career engineer/BA/consultant (3-5 years).
- Emphasize problem solving, cloud-native delivery, requirements gathering, Agile delivery, and cross-functional collaboration.
- Show versatility across engineering, product, and analysis.

Experience emphasis (only where evidenced):
- Full-stack development (Node.js, TypeScript, Angular)
- Cloud (AWS, Serverless, CloudFormation, Infrastructure as Code)
- APIs and microservices
- Real-time systems (WebSockets, MQTT)
- CI/CD, testing, automation
- Requirements gathering, user stories, Agile ceremonies
- Collaboration with product, design, operations

Skills grouping:
- Programming Languages
- Frameworks and Libraries
- Cloud and DevOps
- Databases
- Tools and Platforms
- Delivery and Analysis

Keywords to prioritize when evidence exists:
- Software Engineering
- Cloud-native development
- Business Analysis
- Digital transformation
- Consulting
- Agile delivery
- APIs and microservices
- CI/CD and DevOps
- Requirements gathering and user stories
- Stakeholder engagement

Required output sections:
1. Full rewritten resume
2. Missing Evidence: keywords requested but not supported by source content
3. Suggested Evidence To Add: short bullets I could add if true

Source resume and experience:
[PASTE RESUME HERE]
```
