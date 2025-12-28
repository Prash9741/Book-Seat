
/* =======================
   DATE LOGIC
======================= */

const dateRow = document.getElementById("dateRow");
const bookingDateEl = document.getElementById("bookingDate");

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* Format: 27-Dec-2025 */
function formatPanelDate(date) {
  const d = String(date.getDate()).padStart(2, "0");
  return `${d}-${months[date.getMonth()]}-${date.getFullYear()}`;
}

/* Format card text */
function formatCardDate(date) {
  return {
    dayName: days[date.getDay()],
    shortDate: `${date.getDate()} ${months[date.getMonth()]}`
  };
}

/* Update datePanel */
function updateBookingDate(date) {
  if (bookingDateEl) {
    bookingDateEl.textContent = formatPanelDate(date);
  }
}

/* Render date cards */
function renderDateCards(totalDays = 2) {
  dateRow.innerHTML = "";

  for (let i = 0; i < totalDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const { dayName, shortDate } = formatCardDate(date);

    const card = document.createElement("div");
    card.className = "date-card" + (i === 1 ? " active" : "");
    card.dataset.date = date.toISOString();

    card.innerHTML = `
      <span>${dayName}</span>
      <span style="visibility:hidden;">Space</span>
      <span>${shortDate}</span>
    `;

    card.onclick = () => selectDate(card);
    if (i === 0) 
      updateBookingDate(date);
    else
      dateRow.appendChild(card);

    // Set today as default
  }
}

/* Handle date selection */
function selectDate(selectedCard) {
  document.querySelectorAll(".date-card").forEach(card =>
    card.classList.remove("active")
  );

  selectedCard.classList.add("active");
}

/* =======================
   DC TOGGLE
======================= */

function toggleDC(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector(".summary-icon");

  content.classList.toggle("open");
  icon.textContent = content.classList.contains("open") ? "^" : "v";
}

/* =======================
   INLINE EDIT (dblclick)
======================= */

document.addEventListener("dblclick", function (e) {
  const target = e.target.closest(".editable-text");
  if (!target) return;

  // Prevent reopening editor
  if (target.querySelector("input, textarea")) return;

  const originalText = target.textContent.trim();

  const isMultiLine =
    originalText.length > 25 || originalText.includes(",");

  const input = isMultiLine
    ? document.createElement("textarea")
    : document.createElement("input");

  input.value = originalText;
  input.className = isMultiLine ? "edit-textarea" : "edit-input";

  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";

  const actions = document.createElement("div");
  actions.className = "edit-actions";
  actions.appendChild(okBtn);

  target.textContent = "";
  target.appendChild(input);
  target.appendChild(actions);

  input.focus();

  okBtn.onclick = () => {
    const newValue = input.value.trim() || originalText;
    target.textContent = newValue;
    target.dataset.value = newValue;
  };

  // Save on Enter (single-line)
  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && input.tagName === "INPUT") {
      okBtn.click();
    }
  });
});

/* =======================
   INIT
======================= */

renderDateCards(2);

document.getElementById("generateBlock").addEventListener("dblclick", function () {
  let k=prompt("Enter the number slot");
  renderDateCards(parseInt(k));
})