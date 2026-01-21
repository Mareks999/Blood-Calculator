// ================================
// BLOCK INVALID KEYS & VALIDATE INPUTS
// ================================
function blockInvalidKeys(e) {
  if (["e", "E", "+", "-", "."].includes(e.key)) {
    e.preventDefault();
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.querySelector(".btn-calculate");
  const resetBtn = document.querySelector(".btn-reset");

  calculateBtn.addEventListener("click", calculateBP);
  resetBtn.addEventListener("click", resetForm);

  // Apply input restrictions
  const inputs = document.querySelectorAll('input[type="number"]');

  inputs.forEach(input => {
    input.addEventListener("keydown", blockInvalidKeys);

    input.addEventListener("input", () => {
      // Remove non-numeric characters
      input.value = input.value.replace(/[^0-9]/g, "");

      let value = parseInt(input.value, 10);

      if (isNaN(value) || value <= 0) {
        input.value = "";
        return;
      }

      // Max limits by input field
      const limits = {
        systolic: 300,
        diastolic: 200,
        age: 120,
        pulse: 220
      };

      const max = limits[input.id] ?? 999;

      if (value > max) {
        input.value = max;
      }
    });
  });
});

// ================================
// NUMBER VALIDATION HELPER
// ================================
function isValidNumber(value, min, max) {
  return !isNaN(value) && value >= min && value <= max;
}

// ================================
// CALCULATION FUNCTION
// ================================
function calculateBP() {
  const sbp = parseInt(document.getElementById("systolic").value, 10);
  const dbp = parseInt(document.getElementById("diastolic").value, 10);
  const age = parseInt(document.getElementById("age").value, 10);
  const pulse = parseInt(document.getElementById("pulse").value, 10);

  // --- REQUIRED FIELD VALIDATION ---
  if (!isValidNumber(sbp, 50, 300)) {
    alert("Please enter a valid systolic value (50–300 mmHg).");
    return;
  }

  if (!isValidNumber(dbp, 30, 200)) {
    alert("Please enter a valid diastolic value (30–200 mmHg).");
    return;
  }

  if (sbp <= dbp) {
    alert("Systolic pressure must be higher than diastolic pressure.");
    return;
  }

  // --- OPTIONAL AGE ---
  if (!isNaN(age) && !isValidNumber(age, 1, 120)) {
    alert("Please enter a valid age (1–120).");
    return;
  }

  // --- OPTIONAL PULSE ---
  if (!isNaN(pulse) && !isValidNumber(pulse, 30, 220)) {
    alert("Please enter a valid pulse (30–220 bpm).");
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

  // --- CALCULATIONS ---
  const map = ((sbp + 2 * dbp) / 3).toFixed(1);
  const pulsePressure = sbp - dbp;

  let shockIndexText = "Not calculated";
  if (!isNaN(pulse)) {
    const shockIndex = (pulse / sbp).toFixed(2);
    shockIndexText = `${shockIndex} (normal ≈ 0.5–0.7)`;
  }

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

// ================================
// RESET FUNCTION
// ================================
function resetForm() {
  ["systolic", "diastolic", "age", "pulse"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("result-box").style.display = "none";
}
