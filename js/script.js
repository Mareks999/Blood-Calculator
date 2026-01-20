document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.querySelector(".btn-calculate");
  const resetBtn = document.querySelector(".btn-reset");

  calculateBtn.addEventListener("click", calculateBP);
  resetBtn.addEventListener("click", resetForm);
});

function calculateBP() {
  const sbp = parseFloat(document.getElementById("systolic").value);
  const dbp = parseFloat(document.getElementById("diastolic").value);
  const age = parseFloat(document.getElementById("age").value);
  const pulse = parseFloat(document.getElementById("pulse").value);

  if (isNaN(sbp) || isNaN(dbp)) {
    alert("Please enter both systolic and diastolic blood pressure values.");
    return;
  }

  // --- BP CATEGORY ---
  let category = "";

 if (sbp > 180 || dbp > 120) {
    category = "Hypertensive Crisis (seek immediate medical attention)";
} else if (sbp >= 160 || dbp >= 100) {
    category = "Hypertension Stage 2 (High)";
} else if (sbp >= 140 || dbp >= 90) {
    category = "Hypertension Stage 2 (Low)";
} else if (sbp >= 135 || dbp >= 85) {
    category = "Hypertension Stage 1 (Moderate)";
} else if (sbp >= 130 || dbp >= 80) {
    category = "Hypertension Stage 1 (Mild)";
} else if (sbp >= 125 && sbp <= 129 && dbp < 80) {
    category = "Elevated Blood Pressure (High end)";
} else if (sbp >= 120 && sbp <= 124 && dbp < 80) {
    category = "Elevated Blood Pressure (Low end)";
} else {
    category = "Normal Blood Pressure";
}


  // --- MAP ---
  const map = ((sbp + 2 * dbp) / 3).toFixed(1);

  // --- Pulse Pressure ---
  const pulsePressure = sbp - dbp;

  // --- Shock Index (optional) ---
  let shockIndexText = "Not calculated";
  if (!isNaN(pulse)) {
    const shockIndex = (pulse / sbp).toFixed(2);
    shockIndexText = `${shockIndex} (normal ≈ 0.5–0.7)`;
  }

  // --- Age note ---
  let ageNote = "";
  if (!isNaN(age)) {
    if (age < 18) {
      ageNote = "Adult BP ranges may not apply to children.";
    } else if (age >= 60 && sbp >= 130) {
      ageNote = "Monitor blood pressure closely due to age.";
    }
  }

  // --- OUTPUT ---
  const resultBox = document.getElementById("result-box");
  const resultContent = document.getElementById("result-content");

  resultContent.innerHTML = `
    <p><strong>Blood Pressure Category:</strong> ${category}</p>
    <p><strong>Mean Arterial Pressure (MAP):</strong> ${map} mmHg</p>
    <p><strong>Pulse Pressure:</strong> ${pulsePressure} mmHg</p>
    <p><strong>Shock Index:</strong> ${shockIndexText}</p>
    ${ageNote ? `<p><strong>Note:</strong> ${ageNote}</p>` : ''}
  `;

  resultBox.style.display = "block";
}

function resetForm() {
  document.getElementById("systolic").value = "";
  document.getElementById("diastolic").value = "";
  document.getElementById("age").value = "";
  document.getElementById("pulse").value = "";
  document.getElementById("result-box").style.display = "none";
}
