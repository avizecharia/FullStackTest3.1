interface resivePlayer {
  _id: string;
  playerName: string;
  age: number;
  position: string;
  twoPercent: number;
  threePercent: number;
  season: number[];
  points: number;
}

const rangePoints: HTMLInputElement = document.querySelector("#rangePoints")!;
const rangeLabealPoints: HTMLLabelElement = document.querySelector("#rangeP")!;
const range2: HTMLInputElement = document.querySelector("#rangeTwoPercent")!;
const rangeLabeal2: HTMLLabelElement = document.querySelector("#rangeSec")!;
const range3: HTMLInputElement = document.querySelector("#rangeThreePercent")!;
const rangeLabeal3: HTMLLabelElement = document.querySelector("#rangeThird")!;
const searchPlayear: HTMLButtonElement =
  document.querySelector("#searchPlayear")!;
const selectElm: HTMLSelectElement = document.querySelector("select")!;
const table: HTMLTableElement = document.querySelector("table")!;
let offerPlayers: resivePlayer[] = [];

const BASEURL: string = "https://nbaserver-q21u.onrender.com/api/filter";

rangePoints.addEventListener("change", () => {
  rangeLabealPoints.textContent = `${rangePoints.value}`;
});
range2.addEventListener("change", () => {
  rangeLabeal2.textContent = `${range2.value}`;
});
range3.addEventListener("change", () => {
  rangeLabeal3.textContent = `${range3.value}`;
});

searchPlayear.addEventListener("click", async () => {
  await getAllPLayearsByDetails();
  await rfreachTablePlayers();
});

const getAllPLayearsByDetails = async (): Promise<void> => {
  try {
    const res: Response = await fetch(BASEURL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        position: selectElm.value,
        twoPercent: range2.value,
        threePercent: range3.value,
        points: rangePoints.value,
      }),
    });
    offerPlayers = await res.json();
    console.log(offerPlayers);
  } catch (err) {
    console.log(err);
  }
};

const deleteTable = (): void => {
  let i = table.rows.length;
  while (i > 1) {
    table.deleteRow(1);
    i--;
  }
};

const rfreachTablePlayers = async (): Promise<void> => {
  deleteTable();
  if (offerPlayers.length > 0) {
    for (const player of offerPlayers) {
      await createMewPlayerToTable(player);
    }
  } else {
    // const newTr :HTMLTableRowElement =
  }
};

const createMewPlayerToTable = async (player: resivePlayer): Promise<void> => {
  const newTr: HTMLTableRowElement = document.createElement("tr");
  const newTh1: HTMLTableCellElement = document.createElement("th");
  const newTh2: HTMLTableCellElement = document.createElement("th");
  const newTh3: HTMLTableCellElement = document.createElement("th");
  const newTh4: HTMLTableCellElement = document.createElement("th");
  const newTh5: HTMLTableCellElement = document.createElement("th");
  const newTh6: HTMLTableCellElement = document.createElement("th");
  newTh6.className = "tr6Btn";
  const addPlayer = document.createElement("button");
  addPlayer.textContent = `Add ${
    player.playerName.split(" ")[0]
  } to Current Team`;
  newTh1.textContent = player.playerName;
  newTh2.textContent = player.position;
  newTh3.textContent = `${player.points} `;
  newTh4.textContent = `${player.twoPercent} `;
  newTh5.textContent = `${player.threePercent}`;
  newTh6.appendChild(addPlayer);
  newTr.appendChild(newTh1);
  newTr.appendChild(newTh2);
  newTr.appendChild(newTh3);
  newTr.appendChild(newTh4);
  newTr.appendChild(newTh5);
  newTr.appendChild(newTh6);
  table.appendChild(newTr);
  addPlayer.addEventListener("click", () => {
    addPlayerByPodtion(player);
    console.log("llll");
  });
};

const addPlayerByPodtion = (player: resivePlayer): void => {
  const getCorrectPostion: HTMLDivElement = document.querySelector(
    `#${player.position}`
  )!;
  while (getCorrectPostion.firstChild) {
    getCorrectPostion.removeChild(getCorrectPostion.firstChild);
  }
  getCorrectPostion.className = "insidePlayerDiv";

  const divNAme: HTMLDivElement = document.createElement("div");
  const div2Pre: HTMLDivElement = document.createElement("div");
  const div3Pre: HTMLDivElement = document.createElement("div");
  const divPoints: HTMLDivElement = document.createElement("div");
  divNAme.textContent = player.playerName;
  div2Pre.textContent = `Two Precente : ${player.twoPercent}%`;
  div3Pre.textContent = `There Percent : ${player.threePercent}%`;
  divPoints.textContent = `Points : ${player.points}`;
  getCorrectPostion.appendChild(divNAme);
  getCorrectPostion.appendChild(div2Pre);
  getCorrectPostion.appendChild(div3Pre);
  getCorrectPostion.appendChild(divPoints);
};
