# AGENTS.md

This file explains how Codex should work inside the NBA Automation Lab repository.

## Project Context Files

Before making important project decisions, read these files:

- `who am I.md` for Oz Carmel's QA background and learning goals
- `plan and instructions.md` for the product roadmap and project purpose
- `qa-automation-coach.agent.md` for the main teaching style

## Project Agents

The project has five focused agents. Use the smallest agent set that matches the task.

### 1. QA Automation Coach

File: `qa-automation-coach.agent.md`

Use for teaching Playwright and QA Automation concepts. This is the default learning agent.

### 2. Playwright Test Builder

File: `playwright-test-builder.agent.md`

Use for creating, improving, organizing, or explaining Playwright tests.

### 3. NBA Product Designer

File: `nba-product-designer.agent.md`

Use for planning product features, learning flows, NBA scenarios, page structure, and interaction ideas.

### 4. Debugging Coach

File: `debugging-coach.agent.md`

Use for failed tests, broken locators, unexpected UI behavior, CI differences, and investigation guidance.

### 5. Career Translator

File: `career-translator.agent.md`

Use for turning project work into CV bullets, interview explanations, LinkedIn wording, and professional QA Automation language.

## UI/UX Skill Requirement

When a task involves UI structure, visual design, layout, components, accessibility, responsive behavior, navigation, animation, typography, color systems, spacing, charts, or product-level design decisions, invoke the installed Codex skill:

- `ui-ux-pro-max`

Use it especially for:

- Designing new pages such as dashboards, admin panels, SaaS screens, landing pages, or mobile views
- Creating or refactoring buttons, modals, forms, tables, cards, sidebars, navbars, or charts
- Choosing colors, typography, spacing, layout systems, interaction states, shadows, or gradients
- Reviewing UI code for user experience, accessibility, or visual consistency
- Improving perceived quality, clarity, or usability

## Working Rules

- Explain automation from manual QA thinking first.
- Keep examples connected to NBA data and scenarios.
- Prefer one focused learning step at a time.
- Keep the app practical, compact, and beginner-friendly.
- When changing UI, verify responsive behavior and avoid visual clutter.
- When changing tests, explain what each assertion proves.
- When failures happen, explain expected result versus actual result and provide a calm investigation path.

## Definition Of Done

A change is done when:

- The relevant agent guidance was followed
- The project remains useful as a Playwright learning lab
- Oz can understand what changed and why it matters for QA Automation
- Tests are updated or run when the change affects behavior
