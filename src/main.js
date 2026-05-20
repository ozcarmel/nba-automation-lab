const teams = [
  { name: "Boston Celtics", conference: "East", wins: 64, focus: "Standings assertions" },
  { name: "New York Knicks", conference: "East", wins: 50, focus: "Search and filtering" },
  { name: "Milwaukee Bucks", conference: "East", wins: 49, focus: "Data validation" },
  { name: "Denver Nuggets", conference: "West", wins: 57, focus: "E2E journeys" },
  { name: "Minnesota Timberwolves", conference: "West", wins: 56, focus: "Sorting checks" },
  { name: "Oklahoma City Thunder", conference: "West", wins: 57, focus: "API comparisons" }
];

const players = [
  { name: "Jayson Tatum", team: "Boston Celtics", position: "Forward", points: 26.9, assists: 4.9 },
  { name: "Shai Gilgeous-Alexander", team: "Oklahoma City Thunder", position: "Guard", points: 30.1, assists: 6.2 },
  { name: "Nikola Jokic", team: "Denver Nuggets", position: "Center", points: 26.4, assists: 9.0 },
  { name: "Anthony Edwards", team: "Minnesota Timberwolves", position: "Guard", points: 25.9, assists: 5.1 },
  { name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", position: "Forward", points: 30.4, assists: 6.5 },
  { name: "Jalen Brunson", team: "New York Knicks", position: "Guard", points: 28.7, assists: 6.7 }
];

const apiResponses = {
  teams,
  players,
  standings: teams
    .slice()
    .sort((first, second) => second.wins - first.wins)
    .map((team, index) => ({
      rank: index + 1,
      team: team.name,
      conference: team.conference,
      wins: team.wins
    }))
};

let sortPlayersByPoints = false;

const teamList = document.querySelector("#team-list");
const teamSearch = document.querySelector("#team-search");
const conferenceFilter = document.querySelector("#conference-filter");
const playerTable = document.querySelector("#player-table");
const positionFilter = document.querySelector("#position-filter");
const sortPointsButton = document.querySelector("#sort-points");
const apiOutput = document.querySelector("#api-output");
const endpointButtons = document.querySelectorAll(".endpoint");
const demoButtons = document.querySelectorAll(".demo-button");
const navTabs = document.querySelectorAll(".nav-tab");
const appViews = document.querySelectorAll(".app-view");
const learningMessage = document.querySelector("#learning-message");
const runConferenceReplayButton = document.querySelector("#run-conference-replay");
const runConferenceFailReplayButton = document.querySelector("#run-conference-fail-replay");
const resetConferenceReplayButton = document.querySelector("#reset-conference-replay");
const replayCode = document.querySelector("#replay-code");
const codeTooltip = document.querySelector("#code-tooltip");
const replayStatus = document.querySelector("#replay-status");
const replaySummary = document.querySelector("#replay-summary");
const failureReason = document.querySelector("#failure-reason");
const automationSteps = document.querySelectorAll("#automation-steps li");

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const validViews = ["basics", "teams", "players", "api", "challenges"];

const passReplayCode = [
  {
    text: 'await page.goto("/");',
    tip: "Opens the website. This is like the first manual QA step: go to the page before testing anything."
  },
  {
    text: 'await page.getByTestId("conference-filter").selectOption("West");',
    tip: "Finds the Conference dropdown by its stable test id and selects West, just like a user would."
  },
  {
    text: "",
    tip: ""
  },
  {
    text: 'const teamCards = page.getByTestId("team-card");',
    tip: "Creates a locator for all team cards. A locator is Playwright's way to remember which elements it should inspect."
  },
  {
    text: "await expect(teamCards).toHaveCount(3);",
    tip: "Checks the expected result: after selecting West, exactly 3 team cards should be visible."
  },
  {
    text: 'await expect(teamCards.first()).toContainText("West");',
    tip: "Checks content, not only count. The first visible card should belong to the West conference."
  }
];

const failReplayCode = [
  passReplayCode[0],
  {
    text: 'await page.getByTestId("conference-filter").selectOption("East");',
    tip: "This intentionally selects East. The test will fail because the assertion below still expects West."
  },
  passReplayCode[2],
  passReplayCode[3],
  passReplayCode[4],
  passReplayCode[5]
];

function updateLearningLog(message) {
  learningMessage.textContent = message;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function colorCodeLine(line) {
  return escapeHtml(line)
    .replaceAll("await", '<span class="code-keyword">await</span>')
    .replaceAll("const", '<span class="code-keyword">const</span>')
    .replaceAll("page", '<span class="code-object">page</span>')
    .replaceAll("expect", '<span class="code-object">expect</span>')
    .replace(/(&quot;[^&]+&quot;)/g, '<span class="code-string">$1</span>')
    .replace(/\\b(3)\\b/g, '<span class="code-number">$1</span>');
}

function renderReplayCode(lines) {
  replayCode.innerHTML = lines
    .map((line, index) => {
      if (!line.text) {
        return '<span class="code-line blank" aria-hidden="true"></span>';
      }

      return `<span class="code-line" data-tooltip="${escapeHtml(line.tip)}"><span class="line-number">${index + 1}</span>${colorCodeLine(line.text)}</span>`;
    })
    .join("");
}

function showCodeTooltip(target) {
  const tooltip = target.dataset.tooltip;
  if (!tooltip) {
    return;
  }

  const rect = target.getBoundingClientRect();
  codeTooltip.textContent = tooltip;
  codeTooltip.hidden = false;
  codeTooltip.style.left = `${Math.min(rect.left + 22, window.innerWidth - 460)}px`;
  codeTooltip.style.top = `${rect.bottom + 8 + window.scrollY}px`;
}

function hideCodeTooltip() {
  codeTooltip.hidden = true;
}

function activateView(viewName, updateHash = true) {
  const nextView = validViews.includes(viewName) ? viewName : "basics";

  appViews.forEach((view) => {
    const isActive = view.id === nextView;
    view.hidden = !isActive;
    view.classList.toggle("active", isActive);
  });

  navTabs.forEach((tab) => {
    const isActive = tab.dataset.view === nextView;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  if (updateHash) {
    history.replaceState(null, "", `#${nextView}`);
  }
}

function renderTeams() {
  const searchValue = teamSearch.value.trim().toLowerCase();
  const conferenceValue = conferenceFilter.value;
  const filteredTeams = teams.filter((team) => {
    const matchesConference = conferenceValue === "all" || team.conference === conferenceValue;
    const matchesSearch = team.name.toLowerCase().includes(searchValue);
    return matchesConference && matchesSearch;
  });

  teamList.innerHTML = filteredTeams
    .map(
      (team) => `
        <article class="team-card" data-testid="team-card" data-conference="${team.conference}">
          <div>
            <span>${team.conference}</span>
            <h3>${team.name}</h3>
          </div>
          <p>${team.focus}</p>
          <strong>${team.wins} wins</strong>
        </article>
      `
    )
    .join("");
}

function setReplayStatus(status, text) {
  replayStatus.className = `result-badge ${status}`;
  replayStatus.textContent = text;
}

function resetReplaySteps() {
  automationSteps.forEach((step) => {
    step.classList.remove("active", "done");
  });
  conferenceFilter.classList.remove("automation-focus");
  teamList.classList.remove("automation-focus");
}

function markReplayStep(stepName, state) {
  const step = document.querySelector(`[data-step="${stepName}"]`);
  if (!step) {
    return;
  }
  step.classList.remove("active");
  step.classList.add(state);
}

async function runConferenceReplay() {
  runConferenceReplayButton.disabled = true;
  runConferenceFailReplayButton.disabled = true;
  resetReplaySteps();
  renderReplayCode(passReplayCode);
  failureReason.textContent = "";
  setReplayStatus("running", "Running");
  replaySummary.textContent = "Playwright is starting the same flow you tried manually.";
  updateLearningLog(
    "Automation replay started: watch the highlighted steps to connect manual QA actions to Playwright commands."
  );

  markReplayStep("open", "active");
  await wait(350);
  markReplayStep("open", "done");

  markReplayStep("find", "active");
  conferenceFilter.classList.add("automation-focus");
  replaySummary.textContent = 'Playwright locates the dropdown with data-testid="conference-filter".';
  await wait(450);
  markReplayStep("find", "done");

  markReplayStep("select", "active");
  conferenceFilter.value = "West";
  renderTeams();
  replaySummary.textContent = 'Playwright selects "West", just like you did manually.';
  await wait(450);
  markReplayStep("select", "done");
  conferenceFilter.classList.remove("automation-focus");

  markReplayStep("count", "active");
  teamList.classList.add("automation-focus");
  const visibleWestTeams = document.querySelectorAll('[data-testid="team-card"]').length;
  replaySummary.textContent = `Playwright counts the visible team cards. Current count: ${visibleWestTeams}.`;
  await wait(450);
  markReplayStep("count", "done");

  markReplayStep("assert", "active");
  const firstVisibleTeamConference = document.querySelector('[data-testid="team-card"]')?.dataset.conference;
  const passed = visibleWestTeams === 3 && firstVisibleTeamConference === "West";
  await wait(350);
  markReplayStep("assert", "done");

  if (passed) {
    setReplayStatus("pass", "PASS");
    replaySummary.textContent =
      "Result: PASS. Playwright verified that 3 team cards are visible and the first visible card belongs to the West.";
    updateLearningLog(
      "Automation replay passed: Playwright selected West, counted 3 cards, and confirmed the visible result matched the expected result."
    );
    runConferenceFailReplayButton.disabled = false;
  } else {
    setReplayStatus("fail", "FAIL");
    replaySummary.textContent =
      "Result: FAIL. The visible teams did not match the expected result. This is when a QA engineer investigates the difference.";
    updateLearningLog(
      "Automation replay failed: the actual result did not match the expected result, so this would need investigation."
    );
  }

  teamList.classList.remove("automation-focus");
  runConferenceReplayButton.disabled = false;
}

async function runConferenceFailReplay() {
  runConferenceReplayButton.disabled = true;
  runConferenceFailReplayButton.disabled = true;
  resetReplaySteps();
  renderReplayCode(failReplayCode);
  failureReason.textContent = "";
  setReplayStatus("running", "Running");
  replaySummary.textContent =
    "Playwright is running a negative example: the test selects East but still expects a West result.";
  updateLearningLog(
    "Fail replay started: this is intentional. The goal is to learn how a failed assertion explains the difference between expected and actual results."
  );

  markReplayStep("open", "active");
  await wait(350);
  markReplayStep("open", "done");

  markReplayStep("find", "active");
  conferenceFilter.classList.add("automation-focus");
  replaySummary.textContent = 'Playwright locates the same dropdown with data-testid="conference-filter".';
  await wait(450);
  markReplayStep("find", "done");

  markReplayStep("select", "active");
  conferenceFilter.value = "East";
  renderTeams();
  replaySummary.textContent = 'Playwright selects "East", but the assertion still expects "West".';
  await wait(450);
  markReplayStep("select", "done");
  conferenceFilter.classList.remove("automation-focus");

  markReplayStep("count", "active");
  teamList.classList.add("automation-focus");
  const visibleTeams = document.querySelectorAll('[data-testid="team-card"]').length;
  replaySummary.textContent = `Playwright counts ${visibleTeams} visible team cards. The count is OK, but content still matters.`;
  await wait(450);
  markReplayStep("count", "done");

  markReplayStep("assert", "active");
  const firstVisibleTeamConference = document.querySelector('[data-testid="team-card"]')?.dataset.conference;
  const passed = visibleTeams === 3 && firstVisibleTeamConference === "West";
  await wait(350);
  markReplayStep("assert", "done");

  if (passed) {
    setReplayStatus("pass", "PASS");
    replaySummary.textContent = "Unexpected pass. The page matched the assertion.";
  } else {
    setReplayStatus("fail", "FAIL");
    replaySummary.textContent =
      "Result: FAIL. Playwright found 3 teams, but the first visible team is East while the test expected West.";
    failureReason.textContent =
      "Reason: the action selected East, but the assertion expected West. In real QA work, this is the moment to ask whether the test data, test step, or product behavior is wrong.";
    updateLearningLog(
      "Automation replay failed on purpose: selected East, expected West. This demonstrates expected result versus actual result."
    );
  }

  teamList.classList.remove("automation-focus");
  runConferenceReplayButton.disabled = false;
  runConferenceFailReplayButton.disabled = false;
}

function resetConferenceReplay() {
  conferenceFilter.value = "all";
  teamSearch.value = "";
  renderTeams();
  resetReplaySteps();
  renderReplayCode(passReplayCode);
  failureReason.textContent = "";
  setReplayStatus("idle", "Not run yet");
  runConferenceReplayButton.disabled = false;
  runConferenceFailReplayButton.disabled = true;
  replaySummary.textContent =
    "Expected result for the PASS test: 3 visible Western Conference teams. Run the PASS test first, then run the FAIL test to see how Playwright reports a mismatch.";
  updateLearningLog(
    "Scenario reset: the Teams section is back to all conferences. You can try manually or replay the automation again."
  );
}

function renderPlayers() {
  const positionValue = positionFilter.value;
  const filteredPlayers = players
    .filter((player) => positionValue === "all" || player.position === positionValue)
    .sort((first, second) => (sortPlayersByPoints ? second.points - first.points : first.name.localeCompare(second.name)));

  playerTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>Position</th>
          <th>PTS</th>
          <th>AST</th>
        </tr>
      </thead>
      <tbody>
        ${filteredPlayers
          .map(
            (player) => `
              <tr data-testid="player-row">
                <td>${player.name}</td>
                <td>${player.team}</td>
                <td>${player.position}</td>
                <td>${player.points}</td>
                <td>${player.assists}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderApiOutput(endpointName) {
  apiOutput.textContent = JSON.stringify(
    {
      status: 200,
      endpoint: `/api/${endpointName}`,
      data: apiResponses[endpointName]
    },
    null,
    2
  );
}

teamSearch.addEventListener("input", renderTeams);
teamSearch.addEventListener("input", () => {
  updateLearningLog(
    `Manual action: you searched for "${teamSearch.value}". Page reaction: the Teams list updates. Playwright check: verify the expected team cards are visible.`
  );
});
conferenceFilter.addEventListener("change", () => {
  renderTeams();
  resetReplaySteps();
  setReplayStatus("idle", "Manual change");
  updateLearningLog(
    `Manual action: you selected "${conferenceFilter.value}" in the conference dropdown. Page reaction: the team cards changed. Playwright check: count the visible teams and verify their conference.`
  );
});
positionFilter.addEventListener("change", () => {
  renderPlayers();
  updateLearningLog(
    `Manual action: you selected "${positionFilter.value}" in the position dropdown. Page reaction: the player table changed. Playwright check: verify every visible row matches the selected position.`
  );
});
sortPointsButton.addEventListener("click", () => {
  sortPlayersByPoints = !sortPlayersByPoints;
  sortPointsButton.classList.toggle("active", sortPlayersByPoints);
  renderPlayers();
  updateLearningLog(
    "Manual action: you clicked Sort by points. Page reaction: the table order changed. Playwright check: verify the top scorer appears in the first row."
  );
});

endpointButtons.forEach((button) => {
  button.addEventListener("click", () => {
    endpointButtons.forEach((currentButton) => currentButton.classList.remove("active"));
    button.classList.add("active");
    renderApiOutput(button.dataset.endpoint);
    updateLearningLog(
      `Manual action: you opened ${button.textContent}. Page reaction: the JSON response changed. Playwright check: verify the endpoint name and expected NBA data appear.`
    );
  });
});

demoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const demoName = button.dataset.demo;

    if (demoName === "west-filter") {
      activateView("teams");
      conferenceFilter.value = "West";
      renderTeams();
      updateLearningLog(
        "Safe demo: West was selected for you. Reaction: 3 Western Conference team cards are visible. Playwright checks the same result with a locator and an assertion."
      );
    }

    if (demoName === "points-sort") {
      activateView("players");
      sortPlayersByPoints = true;
      sortPointsButton.classList.add("active");
      renderPlayers();
      updateLearningLog(
        "Safe demo: players were sorted by points. Reaction: Giannis appears first. Playwright checks the first table row text."
      );
    }

    if (demoName === "players-api") {
      activateView("api");
      endpointButtons.forEach((currentButton) => currentButton.classList.remove("active"));
      document.querySelector('[data-endpoint="players"]').classList.add("active");
      renderApiOutput("players");
      updateLearningLog(
        "Safe demo: the players API response opened. Reaction: JSON-style player data is displayed. Playwright checks that /api/players and player names appear."
      );
    }
  });
});

runConferenceReplayButton.addEventListener("click", runConferenceReplay);
runConferenceFailReplayButton.addEventListener("click", runConferenceFailReplay);
resetConferenceReplayButton.addEventListener("click", resetConferenceReplay);
replayCode.addEventListener("mouseover", (event) => {
  const codeLine = event.target.closest(".code-line");
  if (codeLine) {
    showCodeTooltip(codeLine);
  }
});
replayCode.addEventListener("mouseout", hideCodeTooltip);
replayCode.addEventListener("focusin", (event) => {
  const codeLine = event.target.closest(".code-line");
  if (codeLine) {
    showCodeTooltip(codeLine);
  }
});
replayCode.addEventListener("focusout", hideCodeTooltip);
navTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateView(tab.dataset.view);
    window.scrollTo({ top: 0, behavior: "auto" });
  });
});

renderTeams();
renderPlayers();
renderApiOutput("teams");
renderReplayCode(passReplayCode);
activateView(window.location.hash.replace("#", ""), false);
window.scrollTo({ top: 0, behavior: "auto" });
requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
