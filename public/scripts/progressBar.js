
const progressBar = document.getElementById("p")
const computedStyle = getComputedStyle(progressBar)
const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0
progressBar.style.setProperty("--width", width)