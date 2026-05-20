import { test, expect } from "@playwright/test";

test("filters teams by Western Conference", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Teams" }).click();
  await page.getByTestId("conference-filter").selectOption("West");

  const teamCards = page.getByTestId("team-card");
  await expect(teamCards).toHaveCount(3);
  await expect(teamCards.first()).toContainText("West");
});

test("sorts players by points", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Players" }).click();
  await page.getByTestId("sort-points").click();

  await expect(page.getByTestId("player-row").first()).toContainText("Giannis Antetokounmpo");
});

test("shows API-style players response", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "API" }).click();
  await page.getByRole("button", { name: "GET /api/players" }).click();

  await expect(page.getByTestId("api-output")).toContainText("/api/players");
  await expect(page.getByTestId("api-output")).toContainText("Jayson Tatum");
});

test("keeps the main layout inside a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "NBA Automation Lab" })).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});

test("explains the safe demo reaction for beginners", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Challenges" }).click();
  await page.getByRole("button", { name: "Try this safely" }).first().click();

  await expect(page.getByTestId("learning-log")).toContainText("Safe demo: West was selected for you");
  await expect(page.getByTestId("team-card")).toHaveCount(3);
});

test("replays the conference dropdown automation with a visible pass result", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Teams" }).click();
  await page.getByTestId("run-conference-replay").click();

  await expect(page.getByTestId("replay-result")).toContainText("PASS");
  await expect(page.getByTestId("replay-result")).toContainText("3 team cards are visible");
  await expect(page.getByTestId("automation-steps")).toContainText("Assert that the result is correct");
});

test("unlocks a visible failed replay with a beginner-friendly reason", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Teams" }).click();
  await expect(page.getByTestId("run-conference-fail-replay")).toBeEnabled();

  await page.getByTestId("run-conference-fail-replay").click();

  await expect(page.getByTestId("replay-result")).toContainText("FAIL");
  await expect(page.getByTestId("failure-reason")).toContainText("selected East, but the assertion expected West");
  await expect(page.getByTestId("learning-log")).toContainText("expected result versus actual result");
});

test("shows a tooltip explanation for a Playwright code line", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Teams" }).click();
  await page.getByText('await page.goto("/");').hover();

  await expect(page.getByText("Opens the website. This is like the first manual QA step")).toBeVisible();
});

test("switches top tabs without scrolling down the page", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.getByRole("button", { name: "API" }).click();

  await expect(page.getByRole("heading", { name: "API Playground" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What is Playwright?" })).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
