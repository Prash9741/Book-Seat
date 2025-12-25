const dateRow = document.getElementById("dateRow");
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

for (let i = 0; i < 2; i++) {
  const d = new Date();
  d.setDate(d.getDate() + i);

  const card = document.createElement("div");
  card.className = "date-card" + (i === 0 ? " active" : "");
  card.innerHTML = `
    <span>${days[d.getDay()]}</span>
    <span>${d.getDate()} ${months[d.getMonth()]}</span>
  `;
  dateRow.appendChild(card);
}

function toggleDC(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector(".summary-icon");
  content.classList.toggle("open");
  icon.textContent = content.classList.contains("open") ? "^" : "v";
}
