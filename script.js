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

//mengambil inputan dari user
const peluang = document.getElementById("kesempatan");
const level = document.getElementById("level");

const items = [
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
  // {
  //   name: "domba",
  //   image: "src/domba.png",
  // },
  // {
  //   name: "embe",
  //   image: "src/embe.png",
  // },
  // {
  //   name: "kambing",
  //   image: "src/kambing.png",
  // },
  // {
  //   name: "kucing",
  //   image: "src/kucing.png",
  // },
  // {
  //   name: "kuda",
  //   image: "src/kuda.png",
  // },
  // {
  //   name: "merak",
  //   image: "src/merak.png",
  // },
  // {
  //   name: "puyuh",
  //   image: "src/puyuh.png",
  // },
  // {
  //   name: "sapi",
  //   image: "src/sapi.png",
  // },
  // {
  //   name: "ular",
  //   image: "src/ular.png",
  // },
  // {
  //   name: "penyu",
  //   image: "src/penyu.png",
  // },
  // {
  //   name: "monyet",
  //   image: "src/monyet.png",
  // },
  // {
  //   name: "pinguin",
  //   image: "src/pinguin.png",
  // },
  // {
  //   name: "scorpions",
  //   image: "src/scorpions.png",
  // },
  // {
  //   name: "lebah",
  //   image: "src/lebah.png",
  // },
  // {
  //   name: "nyamuk",
  //   image: "src/nyamuk.png",
  // },
  // {
  //   name: "loverbird",
  //   image: "src/loverbird.png",
  // },
  // {
  //   name: "tupai",
  //   image: "src/tupai.png",
  // },
  // {
  //   name: "koala",
  //   image: "src/koala.png",
  // },
  // {
  //   name: "katak",
  //   image: "src/katak.png",
  // },
  // {
  //   name: "elang",
  //   image: "src/elang.png",
  // },
  // {
  //   name: "singa",
  //   image: "src/singa.png",
  // },
];


//Initial win count
let winCount = 0;
let movesCount = 0;

//For timer
let seconds = 0, minutes = 1;
let interval;

const timeGenerator = () => {
  if (seconds === 0) {
    if (minutes > 0) {
      minutes -= 1;
      seconds = 10;
    }
  } else {
    seconds -= 1;
  }

  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span> ${minutesValue}:${secondsValue}`;

  if (minutes === 0 && seconds === 0) {
    clearInterval(interval); //Waktu akan berhenti apabila menit dan detik telah bernilai 0
  }
};

// Start game
function gameStart() {
  sound2.play();
  movesCount = peluang.value;
  seconds = 0;
  minutes = 1;
  controls.classList.add("hide");
  wrapper.classList.remove("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  // Start timer
  interval = setInterval(timeGenerator, 1000);
  // Initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
}
// startButton.addEventListener("click", () => {
//   if (!peluang || !level) {
//     Swal.fire({
//       title: "Peringatan",
//       text: "Ada inputan yang masih kosong, harap di cek kembali sebelum bermain",
//       icon: "info",
//     });
//   } else {
//   }
// });


const movesCounter = () => {
  movesCount -= 1;
  moves.innerHTML = `<span>Peluang :</span>${movesCount}`;
};

const generateRandom = (size = 2) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

//add sound
const sound1 = document.getElementById("sound1");
const sound2 = document.getElementById("sound2");
const sound3 = document.getElementById("sound3");
const sound4 = document.getElementById("sound4");

const matrixGenerator = (cardValues, size = 2) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
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
                sound3.play();
                const popup = Swal.fire({
                  title: "You Win!",
                  text: "Selamat kamu menang",
                  icon: "success",
                  allowEnterKey: true,
                  isComfirmed: controls.classList.remove("hide"),
                  isComfirmed: result.classList.add("hide"),
                  isComfirmed: startButton.classList.add("visible")
                }).then((result) => {
                  if (result.isConfirmed) {
                    sound3.play();
                  }
                });
                result.innerHTML = `${popup}
                <h4>Peluang: ${movesCount}</h4>`;
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
  sound4.play();
  controls.classList.remove("hide");
  wrapper.classList.add("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
}

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

const body = document.body;
body.addEventListener("mousemove", function (event) {
  const lebarContent = window.innerWidth;
  const tinggiContent = window.innerHeight;
  const posX = Math.round((event.clientX / lebarContent) * 255);
  const posY = Math.round((event.clientY / tinggiContent) * 255);

  body.style.backgroundColor = "rgb(" + posX + "," + posY + "," + posX + ")";
});
