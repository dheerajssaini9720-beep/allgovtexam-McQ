/* =====================================================
   EXAM MANTRA MCQ - FIREBASE LOGIN SYSTEM
   (Email + Password: Login, Create Account, Logout, Forgot Password)
   ===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* ============ STEP 1: APNI FIREBASE CONFIG YAHAN PASTE KARO ============
   Firebase Console -> Project settings -> Your apps -> Web app -> Config
   (neeche wali 6 values apni wali se badal do) */

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtTLsA0p-n_hDxiseC23bYAIPo7y9corc",
  authDomain: "exam-mantra-mcq.firebaseapp.com",
  projectId: "exam-mantra-mcq",
  storageBucket: "exam-mantra-mcq.firebasestorage.app",
  messagingSenderId: "626731166343",
  appId: "1:626731166343:web:e80e61242bda887dc96622",
  measurementId: "G-W675F3NJS7"
};

/* ====================================================================== */


const configMissing = firebaseConfig.apiKey.startsWith("PASTE");

let auth = null;
if (!configMissing) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
}


console.log("firebase-auth.js loaded", configMissing ? "(config NOT pasted)" : "(config ok)");


/* ---------- Page elements ---------- */

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginMsg = document.getElementById("login-message");
const registerMsg = document.getElementById("register-message");
const forgotLink = document.getElementById("forgot-password");
const headerLoginBtn = document.getElementById("header-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginSection = document.getElementById("login");
const mobileLoginLink = document.querySelector('.mobile-navigation a[href="#login"]');


/* ---------- Helpers ---------- */

function showMessage(box, text, type) {
    if (!box) return;
    box.textContent = text;
    box.className = "form-message show " + (type || "error");
}

function clearMessage(box) {
    if (!box) return;
    box.textContent = "";
    box.className = "form-message";
}

function setLoading(button, isLoading, loadingText) {
    if (!button) return;
    if (isLoading) {
        button.dataset.originalText = button.textContent;
        button.textContent = loadingText;
        button.disabled = true;
    } else {
        button.textContent = button.dataset.originalText || button.textContent;
        button.disabled = false;
    }
}

function friendlyError(error) {
    switch (error && error.code) {
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/missing-password":
            return "Please enter your password.";
        case "auth/wrong-password":
            return "Wrong password ❌ Please enter the correct Gmail and password.";
        case "auth/user-not-found":
            return "No account found with this email. Please create an account first.";
        case "auth/invalid-credential":
            return "Wrong Gmail or password ❌ Please enter the correct Gmail and password. (Forgot password? click below)";
        case "auth/email-already-in-use":
            return "This email is already registered. Please login.";
        case "auth/weak-password":
            return "Password is too weak. Use at least 6 characters.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait a few minutes and try again.";
        case "auth/network-request-failed":
            return "Network problem. Check your internet and try again.";
        case "auth/operation-not-allowed":
            return "Email/Password login is not enabled in Firebase yet.";
        case "auth/unauthorized-domain":
            return "This website domain is not added in Firebase Authorized domains.";
        default:
            return "Something went wrong. Please try again.";
    }
}

function configProblem(box) {
    showMessage(
        box,
        "Firebase is not set up yet. Open firebase-auth.js and paste your Firebase config.",
        "error"
    );
}


/* ---------- Show / hide password (eye button) ---------- */

document.querySelectorAll('.login-box input[type="password"], .register-box input[type="password"]')
    .forEach(function (input) {
        const wrap = document.createElement("div");
        wrap.className = "password-wrap";
        input.parentNode.insertBefore(wrap, input);
        wrap.appendChild(input);

        const eye = document.createElement("button");
        eye.type = "button";
        eye.className = "toggle-eye";
        eye.setAttribute("aria-label", "Show or hide password");
        eye.textContent = "👁️";
        wrap.appendChild(eye);

        eye.addEventListener("click", function () {
            input.type = input.type === "password" ? "text" : "password";
            eye.textContent = input.type === "password" ? "👁️" : "🙈";
        });
    });


/* ---------- LOGIN ---------- */

if (loginForm) {
    document.addEventListener("submit", async function (e) {
        if (e.target !== loginForm) return;
        e.preventDefault();
        e.stopImmediatePropagation(); /* purani script.js ka code yahan rok do */
        clearMessage(loginMsg);

        if (!auth) return configProblem(loginMsg);

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        const button = loginForm.querySelector(".login-submit-button");

        if (!email || !password) {
            return showMessage(loginMsg, "Please enter email and password.", "error");
        }

        setLoading(button, true, "Logging in...");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            loginForm.reset();
            showMessage(loginMsg, "Login successful! ✅", "success");
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            showMessage(loginMsg, friendlyError(error), "error");
        }
        setLoading(button, false);
    }, true);
}


/* ---------- CREATE ACCOUNT ---------- */

if (registerForm) {
    document.addEventListener("submit", async function (e) {
        if (e.target !== registerForm) return;
        e.preventDefault();
        e.stopImmediatePropagation(); /* purani script.js ka code yahan rok do */
        clearMessage(registerMsg);

        if (!auth) return configProblem(registerMsg);

        const name = document.getElementById("full-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;
        const confirm = document.getElementById("confirm-password").value;
        const button = registerForm.querySelector(".register-button");

        if (!name || !email || !password || !confirm) {
            return showMessage(registerMsg, "Please fill all the fields.", "error");
        }
        if (password.length < 6) {
            return showMessage(registerMsg, "Password must be at least 6 characters.", "error");
        }
        if (password !== confirm) {
            return showMessage(registerMsg, "Passwords do not match.", "error");
        }

        setLoading(button, true, "Creating account...");
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });
            updateUI(auth.currentUser);
            registerForm.reset();
            showMessage(registerMsg, "Account created! Welcome " + name + " 🎉", "success");
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            showMessage(registerMsg, friendlyError(error), "error");
        }
        setLoading(button, false);
    }, true);
}


/* ---------- FORGOT PASSWORD ---------- */

if (forgotLink) {
    forgotLink.addEventListener("click", async function (e) {
        e.preventDefault();
        clearMessage(loginMsg);

        if (!auth) return configProblem(loginMsg);

        const email = document.getElementById("login-email").value.trim();
        if (!email) {
            return showMessage(loginMsg, "First type your email above, then click Forgot password.", "error");
        }

        try {
            await sendPasswordResetEmail(auth, email);
            showMessage(loginMsg, "Password reset link sent. Check your email (and spam folder).", "success");
        } catch (error) {
            showMessage(loginMsg, friendlyError(error), "error");
        }
    });
}


/* ---------- LOGOUT ---------- */

async function doLogout() {
    if (!auth) return;
    try {
        await signOut(auth);
    } catch (error) {
        alert("Logout failed. Please try again.");
    }
}

if (logoutBtn) logoutBtn.addEventListener("click", doLogout);


/* ---------- PAGE UPDATE (logged in / logged out) ---------- */

function updateUI(user) {
    const loggedIn = !!user;

    if (headerLoginBtn) {
        if (loggedIn) {
            const name = user.displayName || (user.email ? user.email.split("@")[0] : "Student");
            headerLoginBtn.textContent = "👤 " + name;
            headerLoginBtn.removeAttribute("href");
            headerLoginBtn.classList.add("logged-in");
        } else {
            headerLoginBtn.textContent = "👤 Login";
            headerLoginBtn.setAttribute("href", "#login");
            headerLoginBtn.classList.remove("logged-in");
        }
    }

    if (logoutBtn) logoutBtn.hidden = !loggedIn;
    if (loginSection) loginSection.classList.toggle("hidden-login", loggedIn);

    if (mobileLoginLink) {
        const label = mobileLoginLink.querySelector("small");
        if (loggedIn) {
            if (label) label.textContent = "Logout";
            mobileLoginLink.setAttribute("href", "#");
            mobileLoginLink.dataset.logout = "1";
        } else {
            if (label) label.textContent = "Login";
            mobileLoginLink.setAttribute("href", "#login");
            delete mobileLoginLink.dataset.logout;
        }
    }

    /* baaki scripts ke liye: window.currentUser se pata chalega kaun login hai */
    window.currentUser = user || null;
    document.dispatchEvent(new CustomEvent("authchange", { detail: user || null }));
}

if (mobileLoginLink) {
    mobileLoginLink.addEventListener("click", function (e) {
        if (mobileLoginLink.dataset.logout === "1") {
            e.preventDefault();
            doLogout();
        }
    });
}

if (auth) {
    onAuthStateChanged(auth, updateUI);
} else {
    updateUI(null);
}