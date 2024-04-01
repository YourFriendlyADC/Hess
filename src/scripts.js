let colorToGuessElement = document.querySelector('.color-to-guess');
let colorToGuessText = document.querySelector('.color-to-guess-code');

let colorToCheckElement = document.querySelector('.color-to-check');

let anotherColorButton = document.querySelector('.try-another-color');
let retryButton = document.querySelector('.retry');
let seeCodeButton = document.querySelector('.see-code');

let guessInput = document.querySelector('.guess-input');
let guessButton = document.querySelector('.guess-button');

let percentageText = document.querySelector('.percentage-text');

let colorToGuess;

function generateHexCode() {
  const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
      hexCode += hexDigits[Math.floor(Math.random() * hexDigits.length)];
  }
  return hexCode;
}

function checkCodes(hex, guess) {
  hex = hex.substring(1);
  let percentage = 0;
  for (let i = 0; i < 6; i += 2) {
      const hexDigit = parseInt(hex.substr(i, 2), 16);
      const guessDigit = parseInt(guess.substr(i, 2), 16);
      const difference = Math.abs(hexDigit - guessDigit);
      percentage += 100 - (difference / 2.55);
  }
  return (percentage / 3).toFixed(2).replace(/\.?0+$/, '').toString();
}

function updateColor() {
  let colorToGuess = generateHexCode();
  colorToGuessElement.style.backgroundColor = colorToGuess;
  colorToGuessText.style.color = getContrast(colorToGuess);
  return colorToGuess;
}

function getContrast(color) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#222' : '#eee';
}

guessInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    guessButton.click();
  }
});

guessButton.addEventListener('click', function() {
  let guess = guessInput.value;
  if (guess.length == 3) {
    guess = guess[0] + guess[0] + guess[1] + guess[1] + guess[2] + guess[2];
  }
  console.log('Guess:', guess);
  
  if (guess.length == 6) {
    colorToCheckElement.style.backgroundColor = '#' + guess;
    let percentage = checkCodes(colorToGuess, guess);
    percentageText.innerHTML = percentage;
  }
});

// Este no funciona aun
seeCodeButton.addEventListener('click', function() {
  colorToGuessText.innerHTML = colorToGuess;
});

retryButton.addEventListener('click', function() {
  clearValues();
});

anotherColorButton.addEventListener('click', function() {
  colorToGuess = updateColor();
  clearValues();
});

function clearValues() {
  guessInput.value = '';
  percentageText.innerHTML = '??';
  colorToGuessText.innerHTML = '#??????';
  colorToCheckElement.style.backgroundColor = '#FFFFFF';
}

document.addEventListener('DOMContentLoaded', function() {
  colorToGuess = updateColor();
  clearValues();
});
