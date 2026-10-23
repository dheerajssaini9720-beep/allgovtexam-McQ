(() => {
  "use strict";

  const TEST_MINUTES = 25;
  let timer = null;
  let timeLeft = TEST_MINUTES * 60;
  let questions = [];
  let lastResult = null;
  let currentExam = "";
  let currentPath = [];

  const $ = (selector, root = document) => root.querySelector(selector);

  function getQuestionsData() {
    if (typeof examQuestions !== "undefined") {
      return examQuestions;
    }
    return window.examQuestions || {};
  }

  function safe(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function isQuestion(item) {
    return item && typeof item === "object" &&
      !Array.isArray(item) &&
      ("questionHindi" in item ||
       "questionEnglish" in item ||
       "question" in item);
  }

  function getPanel() {
    let panel = document.getElementById("script4Panel");

    if (!panel) {
      panel = document.createElement("section");
      panel.id = "script4Panel";

      const practice = document.getElementById("practice");
      const exams = document.getElementById("exams");

      if (practice && practice.parentNode) {
        practice.parentNode.insertBefore(panel, exams || practice.nextSibling);
      } else {
        document.body.appendChild(panel);
      }
    }

    Object.assign(panel.style, {
      display: "block",
      width: "92%",
      maxWidth: "1000px",
      margin: "25px auto",
      padding: "20px",
      borderRadius: "14px",
      background: "#f8fafc",
      color: "#172033",
      border: "1px solid #dbeafe",
      boxSizing: "border-box"
    });

    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    return panel;
  }

  function addStyles() {
    if (document.getElementById("script4Styles")) return;

    const style = document.createElement("style");
    style.id = "script4Styles";

    style.textContent = `
      #script4Panel button {
        padding: 11px 16px;
        margin: 6px 5px 6px 0;
        border: 0;
        border-radius: 8px;
        background: #2563eb;
        color: white;
        cursor: pointer;
        font-size: 15px;
      }

      #script4Panel .s4-option {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 11px;
        margin: 8px 0;
        border: 1px solid #dbe3ed;
        border-radius: 8px;
        background: white;
        cursor: pointer;
      }

      #script4Panel .s4-question {
        padding: 15px;
        margin: 15px 0;
        border: 1px solid #dbe3ed;
        border-radius: 12px;
        background: white;
      }

      #script4Panel .s4-select {
        width: 100%;
        max-width: 600px;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        background: white;
      }

      #s4Clock {
        position: sticky;
        top: 5px;
        display: inline-block;
        padding: 10px 16px;
        border-radius: 8px;
        background: #fee2e2;
        color: #b91c1c;
        font-size: 23px;
        font-weight: bold;
        z-index: 5;
      }

      #script4Panel .s4-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      #script4Panel .s4-stat {
        padding: 15px;
        background: white;
        border: 1px solid #dbe3ed;
        border-radius: 10px;
      }
    `;

    document.head.appendChild(style);
  }

  function getCurrentNode() {
    let node = getQuestionsData()[currentExam];

    for (const key of currentPath) {
      node = node?.[key];
    }

    return node;
  }

  function openSetup() {
    clearInterval(timer);
    timer = null;
    currentPath = [];
    currentExam = "";

    const panel = getPanel();
    const data = getQuestionsData();

    const exams = Object.keys(data).filter(key =>
      data[key] && typeof data[key] === "object"
    );

    if (!exams.length) {
      panel.innerHTML = `
        <h2>Test Your Speed</h2>
        <p>Exam data nahi mila. Check karo ki questions.js,
        questions2.js aur questions33.js sahi load ho rahe hain.</p>
      `;
      return;
    }

    panel.innerHTML = `
      <h2>⏱️ Test Your Speed</h2>
      <p>Exam select karo, phir subject/category select karo.</p>

      <label for="s4Exam"><b>Select Exam</b></label><br>

      <select id="s4Exam" class="s4-select">
        <option value="">-- Choose Exam --</option>
        ${exams.map(key => `
          <option value="${safe(key)}">${safe(key)}</option>
        `).join("")}
      </select>

      <div id="s4Categories"></div>
      <button type="button" id="s4Close">Close</button>
    `;

    $("#s4Exam", panel).addEventListener("change", event => {
      currentExam = event.target.value;
      currentPath = [];
      renderCategories();
    });

    $("#s4Close", panel).addEventListener("click", () => {
      panel.style.display = "none";
    });
  }

  function renderCategories() {
    const panel = getPanel();
    const area = $("#s4Categories", panel);

    if (!currentExam) {
      area.innerHTML = "";
      return;
    }

    const node = getCurrentNode();

    if (Array.isArray(node)) {
      area.innerHTML = `
        <p><b>Questions available: ${node.length}</b></p>
        <button type="button" id="s4Start">Start Test</button>
      `;

      $("#s4Start", area).addEventListener("click", () => {
        startTest(node);
      });

      return;
    }

    if (!node || typeof node !== "object") {
      area.innerHTML = "<p>Is category mein data nahi mila.</p>";
      return;
    }

    const categories = Object.entries(node).filter(([, value]) =>
      value && typeof value === "object"
    );

    if (!categories.length) {
      area.innerHTML = "<p>Is exam ke liye categories nahi mili.</p>";
      return;
    }

    area.innerHTML = `
      <label for="s4Category"><b>Select Subject / Category</b></label><br>

      <select id="s4Category" class="s4-select">
        <option value="">-- Choose Category --</option>
        ${categories.map(([key, value]) => `
          <option value="${safe(key)}">
            ${safe(key)}${Array.isArray(value) ? ` (${value.length})` : ""}
          </option>
        `).join("")}
      </select>

      ${currentPath.length
        ? '<button type="button" id="s4Back">Back</button>'
        : ""}
    `;

    $("#s4Category", area).addEventListener("change", event => {
      if (!event.target.value) return;

      currentPath.push(event.target.value);
      renderCategories();
    });

    if (currentPath.length) {
      $("#s4Back", area).addEventListener("click", () => {
        currentPath.pop();
        renderCategories();
      });
    }
  }

  function getOptions(question) {
    const hindi = Array.isArray(question.optionsHindi)
      ? question.optionsHindi
      : Array.isArray(question.options)
        ? question.options
        : [];

    const english = Array.isArray(question.optionsEnglish)
      ? question.optionsEnglish
      : [];

    return Array.from(
      { length: Math.max(hindi.length, english.length) },
      (_, index) => ({
        hindi: hindi[index] ?? "",
        english: english[index] ?? ""
      })
    ).filter(option => option.hindi !== "" || option.english !== "");
  }

  function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function startTest(data) {
    const usable = data.filter(question =>
      isQuestion(question) && getOptions(question).length > 0
    );

    if (!usable.length) {
      alert("Is category mein valid MCQ questions nahi mile.");
      return;
    }

    questions = shuffle(usable).slice(0, 50);
    timeLeft = TEST_MINUTES * 60;

    const panel = getPanel();

    panel.innerHTML = `
      <h2>Online Test</h2>
      <p>Total Questions: ${questions.length}</p>
      <p>Time Remaining:</p>
      <div id="s4Clock">25:00</div>

      <form id="s4Form">
        ${questions.map((question, index) => {
          const options = getOptions(question);

          return `
            <div class="s4-question">
              <h3>Question ${index + 1}</h3>

              <p><b>${safe(
                question.questionHindi || question.question || ""
              )}</b></p>

              ${question.questionEnglish
                ? `<p>${safe(question.questionEnglish)}</p>`
                : ""}

              ${options.map((option, optionIndex) => `
                <label class="s4-option">
                  <input
                    type="radio"
                    name="question${index}"
                    value="${optionIndex}"
                  >

                  <span>
                    ${safe(option.hindi || option.english)}
                    ${option.hindi && option.english
                      ? `<br>${safe(option.english)}`
                      : ""}
                  </span>
                </label>
              `).join("")}
            </div>
          `;
        }).join("")}

        <button type="submit">Submit Test</button>
      </form>
    `;

    $("#s4Form", panel).addEventListener("submit", event => {
      event.preventDefault();
      submitTest(false);
    });

    updateClock();

    clearInterval(timer);

    timer = setInterval(() => {
      timeLeft--;
      updateClock();

      if (timeLeft <= 0) {
        submitTest(true);
      }
    }, 1000);
  }

  function updateClock() {
    const clock = $("#s4Clock");
    if (!clock) return;

    const minutes = Math.floor(Math.max(0, timeLeft) / 60);
    const seconds = Math.max(0, timeLeft) % 60;

    clock.textContent =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  }

  function findCorrectAnswer(question, options) {
    const answer = question.answer ??
      question.correctAnswer ??
      question.ans ??
      question.correct;

    if (answer === undefined || answer === null) return -1;

    const text = String(answer).trim();

    const letter = text.match(/^([A-D])[\s).:-]*$/i);

    if (letter) {
      const index = letter[1].toUpperCase().charCodeAt(0) - 65;
      return index < options.length ? index : -1;
    }

    const normalize = value => String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    return options.findIndex(option =>
      normalize(option.hindi) === normalize(text) ||
      normalize(option.english) === normalize(text)
    );
  }

  function submitTest(timeUp) {
    if (!timer && !timeUp) return;

    clearInterval(timer);
    timer = null;

    const form = $("#s4Form");
    if (!form) return;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    const review = questions.map((question, index) => {
      const options = getOptions(question);
      const selected = form.querySelector(
        `input[name="question${index}"]:checked`
      );

      const chosen = selected ? Number(selected.value) : -1;
      const answerIndex = findCorrectAnswer(question, options);

      if (chosen === -1) {
        unanswered++;
      } else if (answerIndex >= 0 && chosen === answerIndex) {
        correct++;
      } else {
        wrong++;
      }

      return {
        question,
        options,
        chosen,
        answerIndex,
        number: index + 1
      };
    });

    lastResult = {
      total: questions.length,
      correct,
      wrong,
      unanswered,
      title: currentExam,
      date: new Date().toLocaleString()
    };

    const panel = getPanel();

    panel.innerHTML = `
      <h2>📊 ${timeUp ? "Time Up!" : "Test Completed!"}</h2>

      <div class="s4-stats">
        <div class="s4-stat">Total: <b>${questions.length}</b></div>
        <div class="s4-stat">Correct: <b>${correct}</b></div>
        <div class="s4-stat">Wrong: <b>${wrong}</b></div>
        <div class="s4-stat">Unanswered: <b>${unanswered}</b></div>
        <div class="s4-stat">Score: <b>${correct}/${questions.length}</b></div>
      </div>

      <p>Answer review:</p>

      ${review.map(item => `
        <div class="s4-question">
          <h4>Question ${item.number}</h4>
          <p>${safe(
            item.question.questionHindi ||
            item.question.question ||
            item.question.questionEnglish ||
            ""
          )}</p>

          <p>Your answer:
            <b>${
              item.chosen < 0
                ? "Not answered"
                : safe(
                    item.options[item.chosen].hindi ||
                    item.options[item.chosen].english
                  )
            }</b>
          </p>

          <p>Correct answer:
            <b>${
              item.answerIndex < 0
                ? "Answer key not matched"
                : safe(
                    item.options[item.answerIndex].hindi ||
                    item.options[item.answerIndex].english
                  )
            }</b>
          </p>

          ${item.question.explanationHindi
            ? `<p>${safe(item.question.explanationHindi)}</p>`
            : ""}
        </div>
      `).join("")}

      <button type="button" id="s4Again">Take Another Test</button>
      <button type="button" id="s4Home">Back to Exams</button>
    `;

    $("#s4Again", panel).addEventListener("click", openSetup);

    $("#s4Home", panel).addEventListener("click", () => {
      panel.style.display = "none";
      $("#exams")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function showResult() {
    const panel = getPanel();

    if (!lastResult) {
      panel.innerHTML = `
        <h2>Check Your Result</h2>
        <p>Bhai, pehle ek test complete karo. Uske baad result yahan dikhega.</p>
        <button type="button" id="s4StartNow">Start Test</button>
      `;

      $("#s4StartNow", panel).addEventListener("click", openSetup);
      return;
    }

    panel.innerHTML = `
      <h2>Last Test Result</h2>
      <p>Exam: ${safe(lastResult.title)}</p>
      <p>Total: ${lastResult.total}</p>
      <p>Correct: ${lastResult.correct}</p>
      <p>Wrong: ${lastResult.wrong}</p>
      <p>Unanswered: ${lastResult.unanswered}</p>
      <p>Completed: ${safe(lastResult.date)}</p>
      <button type="button" id="s4StartAgain">Start Another Test</button>
    `;

    $("#s4StartAgain", panel).addEventListener("click", openSetup);
  }

  function connectCards() {
    document.querySelectorAll(".info-card").forEach(card => {
      const heading = card.querySelector("h3")?.textContent
        ?.toLowerCase() || "";

      if (card.dataset.script4Connected) return;
      card.dataset.script4Connected = "true";
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        if (heading.includes("test your speed")) {
          openSetup();
        } else if (heading.includes("check your result")) {
          showResult();
        } else if (heading.includes("practice mcq")) {
          $("#exams")?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function init() {
    addStyles();
    connectCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();