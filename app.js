let display = document.getElementById("display");
let memory = 0;
let expression = "";

// Update display
function updateDisplay() {
  display.value = expression;
}

// Button clicks (fixed for web keys)
document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", () => {
    const val = button.innerText.trim(); // Use button text reliably

    if(val === "C") clearAll();
    else if(val === "⌫") backspace();
    else if(val === "=") calculate();
    else if(val === "MC") memoryClear();
    else if(val === "MR") memoryRecall();
    else if(val === "M+") memoryAdd();
    else if(val === "M-") memorySubtract();
    else if(val === "%") percentage();
    else append(val);
  });
});

// Keyboard input
document.addEventListener("keydown", e => {
  const allowedKeys = "0123456789+-*/.";
  if(allowedKeys.includes(e.key)) append(e.key);
  else if(e.key === "Enter") calculate();
  else if(e.key === "Backspace") backspace();
  else if(e.key === "Escape") clearAll();
});

// Append numbers/operators
function append(val){
  expression += val;
  updateDisplay();
}

function backspace(){
  expression = expression.slice(0, -1);
  updateDisplay();
}

function clearAll(){
  expression = "";
  updateDisplay();
}

function calculate(){
  try{
    if(expression === "") return;
    let exp = expression.replace(/%/g, "/100");
    let result = eval(exp);
    if(!isFinite(result)) throw new Error();
    expression = result.toString();
    updateDisplay();
  } catch {
    display.value = "Error";
    expression = "";
  }
}

// Percentage button
function percentage(){
  try{
    if(expression === "") return;
    let lastNumber = expression.match(/(\d+\.?\d*)$/);
    if(lastNumber){
      let num = parseFloat(lastNumber[0]);
      let percent = num / 100;
      expression = expression.replace(/(\d+\.?\d*)$/, percent);
      updateDisplay();
    }
  } catch {}
}

// Memory functions
function memoryAdd(){
  let num = parseFloat(display.value);
  if(!isNaN(num)) memory += num;
}

function memorySubtract(){
  let num = parseFloat(display.value);
  if(!isNaN(num)) memory -= num;
}

function memoryClear(){
  memory = 0;
}

function memoryRecall(){
  expression += memory.toString();
  updateDisplay();
}
