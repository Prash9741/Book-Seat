
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
  const dcName = btn.querySelector("#dc-name");
  content.classList.toggle("open");
  dcName.classList.toggle("dc-name-active");
  icon.textContent = content.classList.contains("open") ? "^" : "v";
}

/* =======================
   INLINE EDIT (dblclick)
======================= */

/* =======================
   INLINE EDIT (dblclick)
======================= */

document.addEventListener("dblclick", function (e) {
  const target = e.target.closest(".editable-text");
  if (!target) return;

  // Prevent reopening editor
  if (target.querySelector("select, input")) return;

  const originalText = target.dataset.value || target.textContent.trim();

  // ✅ Get options from HTML data-options
  let options = [];
  try {
    options = JSON.parse(target.dataset.options);
  } catch (err) {
    console.error("Invalid data-options JSON", err);
    return;
  }

  const select = document.createElement("select");
  select.className = "edit-select";

  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    if (opt === originalText) option.selected = true;
    select.appendChild(option);
  });

  const customInput = document.createElement("input");
  customInput.type = "text";
  customInput.placeholder = "Enter custom value";
  customInput.className = "edit-input";
  customInput.style.display = "none";

  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";

  const actions = document.createElement("div");
  actions.className = "edit-actions";
  actions.appendChild(okBtn);

  target.innerHTML = "";
  target.appendChild(select);
  target.appendChild(customInput);
  target.appendChild(actions);

  select.addEventListener("change", () => {
    if (select.value === "Custom") {
      customInput.style.display = "block";
      customInput.focus();
    } else {
      customInput.style.display = "none";
    }
  });

  okBtn.onclick = () => {
    let newValue;

    if (select.value === "Custom") {
      newValue = customInput.value.trim() || originalText;
    } else {
      newValue = select.value;
    }

    target.textContent = newValue;
    target.dataset.value = newValue;
  };
});

/* =======================
   INIT
======================= */

renderDateCards(2);

document.getElementById("generateBlock").addEventListener("dblclick", function () {
  let k=prompt("Enter the number slot");
  renderDateCards(parseInt(k));
})