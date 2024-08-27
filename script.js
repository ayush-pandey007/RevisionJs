const barContainer = document.getElementById("barContainer");
const userInput = document.getElementById("inputValue");
const linearSearchbtn = document.getElementById("linearSearchbtn");
const binarySearchbtn = document.getElementById("binarySearchbtn");
const container = document.getElementById("container");

userInput.addEventListener("input", checkInput);
let globalArray = [];
let speed = 50;
let isLoopRunning = false;

linearSearchbtn.onclick = () => linearSearch(userInput.value);
binarySearchbtn.onclick = () => binarySearch(userInput.value);

linearSearchbtn.disabled = true;
binarySearchbtn.disabled = true;

let innerHtmlTag = false;
function randomNumberGenerator(min, max) {
  min = min || 0;
  max = max || 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayGenerator(value) {
  const arr = [];
  console.log(value);
  for (let i = 0; i < value; i++) {
    let randomNumber = randomNumberGenerator();

    arr.push(randomNumber);
  }
  globalArray = arr;
  return arr;
}

function createBar(arr, value, barWidth, innerHtmlTag) {
  const barArray = arr || arrayGenerator(value);

  // console.log(barArray);

  barArray.forEach((value, index) => {
    const divBar = document.createElement("div");
    divBar.classList.add("bars");

    innerHtmlTag ? (divBar.innerHTML = value) : console.log("be happy");
    divBar.style.height = `${value * 8}px`;
    divBar.style.width = `${barWidth}px`;
    barContainer.appendChild(divBar);
  });

  return barArray;
}

async function linearSearch(value) {
  const barArray = globalArray;
  const animationbars = document.getElementsByClassName("bars");

  for (let i = 0; i < animationbars.length; i++) {
    isLoopRunning = true;
    animationbars[i].style.backgroundColor = "#FFDAB9";
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (parseInt(barArray[i]) === parseInt(value)) {
      animationbars[i].style.backgroundColor = "#DA70D6";
      alert(`found the value ${value} at index ${i}`);
      continue;
    }

    animationbars[i].style.backgroundColor = "#4682B4";
  }
  isLoopRunning = false;
}

async function binarySearch(value) {
  const barArray = globalArray;
  const sortedArray = sortArray(barArray);
  binarySearchHelper(sortedArray);

  let low = 0;
  let high = barArray.length - 1;
  while (low <= high) {
    isLoopRunning = true;
    let mid = Math.floor((high - low) / 2 + low);

    const Bars = document.getElementsByClassName("bars");
    Bars[mid].style.backgroundColor = "yellow";
    await new Promise((resolve) => setTimeout(resolve, speed * 2));

    if (parseInt(value) === parseInt(sortedArray[mid])) {
      Bars[mid].style.backgroundColor = "#DA70D6";
      alert(`found the value ${value} at index ${mid}`);
      console.log("yeyyey");
      break;
    } else if (parseInt(value) > parseInt(sortedArray[mid])) {
      for (let i = 0; i <= mid; i++) {
        Bars[i].style.backgroundColor = "#6A2C70";
      }

      low = mid + 1;
    } else {
      for (let i = mid; i <= high; i++) {
        Bars[i].style.backgroundColor = "#6A2C70";
      }
      high = mid - 1;
    }
  }
  isLoopRunning = false;
}

function binarySearchHelper(sortedArray) {
  const barArray = document.getElementsByClassName("bars");

  for (let i = 0; i < sortedArray.length; i++) {
    barArray[i].style.backgroundColor = "#4682B4";
    innerHtmlTag
      ? (barArray[i].innerHTML = sortedArray[i])
      : console.log("Be Happy");
    barArray[i].style.height = `${sortedArray[i] * 5}px`;
  }
}

function sortArray(barArray) {
  barArray.sort((a, b) => a - b);

  return barArray;
}

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
  // console.log(this.value);
  const barArray = document.getElementsByClassName("bars");

  while (barArray.length > 0) {
    const barElement = barArray[0];
    barElement.parentNode?.removeChild(barElement);
  }

  let barWidth = 7;

  if (this.value <= 10) {
    innerHtmlTag = true;
    barWidth = 100;
  } else if (this.value <= 20 && this.value >= 11) {
    innerHtmlTag = true;
    barWidth = 60;
  } else if (this.value <= 30 && this.value >= 21) {
    innerHtmlTag = true;
    barWidth = 40;
  } else if (this.value <= 40 && this.value >= 31) {
    innerHtmlTag = true;
    barWidth = 25;
  } else if (this.value == 41) {
    this.innerHtmlTag = false;
    barWidth = 25;
  } else if (this.value <= 60 && this.value >= 41) {
    innerHtmlTag = false;
    barWidth = 15;
  } else if (this.value <= 80 && this.value >= 61) {
    innerHtmlTag = false;
    barWidth = 10;
  } else if (this.value <= 100 && this.value >= 81) {
    innerHtmlTag = false;
    barWidth = 10;
  }
  globalArray = createBar(undefined, this.value, barWidth, innerHtmlTag);
};

createBar(undefined, 50, 15, false);

const speedSlider = document.getElementById("mySpeed");
const speedOutput = document.getElementById("demo2");
output.innerHTML = slider.value;

speedSlider.oninput = function () {
  speedOutput.innerHTML = this.value;
  speed = this.value;
};

function checkInput() {
  if (userInput.value.trim() !== "") {
    linearSearchbtn.disabled = false;
    binarySearchbtn.disabled = false;
  } else {
    linearSearchbtn.disabled = true;
    binarySearchbtn.disabled = true;
  }
}

setInterval(() => {
  if (isLoopRunning) {
    userInput.disabled = true;
    linearSearchbtn.disabled = true;
    binarySearchbtn.disabled = true;
    slider.disabled = true;
    speedSlider.disabled = true;
  } else {
    userInput.disabled = false;
    if (userInput.value.trim() !== "") {
      linearSearchbtn.disabled = false;
      binarySearchbtn.disabled = false;
    }
    slider.disabled = false;
    speedSlider.disabled = false;
  }
}, 100);

function resizeChild() {
  const parentWidth = container.offsetWidth; // Get parent's width
  const parentHeight = container.offsetHeight;
  const bars = document.getElementsByClassName("bars");

  // Iterate through all the bars and resize them
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.width = parentWidth / (2 * bars.length) + "px"; // Distribute width evenly
    bars[i].style.height =
      parseInt((globalArray[i] / 100) * (parentHeight - 400)) + "px";
    // Adjust height for all bars

    console.log(bars[i].style.width);
    console.log(parentHeight);
  }
}

window.addEventListener("resize", resizeChild);

resizeChild();
