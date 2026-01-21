document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.querySelector(".btn-calculate");
  const resetBtn = document.querySelector(".btn-reset");

  calculateBtn.addEventListener("click", calculateBP);
  resetBtn.addEventListener("click", resetForm);
});


function isValidNumber(value, min, max) {
  return !isNaN(value) && value >= min && value <= max;
}

function calculateBP() {
  const sbp = parseFloat(document.getElementById("systolic").value);
  const dbp = parseFloat(document.getElementById("diastolic").value);
  const age = parseFloat(document.getElementById("age").value);
  const pulse = parseFloat(document.getElementById("pulse").value);

  // --- REQUIRED FIELDS VALIDATION ---
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


document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll('input[type="number"]');

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.value < 0) {
        input.value = 0;
      }
    });
  });
});

input.addEventListener("input", () => {
  input.value = input.value.replace(/[^0-9]/g, "");
});


