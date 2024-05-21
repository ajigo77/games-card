const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const wrapper = document.getElementsByClassName("wrapper")[0];
let cards;
let firstCard = false;
let secondCard = false;
let interval;

//mengambil inputan dari user
const peluang = document.getElementById("kesempatan");
const level = document.getElementById("level");

//add sound
const sound1 = document.getElementById("sound1");
const sound2 = document.getElementById("sound2");
const sound3 = document.getElementById("sound3");
const sound4 = document.getElementById("sound4");
const sound5 = document.getElementById("sound5");
const sound6 = document.getElementById("sound6");

const items1 = [
  {
    name: "anjing",
    image: "src/anjing.png",
  },
  {
    name: "ayam",
    image: "src/ayam.png",
  },
  {
    name: "banteng",
    image: "src/banteng.png",
  },
  {
    name: "bebek",
    image: "src/bebek.png",
  },
  {
    name: "domba",
    image: "src/domba.png",
  },
  {
    name: "embe",
    image: "src/embe.png",
  },
  {
    name: "kambing",
    image: "src/kambing.png",
  },
  {
    name: "kucing",
    image: "src/kucing.png",
  },
  {
    name: "kuda",
    image: "src/kuda.png",
  },
  {
    name: "merak",
    image: "src/merak.png",
  },
  {
    name: "puyuh",
    image: "src/puyuh.png",
  },
  {
    name: "sapi",
    image: "src/sapi.png",
  },
  {
    name: "ular",
    image: "src/ular.png",
  },
  {
    name: "penyu",
    image: "src/penyu.png",
  },
  {
    name: "monyet",
    image: "src/monyet.png",
  },
  {
    name: "pinguin",
    image: "src/pinguin.png",
  },
  {
    name: "scorpions",
    image: "src/scorpions.png",
  },
  {
    name: "lebah",
    image: "src/lebah.png",
  },
  {
    name: "nyamuk",
    image: "src/nyamuk.png",
  },
  {
    name: "loverbird",
    image: "src/loverbird.png",
  },
  {
    name: "tupai",
    image: "src/tupai.png",
  },
  {
    name: "koala",
    image: "src/koala.png",
  },
  {
    name: "katak",
    image: "src/katak.png",
  },
  {
    name: "elang",
    image: "src/elang.png",
  },
  {
    name: "singa",
    image: "src/singa.png",
  },
];

//Initial win count
let winCount = 0;
let movesCount = 0;

//For timer
let seconds, minutes;

// Start game
function gameStart() {
  if (!parseInt(peluang.value) || !level.value) {
    Swal.fire({
      title: "Peringatan",
      text: "Ada inputan yang masih kosong, harap di cek kembali sebelum bermain",
      icon: "info",
    });
  } else {
    sound1.play();
    sound5.play();
    movesCount = parseInt(peluang.value);
    seconds = 0;

    let size;
    if (level.value === "easy") {
      size = 2;
      minutes = 1;
    } else if (level.value === "normal") {
      size = 4;
      minutes = 2;
    } else if (level.value === "hard") {
      size = 6;
      minutes = 4;
    }

    controls.classList.add("hide");
    wrapper.classList.remove("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");

    // Start timer
    interval = setInterval(timeGenerator, 1000);
    // Initial moves
    moves.innerHTML = `<span>Peluang : ${movesCount} </span>`;

    let cardValues = generateRandom(size);
    matrixGenerator(cardValues, size);
  }
}
const timeGenerator = () => {
  if (seconds === 0) {
    if (minutes > 0) {
      minutes -= 1;
      seconds = 59;
    } else {
      if (minutes === 0 || seconds === 0) {
        popupLost();
        clearInterval(interval);
        return;
      }
    }
  } else {
    seconds -= 1;
  }

  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time : ${minutesValue}:${secondsValue}</span>`;

  if (minutes == 0 && seconds <= 30) {
    timeValue.classList.add("bg-white", "p-1", "rounded-sm");
  }
};

const movesCounter = () => {
  if (movesCount > 1) {
    movesCount -= 1;
  } else {
    popupLost();
    clearInterval(interval);
    movesCount = movesCount;
  }
  moves.innerHTML = `<span>Peluang :</span>${movesCount}`;
};

const generateRandom = (size) => {
  let tempArray = [...items1];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size) => {
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  // Cards
  let cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      sound2.play();
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              //play sound music
              sound5.pause();
              popupWinner();
              wrapper.classList.add("hide");
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 600);
          }
        }
      }
    });
  });
};

//Stop game
function gameStop() {
  location.reload();
  sound4.play();
  sound5.pause();
  controls.classList.remove("hide");
  wrapper.classList.add("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
}

const popupLost = () => {
  sound6.play();
  sound5.pause();
  Swal.fire({
    title: "Game Over!",
    text: "Kesempatan tidak datang dua kali, tapi kesempatan datang kepada orang tidak pernah berhenti untuk mencoba",
    color: "#FF1818",
    allowEnterKey: true,
    isComfirmed: controls.classList.remove("hide"),
    isComfirmed: result.classList.add("hide"),
    isComfirmed: startButton.classList.add("visible"),
    imageUrl: "./src/icon/lost.png",
    imageHeight: 250,
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
      gameStop();
    }
  });
};

const popupWinner = () => {
  sound3.play();
  Swal.fire({
    title: "You Win!",
    text: "Selamat kamu menang",
    color: "#41B06E",
    allowEnterKey: true,
    isComfirmed: controls.classList.remove("hide"),
    isComfirmed: result.classList.add("hide"),
    isComfirmed: startButton.classList.add("visible"),
    imageUrl: "./src/icon/winner.png",
    imageHeight: 250,
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}
  

const body = document.body;
body.addEventListener("mousemove", function (event) {
  const lebarContent = window.innerWidth;
  const tinggiContent = window.innerHeight;
  const posX = Math.round((event.clientX / lebarContent) * 255);
  const posY = Math.round((event.clientY / tinggiContent) * 255);

  body.style.backgroundColor = "rgb(" + posX + "," + posY + "," + posX + ")";
});
