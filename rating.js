import { getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDocs, query, orderBy, limit, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const app = getApp();               // firebase_auth.js pehle load hona chahiye
const auth = getAuth(app);
const db = getFirestore(app);

let selected = 0, currentUser = null;
const stars = document.querySelectorAll("#starInput span");
const msg = document.getElementById("reviewMsg");

function paint(n){ stars.forEach(s => s.classList.toggle("active", +s.dataset.v <= n)); }
stars.forEach(s => {
  s.addEventListener("click", () => { selected = +s.dataset.v; paint(selected); });
  s.addEventListener("mouseover", () => paint(+s.dataset.v));
  s.addEventListener("mouseout", () => paint(selected));
});

onAuthStateChanged(auth, u => { currentUser = u; });

document.getElementById("submitReview").addEventListener("click", async () => {
  if (!currentUser) { msg.textContent = "Review dene ke liye pehle login karo."; return; }
  if (!selected)   { msg.textContent = "Pehle star select karo."; return; }
  try {
    // uid ko doc id banaya: ek user ka ek hi review, dobara dene par update hoga
    await setDoc(doc(db, "reviews", currentUser.uid), {
      rating: selected,
      text: document.getElementById("reviewText").value.trim(),
      name: currentUser.displayName || currentUser.email.split("@")[0],
      createdAt: serverTimestamp()
    });
    msg.textContent = "Thank you! Review save ho gaya ✅";
    loadReviews();
  } catch (e) { msg.textContent = "Error: " + e.message; }
});

async function loadReviews(){
  const snap = await getDocs(query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(50)));
  const list = document.getElementById("reviewList");
  list.innerHTML = "";
  let total = 0, count = 0;
  snap.forEach(d => {
    const r = d.data(); total += r.rating; count++;
    const item = document.createElement("div"); item.className = "review-item";
    const top = document.createElement("div");
    const st = document.createElement("span"); st.className = "r-stars"; st.textContent = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
    const nm = document.createElement("b"); nm.textContent = " " + r.name;
    top.append(st, nm);
    const tx = document.createElement("p"); tx.textContent = r.text || "";
    item.append(top, tx); list.append(item);
  });
  document.getElementById("avgRating").textContent =
    count ? `⭐ ${(total / count).toFixed(1)} / 5  (${count} reviews)` : "Abhi koi review nahi, pehle aap bano!";
}
loadReviews();