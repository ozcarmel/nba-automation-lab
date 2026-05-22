# Plan And Instructions

## Project Purpose

This project is a hands-on learning website for starting and improving my journey in automation testing.

The main goal is to learn Playwright by building and testing a real website, step by step. The website should also help me improve my professional skillset for QA Automation jobs and QA roles that include AI-related terminology, tools, and workflows.

Important direction update:

The main project should be guided by a personal QA Automation Coach agent. The website is a practice lab that supports the agent, not the main teacher by itself.

Agent instruction file:

- qa-automation-coach.agent.md

This project should teach both:

- How to use Playwright in practical automation scenarios
- How to explain automation concepts clearly in professional QA language

## Main Website Theme

The website should use a sports theme, focused on the NBA.

I love the NBA, games, statistics, players, and teams, so every Playwright feature should connect to NBA-related examples whenever possible.

The working concept is:

**NBA Automation Lab**

An NBA-themed learning website where each area of the site demonstrates a different Playwright automation capability.

## Technology Principles

Everything in this project should be free and open source.

The project should avoid paid services, closed-source dependencies, and tools that require a paid account for core functionality.

The project should include a modern free database that can be used locally during development and testing.

Possible database options to consider:

- PostgreSQL: strong open-source relational database, useful for realistic QA and backend testing
- SQLite: simple local file-based database, easy for early learning and fast setup
- MySQL or MariaDB: common open-source relational database options
- MongoDB Community Edition: open-source NoSQL-style document database option

The preferred direction is to choose a database that supports hands-on QA learning, API testing, data setup, test data cleanup, and realistic automation flows.

## Recommended Initial Stack

The preferred initial stack is:

- Frontend: React with Vite
- Automation: Playwright
- Backend: Node.js with Express or Fastify
- Database: PostgreSQL
- Database access: Prisma or another open-source database toolkit
- Editor: VS Code
- Source control: Git and GitHub

This stack is free, open source, modern, and relevant for QA Automation job requirements.

PostgreSQL is the preferred database because it is widely used in real projects and gives good practice for database validation, test data setup, API testing, and backend-related automation scenarios.

SQLite can still be considered for the earliest prototype if we want the simplest possible setup, but PostgreSQL is better for long-term learning and portfolio value.

## Possible Playwright Learning Areas

The website should be divided into sections that allow learning and practicing Playwright capabilities.

Possible learning areas:

- Record test scenarios
- Automate UI flows
- Test login and logout
- Test end-to-end user journeys
- Test API requests and responses
- Automate backend validation
- Load and prepare test data
- Validate forms
- Test search and filtering
- Test sorting and pagination
- Test role-based permissions
- Test tenant or organization-based access
- Work with authentication tokens
- Test OAuth 2.0-style flows
- Test file upload and download
- Inspect network requests
- Mock API responses
- Simulate delayed or failed responses
- Capture screenshots
- Use Playwright traces
- Generate test reports
- Run tests from VS Code
- Run tests from command line
- Prepare for CI/CD execution
- Use AI tools such as Copilot or Codex to assist automation work

## NBA-Based Example Ideas

Each Playwright feature should be connected to NBA-style functionality.

Example areas:

- Teams page
- Players page
- Games page
- Standings page
- Stats explorer
- Favorite players list
- Fan login
- Analyst dashboard
- Admin portal
- API playground
- Automation challenges

Example scenarios:

- Search for a player by name
- Filter players by team or position
- Compare two players' stats
- View team standings
- Open a game box score
- Save favorite players
- Log in as a fan
- Log in as an analyst
- Log in as an admin
- Validate permissions between roles
- Load fake NBA data into the database
- Validate API responses for players, teams, games, and standings
- Mock a live score update
- Simulate a stats API failure
- Capture a Playwright trace for a failed test

## Proposed Website Structure

The first version of the website can include these areas:

- Home dashboard: overview of NBA Automation Lab
- Teams: list, search, filter, and team details
- Players: list, player profile, position filters, and stat comparison
- Games: schedule, game details, and box score
- Standings: team rankings and sorting
- Favorites: save favorite players or teams
- Login: fan, analyst, and admin users
- Admin Portal: manage teams, players, games, roles, and permissions
- API Playground: show API examples and responses
- Automation Challenges: guided Playwright scenarios to practice

## Suggested Learning Milestones

Milestone 1: Project setup

- Create the website project
- Install Playwright
- Add the first simple page
- Run the first Playwright test

Milestone 2: Basic UI automation

- Test page loading
- Test navigation
- Test search
- Test filters
- Test sorting

Milestone 3: Forms and validation

- Add forms for favorite players or scouting notes
- Test required fields
- Test invalid values
- Test successful save messages

Milestone 4: API automation

- Add API endpoints for teams, players, games, and standings
- Test status codes
- Test response bodies
- Test error responses
- Compare UI data to API data

Milestone 5: Database-backed testing

- Add PostgreSQL
- Seed NBA-style test data
- Validate API responses against database records
- Prepare and clean test data for Playwright tests

Milestone 6: Authentication and permissions

- Add login and logout
- Add fan, analyst, and admin roles
- Test role-based page access
- Test permission differences between users

Milestone 7: Advanced Playwright features

- Use traces
- Use screenshots
- Use videos
- Mock network responses
- Test failed or delayed APIs
- Generate reports

Milestone 8: Professional workflow

- Organize tests by feature
- Use Git branches
- Open GitHub pull requests
- Add test documentation
- Prepare for CI/CD later

## Portfolio Direction

This project should become useful both for learning and for demonstrating professional growth.

It should show:

- Manual QA experience translated into automation thinking
- API testing skills
- UI automation skills
- E2E testing skills
- Database validation awareness
- Authentication and permission testing awareness
- GitHub workflow familiarity
- AI-assisted automation learning using tools like Copilot and Codex

## Current Build Status

The first working version of NBA Automation Lab has been created.

Current implementation:

- Dependency-free HTML, CSS, and JavaScript website
- Local Node.js static server
- NBA-themed dashboard with teams, players, API playground, and automation challenges
- Beginner-friendly Playwright Basics section
- Visible manual action, page reaction, and Playwright check explanations
- Safe demo buttons that let the user try automation scenarios without fear
- Visible automation replay for the first UI dropdown scenario
- Replay shows manual QA steps, Playwright steps, code snippet, expected result, and PASS/FAIL status
- UI dropdown scenario includes a passing replay and an intentional failing replay with a visible reason
- Compact dark-theme layout with one active tab/view at a time
- Top navigation switches relevant content in place instead of scrolling through the page
- Starter Playwright test suite
- Tests for team filtering, player sorting, API-style response display, mobile layout overflow, beginner safe-demo feedback, visible automation replay, intentional failure explanation, and no-scroll tab switching
- Normal npm-based workflow for VS Code
- VS Code task recommendations for starting the app and running tests

Current local URL:

- http://localhost:4287

Current verified command:

- npm test

Next recommended step:

- Review the first visible automation replay and adjust wording or layout if needed
- After the first replay pattern is clear and approved, reuse it for API, forms, auth, and database scenarios

## Learning Style

Every feature should include a clear explanation.

Each scenario should explain:

- What the user sees on the website
- What QA risk or behavior is being tested
- What Playwright feature is being used
- Why that feature matters in real QA Automation work
- How this connects to manual QA, API testing, E2E testing, or system investigation

Each Playwright learning scenario must also include a visible automation view inside the website.

The visible automation view should show:

- Manual QA steps
- What changed on the page after the manual action
- The matching Playwright automation steps
- A short code snippet
- The expected result
- A visible pass/fail result
- A safe replay or simulation when possible

When useful for learning, scenarios should include both:

- A passing path that shows the correct expected result
- A failing path that explains expected result versus actual result in beginner-friendly QA language

The user should never need to open the test file first in order to understand what Playwright is doing. The test file can be shown later as the technical source of truth, but the website itself should make the automation process understandable first.

The UI should stay compact. Avoid large decorative visuals, oversized fonts, and tall cards that force unnecessary scrolling. Navigation should behave like app tabs: show the selected learning area and hide unrelated areas.

The explanations should build from my current QA experience instead of assuming I am starting from zero.

## Working Process

Before building the website, we will review and approve the planned Playwright capabilities.

After approval, we will build the website step by step.

Each step should be understandable, practical, and connected to the NBA Automation Lab theme.

This file should remain a living plan and can be updated as the project becomes clearer.
