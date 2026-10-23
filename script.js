// ============================================================
// MCQ EXAM MANTRA - COMPLETE SCRIPT.JS
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // EXAM NAME -> QUESTIONS.JS KEY
    // ============================================================

    const examKeyMap = {

        "UP Police": "upPolice",

        "SSC CGL / CHSL / MTS": "ssccgl",
        "SSC CGL": "ssccgl",

        "SSC CHSL": "sscChsl",
        "SSC MTS": "sscMts",

        "UPSC": "upsc",

        "Delhi Police": "delhiPolice",

        "Railway (RRB)": "railway",

        "IBPS PO": "ibpsPo",
        "SBI PO": "sbiPo",
        "RBI": "rbi",
        "UPPSC": "uppsc",

        "Teaching / CTET": "ctet",

        "Indian Army": "indianArmy",
        "Indian Air Force": "indianAirForce",
        "Indian Navy": "indianNavy",

        "CAPF": "capf",
        "Indian Post": "indianPost",
        "LTC": "ltc",
        "NABARD": "nabard",

        "Other State Government Exams": "otherStateExams"
    };


    // ============================================================
    // GET QUESTIONS DATA
    // ============================================================

    function getQuestionsData(key) {

        if (
            typeof examQuestions !== "undefined" &&
            examQuestions &&
            examQuestions[key]
        ) {
            return examQuestions[key];
        }

        if (
            window.examQuestions &&
            window.examQuestions[key]
        ) {
            return window.examQuestions[key];
        }

        return null;
    }


    // ============================================================
    // CATEGORY NAMES
    // ============================================================

    const categoryNames = {

        generalKnowledge:
            "General Knowledge",

        generalHindi:
            "General Hindi",

        numericalMentalAbility:
            "Numerical & Mental Ability",

        mentalAptitudeReasoning:
            "Mental Aptitude & Reasoning",

        maths:
            "Maths",

        History:
            "History",

        polity:
            "Indian Polity",

        geography:
            "Geography",

        economy:
            "Indian Economy",

        environment:
            "Environment",

        scienceTechnology:
            "Science & Technology",

        currentAffairs:
            "Current Affairs",

        socialDevelopment:
            "Social Development",

        mains:
            "Mains / Essay",

        gs1culture:
            "GS-1 Art & Culture",

        history:
            "GS-1 History",

        indianSociety:
            "GS-1 Indian Society",

        indianpolitygs2:
            "GS-2 Indian Polity",

        "Category 2: Agriculture & Food Security":
            "GS-3 Agriculture & Food Security",

        "Category 3: Science, Technology & Innovation":
            "GS-3 Science, Technology & Innovation",

        "Category 2: Emotional Intelligence and Attitude":
            "GS-4 Emotional Intelligence & Attitude",

        "Category 3: Probity, Integrity and Accountability":
            "GS-4 Probity & Integrity",

        "Category 4: Ethical Governance, Case Studies and Applied Ethics":
            "GS-4 Ethical Governance & Case Studies",

        hindiQualifyingPaper:
            "Hindi Qualifying Paper",

        englishQualifyingPaper:
            "English Qualifying Paper",

        sociologyOptionalPaper1:
            "Sociology Optional Paper 1",

        sociologyOptionalPaper2:
            "Sociology Optional Paper 2"
    };


    // ============================================================
    // FIXED CATEGORIES
    // ============================================================

    const fixedCategories = {

        upPolice: [

            ["generalKnowledge", "General Knowledge"],

            ["generalHindi", "General Hindi"],

            [
                "numericalMentalAbility",
                "Numerical & Mental Ability"
            ],

            [
                "mentalAptitudeReasoning",
                "Mental Aptitude & Reasoning"
            ]
        ],


        delhiPolice: [

            ["generalKnowledge", "General Knowledge"],

            ["generalHindi", "General Hindi"],

            ["maths", "Maths"],

            [
                "mentalAptitudeReasoning",
                "Mental Aptitude & Reasoning"
            ]
        ],


        ssccgl: [

            ["generalKnowledge", "General Knowledge"],

            ["generalHindi", "General Hindi"],

            ["maths", "Maths"],

            [
                "mentalAptitudeReasoning",
                "Mental Aptitude & Reasoning"
            ]
        ]
    };


    // ============================================================
    // UPSC PRELIMS
    // ============================================================

    const upscPrelims = [

        ["History", "History"],

        ["polity", "Indian Polity"],

        ["geography", "Geography"],

        ["economy", "Indian Economy"],

        ["environment", "Environment"],

        [
            "scienceTechnology",
            "Science & Technology"
        ],

        [
            "currentAffairs",
            "Current Affairs"
        ],

        [
            "socialDevelopment",
            "Social Development"
        ]
    ];


    // ============================================================
    // UPSC MAINS
    // ============================================================

    const upscMains = [

        ["mains", "Mains / Essay"],

        ["gs1culture", "GS-1 Art & Culture"],

        ["history", "GS-1 History"],

        [
            "indianSociety",
            "GS-1 Indian Society"
        ],

        [
            "indianpolitygs2",
            "GS-2 Indian Polity"
        ],

        [
            "Category 2: Agriculture & Food Security",
            "GS-3 Agriculture & Food Security"
        ],

        [
            "Category 3: Science, Technology & Innovation",
            "GS-3 Science, Technology & Innovation"
        ],

        [
            "Category 2: Emotional Intelligence and Attitude",
            "GS-4 Emotional Intelligence & Attitude"
        ],

        [
            "Category 3: Probity, Integrity and Accountability",
            "GS-4 Probity & Integrity"
        ],

        [
            "Category 4: Ethical Governance, Case Studies and Applied Ethics",
            "GS-4 Ethical Governance & Case Studies"
        ],

        [
            "hindiQualifyingPaper",
            "Hindi Qualifying Paper"
        ],

        [
            "englishQualifyingPaper",
            "English Qualifying Paper"
        ],

        [
            "sociologyOptionalPaper1",
            "Sociology Optional Paper 1"
        ],

        [
            "sociologyOptionalPaper2",
            "Sociology Optional Paper 2"
        ]
    ];


    // ============================================================
    // QUESTION SECTION
    // ============================================================

    function getQuestionSection() {

        let section =
            document.getElementById("questionSection");


        if (!section) {

            section =
                document.createElement("section");

            section.id = "questionSection";


            section.style.cssText = `
                width:92%;
                max-width:1100px;
                margin:40px auto;
                padding:25px;
                background:#ffffff;
                border-radius:20px;
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


    // ============================================================
    // NORMALIZE QUESTIONS
    // ============================================================

    function normalizeQuestions(data, key) {

        if (!Array.isArray(data)) {
            return [];
        }


        if (
            data.length === 1 &&
            data[0] &&
            typeof data[0] === "object" &&
            Array.isArray(data[0][key])
        ) {

            return data[0][key];

        }


        return data;
    }


    // ============================================================
    // QUESTION TEXT
    // ============================================================

    function getQuestionText(question) {

        if (
            question.questionHindi &&
            question.questionEnglish
        ) {

            return `

                <div style="
                    margin-bottom:10px;
                ">

                    <strong>
                        Hindi:
                    </strong>

                    ${question.questionHindi}

                </div>


                <div>

                    <strong>
                        English:
                    </strong>

                    ${question.questionEnglish}

                </div>

            `;
        }


        if (question.question) {

            return question.question;

        }


        return "Question not available.";
    }


    // ============================================================
    // OPTIONS
    // ============================================================

    function getOptions(question) {

        if (
            Array.isArray(question.optionsHindi) &&
            Array.isArray(question.optionsEnglish)
        ) {

            return question.optionsHindi
                .map(function (hindi, index) {

                    const english =
                        question.optionsEnglish[index] || "";

                    const letter =
                        String.fromCharCode(65 + index);


                    return `

                        <div style="
                            padding:13px;
                            margin:9px 0;
                            background:#f4f8ff;
                            border:1px solid #dbe7ff;
                            border-radius:10px;
                            line-height:1.5;
                        ">

                            <strong>
                                ${letter}.
                            </strong>

                            ${hindi}

                            <br>

                            <span style="
                                color:#555;
                            ">
                                ${english}
                            </span>

                        </div>

                    `;

                })
                .join("");

        }


        if (Array.isArray(question.options)) {

            return question.options
                .map(function (option, index) {

                    const letter =
                        String.fromCharCode(65 + index);


                    return `

                        <div style="
                            padding:13px;
                            margin:9px 0;
                            background:#f4f8ff;
                            border:1px solid #dbe7ff;
                            border-radius:10px;
                        ">

                            <strong>
                                ${letter}.
                            </strong>

                            ${option}

                        </div>

                    `;

                })
                .join("");

        }


        return "<p>Options not available.</p>";
    }


    // ============================================================
    // ANSWER
    // ============================================================

    function getAnswer(question) {

        if (
            question.answerHindi ||
            question.answerEnglish
        ) {

            return `

                ${
                    question.answerHindi
                        ? `
                            <div>
                                <strong>
                                    Hindi:
                                </strong>

                                ${question.answerHindi}
                            </div>
                        `
                        : ""
                }


                ${
                    question.answerEnglish
                        ? `
                            <div>
                                <strong>
                                    English:
                                </strong>

                                ${question.answerEnglish}
                            </div>
                        `
                        : ""
                }

            `;

        }


        return question.answer ||
            "Answer not available.";
    }


    // ============================================================
    // EXPLANATION
    // ============================================================

    function getExplanation(question) {

        if (
            question.explanationHindi ||
            question.explanationEnglish
        ) {

            return `

                ${
                    question.explanationHindi
                        ? `
                            <p>
                                <strong>
                                    Hindi:
                                </strong>

                                ${question.explanationHindi}
                            </p>
                        `
                        : ""
                }


                ${
                    question.explanationEnglish
                        ? `
                            <p>
                                <strong>
                                    English:
                                </strong>

                                ${question.explanationEnglish}
                            </p>
                        `
                        : ""
                }

            `;

        }


        return question.explanation || "";
    }


    // ============================================================
    // QUESTION CARD
    // ============================================================

    function createQuestionCard(
        question,
        number
    ) {

        return `

            <div style="
                margin:20px 0;
                padding:22px;
                background:#fff;
                border:1px solid #e1e8f5;
                border-radius:16px;
                box-shadow:0 4px 15px rgba(0,0,0,.05);
            ">


                <div style="
                    font-size:16px;
                    font-weight:700;
                    margin-bottom:18px;
                    color:#172554;
                ">

                    Question ${number}

                </div>


                <div style="
                    font-size:17px;
                    line-height:1.7;
                    margin-bottom:18px;
                    color:#222;
                ">

                    ${getQuestionText(question)}

                </div>


                <div>

                    ${getOptions(question)}

                </div>


                <div style="
                    margin-top:18px;
                    padding:15px;
                    background:#eefbf2;
                    border-radius:10px;
                    color:#166534;
                    line-height:1.6;
                ">

                    <strong>
                        Correct Answer:
                    </strong>

                    <br>

                    ${getAnswer(question)}

                </div>


                ${
                    getExplanation(question)
                        ? `

                            <div style="
                                margin-top:12px;
                                padding:15px;
                                background:#fff8e8;
                                border-radius:10px;
                                color:#713f12;
                                line-height:1.6;
                            ">

                                <strong>
                                    Explanation:
                                </strong>

                                ${getExplanation(question)}

                            </div>

                        `
                        : ""
                }

            </div>

        `;
    }


    // ============================================================
    // BUTTON
    // ============================================================

    function createButton(
        text,
        callback
    ) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.textContent = text;


        button.style.cssText = `
            padding:12px 20px;
            margin:6px;
            border:none;
            border-radius:10px;
            background:#1d4ed8;
            color:white;
            font-size:15px;
            font-weight:600;
            cursor:pointer;
        `;


        button.addEventListener(
            "click",
            callback
        );


        return button;
    }


    // ============================================================
    // SHOW CATEGORY PAGE
    // ============================================================

    function showCategories(
        examName,
        examKey,
        categories
    ) {

        const section =
            getQuestionSection();


        section.innerHTML = "";


        section.innerHTML = `

            <div style="
                text-align:center;
                margin-bottom:25px;
            ">

                <h2 style="
                    margin:0 0 8px;
                    color:#172554;
                ">
                    ${examName}
                </h2>


                <p style="
                    margin:0;
                    color:#64748b;
                ">
                    Select a category
                </p>

            </div>

        `;


        const grid =
            document.createElement("div");


        grid.style.cssText = `
            display:grid;
            grid-template-columns:
                repeat(auto-fit,minmax(220px,1fr));
            gap:15px;
        `;


        categories.forEach(
            function (category) {

                const key =
                    category[0];

                const name =
                    category[1];


                const data =
                    getQuestionsData(examKey);


                let questions = [];


                if (
                    data &&
                    typeof data === "object" &&
                    !Array.isArray(data) &&
                    Array.isArray(data[key])
                ) {

                    questions =
                        normalizeQuestions(
                            data[key],
                            key
                        );

                }


                const button =
                    document.createElement("button");


                button.type = "button";


                button.style.cssText = `
                    padding:20px 15px;
                    border:1px solid #dbe7ff;
                    border-radius:14px;
                    background:#f4f8ff;
                    color:#172554;
                    font-size:17px;
                    font-weight:700;
                    cursor:pointer;
                    min-height:85px;
                `;


                button.innerHTML = `

                    <div>
                        ${name}
                    </div>


                    <small style="
                        display:block;
                        margin-top:7px;
                        color:#64748b;
                        font-weight:500;
                    ">
                        ${questions.length}
                        Questions
                    </small>

                `;


                button.addEventListener(
                    "click",
                    function () {

                        showQuestions(
                            examName,
                            name,
                            questions,
                            function () {

                                showCategories(
                                    examName,
                                    examKey,
                                    categories
                                );

                            }
                        );

                    }
                );


                grid.appendChild(button);

            }
        );


        section.appendChild(grid);


        const bottom =
            document.createElement("div");


        bottom.style.cssText = `
            text-align:center;
            margin-top:25px;
        `;


        bottom.appendChild(

            createButton(
                "← Back to Exams",
                function () {

                    section.innerHTML = "";


                    const examSection =
                        document.querySelector(
                            ".exam-section"
                        );


                    if (examSection) {

                        examSection.scrollIntoView({
                            behavior:"smooth"
                        });

                    }

                }
            )

        );


        section.appendChild(bottom);


        section.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });
    }


    // ============================================================
    // SHOW QUESTIONS
    // ============================================================

    function showQuestions(
        examName,
        categoryName,
        questions,
        backFunction
    ) {

        const section =
            getQuestionSection();


        section.innerHTML = "";


        if (!questions.length) {

            section.innerHTML = `

                <div style="
                    text-align:center;
                    padding:35px 15px;
                ">

                    <h2 style="
                        color:#172554;
                    ">
                        ${examName}
                    </h2>


                    <h3 style="
                        color:#1d4ed8;
                    ">
                        ${categoryName}
                    </h3>


                    <p style="
                        color:#64748b;
                    ">
                        No questions are available
                        in this category yet.
                    </p>

                </div>

            `;


            section.appendChild(

                createButton(
                    "← Back",
                    backFunction
                )

            );


            section.scrollIntoView({
                behavior:"smooth"
            });


            return;
        }


        const header =
            document.createElement("div");


        header.style.cssText = `
            text-align:center;
            margin-bottom:25px;
        `;


        header.innerHTML = `

            <h2 style="
                margin:0 0 8px;
                color:#172554;
            ">
                ${examName}
            </h2>


            <h3 style="
                margin:0 0 8px;
                color:#1d4ed8;
            ">
                ${categoryName}
            </h3>


            <p style="
                margin:0;
                color:#64748b;
            ">
                ${questions.length}
                Questions
            </p>

        `;


        section.appendChild(header);


        questions.forEach(
            function (question, index) {

                section.insertAdjacentHTML(
                    "beforeend",
                    createQuestionCard(
                        question,
                        index + 1
                    )
                );

            }
        );


        const bottom =
            document.createElement("div");


        bottom.style.cssText = `
            text-align:center;
            margin-top:25px;
        `;


        bottom.appendChild(

            createButton(
                "← Back to Categories",
                backFunction
            )

        );


        section.appendChild(bottom);


        section.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });
    }


    // ============================================================
    // UPSC PHASE SCREEN
    // ============================================================

    function showUpscPhases() {

        const section =
            getQuestionSection();


        section.innerHTML = "";


        section.innerHTML = `

            <div style="
                text-align:center;
                margin-bottom:25px;
            ">

                <h2 style="
                    color:#172554;
                    margin-bottom:8px;
                ">
                    UPSC
                </h2>


                <p style="
                    color:#64748b;
                    margin:0;
                ">
                    Select your exam phase
                </p>

            </div>

        `;


        const grid =
            document.createElement("div");


        grid.style.cssText = `
            display:grid;
            grid-template-columns:
                repeat(auto-fit,minmax(220px,1fr));
            gap:15px;
        `;


        // ========================================================
        // PRELIMS
        // ========================================================

        const prelimsButton =
            document.createElement("button");


        prelimsButton.type =
            "button";


        prelimsButton.style.cssText = `
            padding:25px;
            border:1px solid #dbe7ff;
            border-radius:14px;
            background:#f4f8ff;
            color:#172554;
            font-size:18px;
            font-weight:700;
            cursor:pointer;
            min-height:100px;
        `;


        prelimsButton.innerHTML = `

            <div>
                UPSC Prelims
            </div>

            <small style="
                display:block;
                margin-top:8px;
                color:#64748b;
                font-weight:500;
            ">
                General Studies
            </small>

        `;


        prelimsButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                showCategories(
                    "UPSC Prelims",
                    "upsc",
                    upscPrelims
                );

            }
        );


        // ========================================================
        // MAINS
        // ========================================================

        const mainsButton =
            document.createElement("button");


        mainsButton.type =
            "button";


        mainsButton.style.cssText = `
            padding:25px;
            border:1px solid #dbe7ff;
            border-radius:14px;
            background:#f4f8ff;
            color:#172554;
            font-size:18px;
            font-weight:700;
            cursor:pointer;
            min-height:100px;
        `;


        mainsButton.innerHTML = `

            <div>
                UPSC Mains
            </div>

            <small style="
                display:block;
                margin-top:8px;
                color:#64748b;
                font-weight:500;
            ">
                Essay, GS & Other Papers
            </small>

        `;


        mainsButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                showCategories(
                    "UPSC Mains",
                    "upsc",
                    upscMains
                );

            }
        );


        grid.appendChild(
            prelimsButton
        );


        grid.appendChild(
            mainsButton
        );


        section.appendChild(grid);


        // ========================================================
        // BACK BUTTON
        // ========================================================

        const bottom =
            document.createElement("div");


        bottom.style.cssText = `
            text-align:center;
            margin-top:25px;
        `;


        bottom.appendChild(

            createButton(
                "← Back to Exams",
                function () {

                    section.innerHTML = "";


                    const examSection =
                        document.querySelector(
                            ".exam-section"
                        );


                    if (examSection) {

                        examSection.scrollIntoView({
                            behavior:"smooth"
                        });

                    }

                }
            )

        );


        section.appendChild(bottom);


        section.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }


    // ============================================================
    // OPEN EXAM
    // ============================================================

    function openExamQuestions(examName) {

        // --------------------------------------------------------
        // CLEAN NAME
        // --------------------------------------------------------

        examName =
            examName
                .replace(/\s+/g, " ")
                .trim();


        // --------------------------------------------------------
        // UPSC
        // IMPORTANT:
        // UPSC IS HANDLED BEFORE QUESTIONS DATA CHECK
        // --------------------------------------------------------

        if (
            examName === "UPSC" ||
            examName.toUpperCase().includes("UPSC")
        ) {

            showUpscPhases();

            return;
        }


        // --------------------------------------------------------
        // GET EXAM KEY
        // --------------------------------------------------------

        const examKey =
            examKeyMap[examName];


        if (!examKey) {

            console.error(
                "Exam key not found:",
                examName
            );

            return;
        }


        // --------------------------------------------------------
        // GET DATA
        // --------------------------------------------------------

        const data =
            getQuestionsData(examKey);


        if (!data) {

            const section =
                getQuestionSection();


            section.innerHTML = `

                <div style="
                    text-align:center;
                    padding:35px;
                ">

                    <h2>
                        ${examName}
                    </h2>


                    <p>
                        Questions will be added soon.
                    </p>

                </div>

            `;


            section.scrollIntoView({
                behavior:"smooth"
            });


            return;
        }


        // --------------------------------------------------------
        // FIXED CATEGORY EXAMS
        // --------------------------------------------------------

        if (fixedCategories[examKey]) {

            showCategories(
                examName,
                examKey,
                fixedCategories[examKey]
            );

            return;
        }


        // --------------------------------------------------------
        // OTHER EXAMS
        // --------------------------------------------------------

        if (
            typeof data === "object" &&
            !Array.isArray(data)
        ) {

            const categories =
                Object.keys(data)
                    .filter(function (key) {

                        return Array.isArray(
                            data[key]
                        );

                    })
                    .map(function (key) {

                        return [
                            key,
                            categoryNames[key] || key
                        ];

                    });


            if (categories.length) {

                showCategories(
                    examName,
                    examKey,
                    categories
                );

                return;
            }
        }


        // --------------------------------------------------------
        // DIRECT QUESTION ARRAY
        // --------------------------------------------------------

        if (Array.isArray(data)) {

            showQuestions(
                examName,
                "Practice Questions",
                data,
                function () {}
            );

        }

    }


    // ============================================================
    // MAKE FUNCTION AVAILABLE TO HTML
    // ============================================================

    window.openExamQuestions =
        openExamQuestions;


    // ============================================================
    // EXAM CARD CLICK
    // ============================================================

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".exam-card button"
                );


            if (!button) {
                return;
            }


            const card =
                button.closest(
                    ".exam-card"
                );


            if (!card) {
                return;
            }


            const heading =
                card.querySelector(
                    "h1,h2,h3,h4"
                );


            if (!heading) {
                return;
            }


            const examName =
                heading.textContent
                    .replace(/\s+/g, " ")
                    .trim();


            // ----------------------------------------------------
            // UPSC
            // ----------------------------------------------------

            if (
                examName === "UPSC" ||
                examName.toUpperCase().includes("UPSC")
            ) {

                event.preventDefault();
                event.stopPropagation();


                openExamQuestions(
                    "UPSC"
                );


                return;
            }


            // ----------------------------------------------------
            // OTHER EXAMS
            // ----------------------------------------------------

            if (examKeyMap[examName]) {

                event.preventDefault();


                openExamQuestions(
                    examName
                );

            }

        }
    );


    // ============================================================
    // NOTIFICATION
    // ============================================================

    const notificationButton =
        document.querySelector(
            ".notification-btn"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                alert(
                    "No new notifications right now."
                );

            }
        );
    }


    // LOGIN / REGISTER ab firebase_auth.js handle karta hai


    // ============================================================
    // SMOOTH SCROLL
    // ============================================================

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const id =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !id ||
                            id === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                id
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:"smooth"
                        });

                    }
                );

            }
        );


    // ============================================================
    // PAGE LOADED
    // ============================================================

    console.log(
        "MCQ Exam Mantra loaded successfully."
    );


    console.log(
        "UP Police -> Category -> Questions"
    );


    console.log(
        "SSC CGL -> Category -> Questions"
    );


    console.log(
        "UPSC -> Prelims/Mains -> Subject -> Questions"
    );

});