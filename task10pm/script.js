'use strict';
const numbers = [];
    const clickedNumbers = [];
    const gridLength = 4;
    const table = document.getElementById("gameTable");
    const timerElement = document.getElementById("timer");
    let timer;

    function startGame() {
      numbers.length = 0;
      clickedNumbers.length = 0;
      clearTimeout(timer);
      generateNumbers();
      shuffleNumbers();
      actionTable();
      startTimer();
    }

    function generateNumbers() {
      for (let i = 1; i <= gridLength * gridLength; i++) {
        numbers.push(i);
      }
    }

    function shuffleNumbers() {
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
    }

    function actionTable() {
      let cellIndex = 1;
      for (const row of table.rows) {
        for (const cell of row.cells) {
          const number = numbers[cellIndex - 1];
          cell.innerText = number;
          cell.className = "";
          cell.onclick = inputClicked;
          cellIndex++;
        }
      }
    }

    function inputClicked() {
      const clickedNumber = parseInt(this.innerText);
      if (clickedNumber === clickedNumbers.length + 1) {
        this.classList.add("correct");
        clickedNumbers.push(clickedNumber);
        if (clickedNumbers.length === gridLength * gridLength) {
          clearTimeout(timer);
          alert("Congratulations! You won!");
          releadGame();
        }
      } else {
        alert("You clicked the numbers in the wrong order. You lose!");
        releadGame();
      }
    }

    function startTimer() {
      let timeLeft = 30;
      timerElement.innerText = "Time Left: " + timeLeft;
      timer = setInterval(function () {
        timeLeft--;
        timerElement.innerText = "Time Left: " + timeLeft;
        if (timeLeft === 0) {
          clearTimeout(timer);
          alert("You lose!");
          releadGame();
        }
      }, 1000);
    }

    function releadGame() {
      location.reload();
    }