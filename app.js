"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const myMain = document.querySelector("main");
const rangePoints = document.querySelector("#rangePoints");
const rangeLabealPoints = document.querySelector("#rangeP");
const range2 = document.querySelector("#rangeTwoPercent");
const rangeLabeal2 = document.querySelector("#rangeSec");
const range3 = document.querySelector("#rangeThreePercent");
const rangeLabeal3 = document.querySelector("#rangeThird");
const saveButton = document.querySelector(".saveTeam");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const myCosenPlayers = [];
// בונוס
// const myTeams: resivePlayer[][] = [];
const searchPlayear = document.querySelector("#searchPlayear");
const selectElm = document.querySelector("select");
const table = document.querySelector("table");
let PGPlayer;
let SGPlayer;
let SFPlayer;
let PFPlayer;
let CPlayer;
let offerPlayers = [];
const BASEURL = "https://nbaserver-q21u.onrender.com/api/filter";
rangePoints.addEventListener("change", () => {
    rangeLabealPoints.textContent = `${rangePoints.value}`;
});
range2.addEventListener("change", () => {
    rangeLabeal2.textContent = `${range2.value}`;
});
range3.addEventListener("change", () => {
    rangeLabeal3.textContent = `${range3.value}`;
});
searchPlayear.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield getAllPLayearsByDetails();
    yield rfreachTablePlayers();
}));
const getAllPLayearsByDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(BASEURL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                position: selectElm.value,
                twoPercent: range2.value,
                threePercent: range3.value,
                points: rangePoints.value,
            }),
        });
        offerPlayers = yield res.json();
        console.log(offerPlayers);
    }
    catch (err) {
        console.log(err);
    }
});
const deleteTable = () => {
    let i = table.rows.length;
    while (i > 1) {
        table.deleteRow(1);
        i--;
    }
};
const rfreachTablePlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    deleteTable();
    if (offerPlayers.length > 0) {
        for (const player of offerPlayers) {
            yield createMewPlayerToTable(player);
        }
    }
    else {
        alert("there is not player that match this details");
    }
});
saveButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (myCosenPlayers.length > 3) {
        console.log("you select all");
        // בונוס
        // await addToServer()
        // myTeams.push(myCosenPlayers);
        // console.log(myTeams);
    }
    else {
        console.log("need to chose all Players");
    }
}));
// בונוס
// const addToServer = async (): Promise<void> => {
//   try {
//     const res: Response = await fetch(BASEURL + "AddTeam", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({
//         players: {
//           myCosenPlayers,
//         },
//       }),
//     });
//     console.log(await res.status);
//     console.log("inside tryyyy");
//   } catch (err) {
//     console.log("erorrrrrrrrrr");
//     console.log(err);
//   }
// };
const createMewPlayerToTable = (player) => __awaiter(void 0, void 0, void 0, function* () {
    const newTr = document.createElement("tr");
    const newTh1 = document.createElement("th");
    const newTh2 = document.createElement("th");
    const newTh3 = document.createElement("th");
    const newTh4 = document.createElement("th");
    const newTh5 = document.createElement("th");
    const newTh6 = document.createElement("th");
    newTh6.className = "tr6Btn";
    const addPlayer = document.createElement("button");
    addPlayer.textContent = `Add ${player.playerName.split(" ")[0]} to Current Team`;
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
});
const addPlayerByPodtion = (player) => {
    console.log(player);
    const getCorrectPostion = document.querySelector(`#${player.position}`);
    while (getCorrectPostion.firstChild) {
        getCorrectPostion.removeChild(getCorrectPostion.firstChild);
    }
    getCorrectPostion.className = "insidePlayerDiv";
    // בונוס 
    //  let currentPlayer : resivePlayer 
    // if ("PG" == player.position) {
    //     PGPlayer = player;
    //     currentPlayer = PGPlayer
    //     myCosenPlayers[0] = player;
    //   }
    //   if ("SG" == player.position) {
    //     SGPlayer = player;
    //     currentPlayer = SGPlayer
    //     myCosenPlayers[1] = player;
    //   }
    //   if ("SF" == player.position) {
    //     SFPlayer = player;
    //     currentPlayer = SFPlayer
    //     myCosenPlayers[2] = player;
    //   }
    //   if ("PF" == player.position) {
    //     PFPlayer = player;
    //     currentPlayer = PFPlayer
    //     myCosenPlayers[3] = player;
    //   }
    //   if ("C" == player.position) {
    //     CPlayer = player;
    //     currentPlayer = CPlayer
    //     myCosenPlayers[4] = player;
    //   }
    const divNAme = document.createElement("div");
    const div2Pre = document.createElement("div");
    const div3Pre = document.createElement("div");
    const divPoints = document.createElement("div");
    divNAme.textContent = player.playerName;
    div2Pre.textContent = `Two Precente : ${player.twoPercent}%`;
    div3Pre.textContent = `There Percent : ${player.threePercent}%`;
    divPoints.textContent = `Points : ${player.points}`;
    getCorrectPostion.appendChild(divNAme);
    getCorrectPostion.appendChild(div2Pre);
    getCorrectPostion.appendChild(div3Pre);
    getCorrectPostion.appendChild(divPoints);
};
// בונוס
// let numberPage = 0;
// nextButton.addEventListener("click", () => {
//   numberPage++;
//   for (const player of myTeams[numberPage]) {
//     addPlayerByPodtion(player);
//   }
// });
// prevButton.addEventListener("click", () => {
//   numberPage--;
//   for (const player of myTeams[numberPage]) {
//     addPlayerByPodtion(player);
//   }
// });
