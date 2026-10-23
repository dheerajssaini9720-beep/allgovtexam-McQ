/* =========================================================
   MCQ EXAM MANTRA — SCRIPT3.JS
   CTET + ARMY + AIR FORCE + NAVY + CAPF/CRPF + INDIAN POST
   + LTC + NABARD + OTHER STATE GOVERNMENT EXAMS
   Load question3.js BEFORE this file.
   (question3.js ke pehle examQuestions defined hona chahiye.)
========================================================= */

(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        // ==========================================
        // EXAM NAME -> DATA KEY
        // ==========================================

        const examNames = {
            "teaching / ctet": "ctet",
            "ctet": "ctet",
            "indian army": "indianArmy",
            "indian air force": "indianAirForce",
            "indian navy": "indianNavy",
            "capf": "crpf",
            "crpf": "crpf",
            "indian post": "indianPost",
            "ltc": "ltc",
            "nabard": "nabard",
            "other state government exams": "otherStateExams"
        };

        // ==========================================
        // SUBJECT DISPLAY NAMES
        // Original question keys are preserved.
        // ==========================================

        const subjectNames = {
            genralKnowledge: [
                "General Knowledge", "सामान्य ज्ञान", "🌍"
            ],
            generalKnowledge: [
                "General Knowledge", "सामान्य ज्ञान", "🌍"
            ],
            maths: [
                "Mathematics", "गणित", "➗"
            ],
            mathematics: [
                "Mathematics", "गणित", "➗"
            ],
            generalScience: [
                "General Science", "सामान्य विज्ञान", "🔬"
            ],
            genralReasoning: [
                "General Reasoning", "सामान्य तर्कशक्ति", "🧠"
            ],
            generalReasoning: [
                "General Reasoning", "सामान्य तर्कशक्ति", "🧠"
            ],
            quantiativeAptitude: [
                "Quantitative Aptitude", "मात्रात्मक योग्यता", "➗"
            ],
            quantitativeAptitude: [
                "Quantitative Aptitude", "मात्रात्मक योग्यता", "➗"
            ],
            englishLanguage: [
                "English Language", "अंग्रेज़ी भाषा", "📚"
            ],
            reasoningComputer: [
                "Reasoning & Computer Aptitude",
                "तर्कशक्ति एवं कंप्यूटर योग्यता", "💻"
            ],
            reasoningComputerApptitude: [
                "Reasoning & Computer Aptitude",
                "तर्कशक्ति एवं कंप्यूटर योग्यता", "💻"
            ],
            dataAnalysis: [
                "Data Analysis & Interpretation",
                "डेटा विश्लेषण एवं व्याख्या", "📊"
            ],
            dataAnalysisInterpretaion: [
                "Data Analysis & Interpretation",
                "डेटा विश्लेषण एवं व्याख्या", "📊"
            ],
            bankingAwareness: [
                "Banking Awareness", "बैंकिंग जागरूकता", "🏦"
            ],
            genralAwarenessEconomyBanking: [
                "General Awareness, Economy & Banking",
                "सामान्य जागरूकता, अर्थव्यवस्था एवं बैंकिंग", "🏦"
            ],
            childDevelopment: [
                "Child Development & Pedagogy",
                "बाल विकास एवं शिक्षाशास्त्र", "🧒"
            ],
            environmentalStudies: [
                "Environmental Studies",
                "पर्यावरण अध्ययन", "🌱"
            ],
            languageOne: [
                "Language I", "भाषा I", "📖"
            ],
            languageTwo: [
                "Language II", "भाषा II", "📕"
            ],
            generalHindi: [
                "General Hindi", "सामान्य हिंदी", "📝"
            ],
            genralHindi: [
                "General Hindi", "सामान्य हिंदी", "📝"
            ],
            mentalAptitudeReasoning: [
                "Mental Aptitude & Reasoning",
                "मानसिक योग्यता एवं तर्कशक्ति", "🧠"
            ],
            reasoning: [
                "Reasoning", "तर्कशक्ति", "🧠"
            ],
            generalAwareness: [
                "General Awareness", "सामान्य जागरूकता", "🌍"
            ],
            english: [
                "English", "अंग्रेज़ी", "📚"
            ],
            physics: [
                "Physics", "भौतिक विज्ञान", "⚛️"
            ],
            science: [
                "Science", "विज्ञान", "🔬"
            ],
            economicSocialIssues: [
                "Economic & Social Issues",
                "आर्थिक एवं सामाजिक मुद्दे", "📈"
            ],
            agricultureRuralDevelopment: [
                "Agriculture & Rural Development",
                "कृषि एवं ग्रामीण विकास", "🌾"
            ],
            discriptiveEnglisgLatterEassy: [
                "Descriptive English: Letter & Essay",
                "अंग्रेज़ी पत्र एवं निबंध", "✍️"
            ]
        };

        // ==========================================
        // QUESTIONS DATA
        // ==========================================

        function getAllExamData() {
            if (
                typeof examQuestions !== "undefined" &&
                examQuestions
            ) {
                return examQuestions;
            }

            if (window.examQuestions) {
                return window.examQuestions;
            }

            return {};
        }

        // ==========================================
        // CREATE QUESTION SECTION
        // ==========================================

        function getOrCreateQuestionSection() {
            let section =
                document.getElementById("bankQuestionSection");

            if (!section) {
                section = document.createElement("section");
                section.id = "bankQuestionSection";

                section.style.cssText = `
                    width:92%;
                    max-width:1100px;
                    margin:35px auto;
                    padding:22px;
                    background:linear-gradient(135deg,#e0f2fe 0%,#ede9fe 50%,#fce7f3 100%);
                    border-radius:18px;
                    box-shadow:0 8px 30px rgba(0,0,0,.08);
                    box-sizing:border-box;
                `;

                const examSection =
                    document.querySelector(".exam-section");

                if (examSection) {
                    examSection.after(section);
                } else {
                    document.body.appendChild(section);
                }
            }

            return section;
        }

        const section = getOrCreateQuestionSection();
        section.style.display = "none";

        let currentExamName = "";
        let currentData = null;
        let path = [];

        // ==========================================
        // SAFE TEXT
        // ==========================================

        function esc(value) {
            return String(value ?? "").replace(
                /[&<>"']/g,
                char => ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                }[char])
            );
        }

        function prettyName(key) {
            if (subjectNames[key]) {
                return subjectNames[key][0];
            }

            return String(key)
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/[_-]/g, " ")
                .replace(/^./, char => char.toUpperCase());
        }

        function hindiName(key) {
            return subjectNames[key]?.[1] ||
                "प्रश्न अभ्यास";
        }

        function iconName(key) {
            return subjectNames[key]?.[2] || "📘";
        }

        // ==========================================
        // IDENTIFY QUESTION ARRAYS
        // ==========================================

        function isQuestion(item) {
            return (
                item &&
                typeof item === "object" &&
                !Array.isArray(item) &&
                (
                    "questionHindi" in item ||
                    "questionEnglish" in item ||
                    "question" in item
                )
            );
        }

        function usableEntries(obj) {
            if (
                !obj ||
                typeof obj !== "object" ||
                Array.isArray(obj)
            ) {
                return [];
            }

            return Object.entries(obj).filter(
                ([, value]) => {
                    if (Array.isArray(value)) {
                        return true;
                    }

                    return (
                        value &&
                        typeof value === "object" &&
                        Object.keys(value).length > 0
                    );
                }
            );
        }

        // ==========================================
        // OPEN EXAM
        // ==========================================

        function startExam(examName, key) {
            const data = getAllExamData()[key];

            if (!data) {
                console.error(
                    "Exam data not found:",
                    examName,
                    key,
                    Object.keys(getAllExamData())
                );

                section.style.display = "block";

                section.innerHTML = `
                    <div style="text-align:center;padding:25px">
                        <h2>${esc(examName)}</h2>
                        <p>
                            Exam data nahi mila.
                            questions.js aur questions2.js ke
                            script paths check karo.
                        </p>
                        <button type="button" data-go-back>
                            Back to Exams
                        </button>
                    </div>
                `;

                section
                    .querySelector("[data-go-back]")
                    .addEventListener("click", goBackToExams);

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                return;
            }

            section.style.display = "block";
            currentExamName = examName;
            currentData = data;
            path = [];

            renderCurrent();

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        // ==========================================
        // RENDER CURRENT MENU OR QUESTIONS
        // Works with nested and direct subject keys.
        // ==========================================

        function renderCurrent() {
            let data = currentData;

            for (const key of path) {
                data = data?.[key];
            }

            if (Array.isArray(data)) {
                renderQuestions(
                    data,
                    path.length
                        ? path[path.length - 1]
                        : currentExamName
                );
                return;
            }

            if (data && typeof data === "object") {
                renderMenu(data);
                return;
            }

            section.innerHTML = `
                <div style="padding:25px;text-align:center">
                    <h3>Data not available</h3>
                    ${backButton()}
                </div>
            `;

            wireBackButtons();
        }

        // ==========================================
        // SHOW SUBJECT / PHASE MENU
        // ==========================================

        function renderMenu(data) {
            const entries = usableEntries(data);

            const title = path.length
                ? prettyName(path[path.length - 1])
                : currentExamName;

            let html = `
                <header style="text-align:center;margin-bottom:25px">
                    <h2 style="
                        margin:0 0 8px;
                        color:#172554;
                        font-size:clamp(22px,4vw,30px)
                    ">
                        ${esc(currentExamName)}
                    </h2>

                    <h3 style="
                        margin:0 0 8px;
                        color:#334155
                    ">
                        ${esc(title)}
                    </h3>

                    <p style="margin:0;color:#64748b">
                        Choose a category / विषय चुनें
                    </p>
                </header>
            `;

            if (entries.length === 0) {
                html += `
                    <div style="
                        padding:24px;
                        text-align:center;
                        background:#f8fafc;
                        border-radius:12px
                    ">
                        <h3>No categories found</h3>
                        <p>
                            Is section ke andar subjects
                            ya question arrays nahi mile.
                        </p>
                    </div>
                `;
            } else {
                html += `
                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(auto-fit,minmax(min(100%,220px),1fr));
                        gap:15px
                    ">
                `;

                html += entries.map(([key, value]) => {
                    const count = Array.isArray(value)
                        ? value.length
                        : usableEntries(value).length;

                    const countLabel = Array.isArray(value)
                        ? `${count} questions`
                        : `${count} categories`;

                    return `
                        <button
                            type="button"
                            data-menu-key="${esc(key)}"
                            style="
                                text-align:left;
                                padding:20px 18px;
                                border:1px solid #15803d;
                                border-radius:15px;
                                background:#16a34a;
                                color:#ffffff;
                                cursor:pointer;
                                min-height:130px
                            "
                        >
                            <span style="font-size:26px">
                                ${iconName(key)}
                            </span>

                            <strong style="
                                display:block;
                                font-size:17px;
                                margin:10px 0 6px
                            ">
                                ${esc(prettyName(key))}
                            </strong>

                            <span style="
                                display:block;
                                color:#dcfce7;
                                font-size:14px
                            ">
                                ${esc(hindiName(key))}
                            </span>

                            <span style="
                                display:block;
                                color:#fef08a;
                                font-size:13px;
                                margin-top:12px
                            ">
                                ${countLabel} →
                            </span>
                        </button>
                    `;
                }).join("");

                html += `</div>`;
            }

            html += backButton();
            section.innerHTML = html;

            section
                .querySelectorAll("[data-menu-key]")
                .forEach(button => {
                    button.addEventListener("click", () => {
                        path.push(button.dataset.menuKey);
                        renderCurrent();

                        section.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    });
                });

            wireBackButtons();
        }

        // ==========================================
        // SHOW QUESTIONS
        // ==========================================

        function renderQuestions(questions, key) {
            const title = prettyName(key);

            let html = `
                <header style="
                    text-align:center;
                    margin-bottom:24px
                ">
                    <h2 style="margin:0 0 8px;color:#172554">
                        ${esc(title)}
                    </h2>

                    <p style="color:#64748b">
                        ${esc(hindiName(key))}
                    </p>

                    <p style="color:#2563eb;font-weight:600">
                        Total Questions: ${questions.length}
                    </p>

                    ${backButton()}
                </header>
            `;

            if (questions.length === 0) {
                html += `
                    <div style="
                        padding:24px;
                        text-align:center;
                        background:#f8fafc;
                        border-radius:12px
                    ">
                        <h3>Questions will be added soon.</h3>
                        <p>
                            इस विषय के प्रश्न जल्द जोड़े जाएंगे।
                        </p>
                    </div>
                `;
            } else {
                html += questions
                    .map((question, index) =>
                        questionCard(question, index + 1)
                    )
                    .join("");
            }

            section.innerHTML = html;
            wireBackButtons();
        }

        // ==========================================
        // QUESTION CARD
        // ==========================================

        function questionCard(q, number) {
            const questionHindi =
                q.questionHindi || q.question || "";

            const questionEnglish =
                q.questionEnglish || "";

            const optionsHindi =
                Array.isArray(q.optionsHindi)
                    ? q.optionsHindi
                    : Array.isArray(q.options)
                        ? q.options
                        : [];

            const optionsEnglish =
                Array.isArray(q.optionsEnglish)
                    ? q.optionsEnglish
                    : [];

            let optionsHTML = "";
            const count = Math.max(
                optionsHindi.length,
                optionsEnglish.length
            );

            for (let i = 0; i < count; i++) {
                const hindi = optionsHindi[i] ?? "";
                const english = optionsEnglish[i] ?? "";

                optionsHTML += `
                    <li style="margin:8px 0;line-height:1.5">
                        ${hindi !== "" ? esc(hindi) : ""}
                        ${
                            hindi !== "" &&
                            english !== "" &&
                            hindi !== english
                                ? `<br><span style="color:#64748b">
                                    ${esc(english)}
                                   </span>`
                                : ""
                        }
                    </li>
                `;
            }

            // ---- ANSWER FIX ----
            // MCQ:       answer
            // Mains:     answerHindi + answerEnglish (+ marks)
            // Essay:     koi answer nahi -> box hide hoga
            const hasValue = v =>
                v !== undefined &&
                v !== null &&
                String(v).trim() !== "";

            const answerSingle =
                [q.answer, q.correctAnswer, q.ans, q.correct]
                    .find(hasValue);

            const answerHindi =
                [q.answerHindi, q.correctAnswerHindi]
                    .find(hasValue) || "";

            const answerEnglish =
                [q.answerEnglish, q.correctAnswerEnglish]
                    .find(hasValue) || "";

            const hasAnyAnswer =
                hasValue(answerSingle) ||
                hasValue(answerHindi) ||
                hasValue(answerEnglish);

            const marksHTML = hasValue(q.marks)
                ? `<p style="margin:0 0 8px;font-weight:600">
                        Marks: ${esc(q.marks)}
                   </p>`
                : "";

            let answerHTML = "";

            if (hasAnyAnswer) {
                answerHTML = `
                    <div style="
                        padding:13px;
                        background:#ecfdf5;
                        color:#166534;
                        border-radius:10px;
                        line-height:1.6;
                        white-space:pre-line
                    ">
                        ${marksHTML}
                        <strong>Correct Answer:</strong>
                        ${
                            hasValue(answerSingle)
                                ? esc(answerSingle)
                                : ""
                        }
                        ${
                            hasValue(answerHindi)
                                ? `<p style="margin:6px 0">${esc(answerHindi)}</p>`
                                : ""
                        }
                        ${
                            hasValue(answerEnglish)
                                ? `<p style="margin:6px 0">${esc(answerEnglish)}</p>`
                                : ""
                        }
                    </div>
                `;
            }
            // ---- END ANSWER FIX ----

            const explanationHindi =
                q.explanationHindi || q.explanation || "";

            const explanationEnglish =
                q.explanationEnglish || "";

            return `
                <article style="
                    margin:18px 0;
                    padding:20px;
                    border:1px solid #e2e8f0;
                    border-radius:15px;
                    box-shadow:0 3px 12px rgba(15,23,42,.04)
                ">
                    <h3 style="
                        font-size:16px;
                        color:#1d4ed8;
                        margin:0 0 14px
                    ">
                        Question ${number}
                    </h3>

                    <p style="
                        font-size:17px;
                        font-weight:600;
                        line-height:1.7;
                        color:#172033;
                        margin:0 0 8px
                    ">
                        ${esc(questionHindi)}
                    </p>

                    ${
                        questionEnglish
                            ? `<p style="
                                font-size:15px;
                                line-height:1.6;
                                color:#475569;
                                margin:0 0 14px
                            ">${esc(questionEnglish)}</p>`
                            : ""
                    }

                    ${
                        optionsHTML
                            ? `<ol style="
                                padding-left:24px;
                                margin:12px 0 18px
                            ">${optionsHTML}</ol>`
                            : ""
                    }

                    ${answerHTML}

                    ${
                        explanationHindi || explanationEnglish
                            ? `<div style="
                                margin-top:10px;
                                padding:13px;
                                background:#fffbeb;
                                color:#854d0e;
                                border-radius:10px;
                                line-height:1.6
                            ">
                                <strong>Explanation:</strong>
                                <p style="margin:6px 0">
                                    ${esc(explanationHindi)}
                                </p>
                                ${
                                    explanationEnglish
                                        ? `<p style="margin:6px 0">
                                            ${esc(explanationEnglish)}
                                           </p>`
                                        : ""
                                }
                            </div>`
                            : ""
                    }
                </article>
            `;
        }

        // ==========================================
        // BACK BUTTONS
        // ==========================================

        function backButton() {
            return `
                <div style="text-align:center;margin:24px 0">
                    <button
                        type="button"
                        data-menu-back
                        style="
                            padding:11px 18px;
                            border:0;
                            border-radius:9px;
                            background:blue;
                            color:white;
                            font-weight:600;
                            cursor:pointer
                        "
                    >
                        ← Back
                    </button>
                </div>
            `;
        }

        function wireBackButtons() {
            section
                .querySelectorAll("[data-menu-back]")
                .forEach(button => {
                    button.addEventListener("click", () => {
                        if (path.length > 0) {
                            path.pop();
                            renderCurrent();

                            section.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        } else {
                            goBackToExams();
                        }
                    });
                });
        }

        function goBackToExams() {
            section.innerHTML = "";
            section.style.display = "none";
            path = [];
            currentData = null;

            const examSection =
                document.querySelector(".exam-section");

            if (examSection) {
                examSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }

        // ==========================================
        // DETECT EXAM CARD
        // ==========================================

        function matchExam(card) {
            const heading = card.querySelector(
                "h1,h2,h3,h4,h5,h6,.exam-card-title,[data-exam-name]"
            );

            const raw = (
                card.getAttribute("data-exam") ||
                card.getAttribute("data-exam-name") ||
                (heading && heading.textContent) ||
                card.textContent ||
                ""
            )
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            const titles = {
                ctet: "Teaching / CTET",
                indianArmy: "Indian Army",
                indianAirForce: "Indian Air Force",
                indianNavy: "Indian Navy",
                crpf: "CAPF / CRPF",
                indianPost: "Indian Post",
                ltc: "LTC",
                nabard: "NABARD",
                otherStateExams: "Other State Government Exams"
            };

            for (const [label, key] of Object.entries(examNames)) {
                if (raw === label || raw.includes(label)) {
                    return [titles[key] || label, key];
                }
            }

            return null;
        }

        // ==========================================
        // EXAM CARD CLICK EVENT
        // ==========================================

        document.addEventListener(
            "click",
            event => {
                const card = event.target.closest(
                    ".exam-card, [data-exam], [data-exam-name]"
                );

                if (!card) return;

                const matched = matchExam(card);

                if (!matched) return;

                // data hi nahi hai to click ko rokna nahi
                if (!getAllExamData()[matched[1]]) return;

                event.preventDefault();
                event.stopPropagation();

                if (event.stopImmediatePropagation) {
                    event.stopImmediatePropagation();
                }

                startExam(matched[0], matched[1]);
            },
            true
        );

        // ==========================================
        // MANUAL TESTING FUNCTION
        // Browser console mein:
        // openExamQuestions("CTET")
        // openExamQuestions("Indian Army")
        // openExamQuestions("NABARD")
        // openExamQuestions("Indian Post")
        // ==========================================

        window.openExamQuestions = function (examNameOrKey) {
            const name = String(examNameOrKey)
                .trim()
                .toLowerCase();

            const key =
                examNames[name] ||
                (
                    getAllExamData()[examNameOrKey]
                        ? examNameOrKey
                        : null
                );

            if (!key) {
                console.error(
                    "Unknown exam name/key:",
                    examNameOrKey
                );
                return;
            }

            const displayName = {
                ctet: "Teaching / CTET",
                indianArmy: "Indian Army",
                indianAirForce: "Indian Air Force",
                indianNavy: "Indian Navy",
                crpf: "CAPF / CRPF",
                indianPost: "Indian Post",
                ltc: "LTC",
                nabard: "NABARD",
                otherStateExams: "Other State Government Exams"
            }[key] || examNameOrKey;

            startExam(displayName, key);
        };
    });
})();