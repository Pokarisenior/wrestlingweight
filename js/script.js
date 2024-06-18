const wrestlers = [
    { name: "アレックス・ゼイン", weight: 92 },
    { name: "石井智宏", weight: 100 },
    { name: "石森太二", weight: 75 },
    { name: "岩谷麻優", weight: 50 },
    { name: "“キング・オブ・ダークネス“EVIL", weight: 106 },
    { name: "上村優也", weight: 100 },
    { name: "海野翔太", weight: 103 },
    { name: "エディ・キングストン", weight: 111 },
    { name: "エル・デスペラード", weight: 0 },
    { name: "エル・ファンタズモ", weight: 84 },
    { name: "大岩陵平", weight: 110 },
    { name: "オスカー・ロイべ", weight: 115 },
    { name: "嘉藤匠馬", weight: 82 },
    { name: "金丸義信", weight: 85 },
    { name: "カラム・ニューマン", weight: 89 },
    { name: "KUSHIDA", weight: 85 },
    { name: "クラーク・コナーズ", weight: 92 },
    { name: "グレート-O-カーン", weight: 120 },
    { name: "ケビン・ナイト", weight: 91 },
    { name: "KENTA", weight: 85 },
    { name: "ゲイブ・キッド", weight: 90 }
];

let gameStarted = true;

function startGame() {
    gameStarted = true;
    const selectedWrestlers = [];
    const wrestlerElements = document.getElementById('wrestlers');
    wrestlerElements.innerHTML = '';

    while (selectedWrestlers.length < 5) {
        const randomIndex = Math.floor(Math.random() * wrestlers.length);
        const selected = wrestlers[randomIndex];
        if (!selectedWrestlers.includes(selected)) {
            selectedWrestlers.push(selected);
            const div = document.createElement('div');
            div.className = 'wrestler';
            div.draggable = true;
            div.textContent = selected.name;
            wrestlerElements.appendChild(div);
        }
    }

    new Sortable(wrestlerElements, {
        animation: 150
    });

    // ボタンのテキストを「判定」に戻す
    document.getElementById('check-button').textContent = '判定';
}

function showWeightsAndJudge() {
    const wrestlerElements = document.getElementById('wrestlers').children;
    let correct = true;

    for (let i = 0; i < wrestlerElements.length; i++) {
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent);
        const weightSpan = document.createElement('span');
        weightSpan.className = 'weight';
        weightSpan.textContent = ` (${currentWrestler.weight}kg)`;
        wrestlerElements[i].appendChild(weightSpan);
    }

    for (let i = 0; i < wrestlerElements.length - 1; i++) {
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent);
        const nextWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i + 1].textContent);

        if (currentWrestler.weight < nextWrestler.weight) {
            correct = false;
            break;
        }
    }

    if (correct) {
        alert('正解！次の問題に進みます。');
    } else {
        alert('不正解です。再挑戦してください。');
    }

    // ボタンのテキストを「もう一問」に変更
    document.getElementById('check-button').textContent = 'もう一問';
    gameStarted = false;
}

document.getElementById('check-button').addEventListener('click', () => {
    if (gameStarted) {
        showWeightsAndJudge();
    } else {
        startGame();
    }
});

startGame();
