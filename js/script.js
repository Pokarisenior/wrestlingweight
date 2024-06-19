// レスラーの情報をリストとして定義しています
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

// ゲームの開始状態を示すフラグ
let gameStarted = true;

// ゲームを開始する関数
function startGame() {
    // ゲームが開始された状態に設定
    gameStarted = true;
    // 選ばれたレスラーを格納する配列
    const selectedWrestlers = [];
    // HTML要素を取得してクリア
    const wrestlerElements = document.getElementById('wrestlers');
    wrestlerElements.innerHTML = '';

    // ランダムに5人のレスラーを選ぶ
    while (selectedWrestlers.length < 5) {
        const randomIndex = Math.floor(Math.random() * wrestlers.length);
        const selected = wrestlers[randomIndex];
        // すでに選ばれていない場合のみ追加
        if (!selectedWrestlers.includes(selected)) {
            selectedWrestlers.push(selected);
            const div = document.createElement('div');
            div.className = 'wrestler';
            div.draggable = true; // ドラッグできるようにする
            div.textContent = selected.name; // 名前を表示
            wrestlerElements.appendChild(div);
        }
    }

    // 選んだレスラーをドラッグ&ドロップできるようにする
    new Sortable(wrestlerElements, {
        animation: 150
    });

    // ボタンのテキストを「判定」に変更
    document.getElementById('check-button').textContent = '判定';
}

// 重量を表示し、正解かどうかを判定する関数
function showWeightsAndJudge() {
    const wrestlerElements = document.getElementById('wrestlers').children;
    let correct = true;

    // 各レスラーの重量を表示
    for (let i = 0; i < wrestlerElements.length; i++) {
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent);
        const weightSpan = document.createElement('span');
        weightSpan.className = 'weight';
        weightSpan.textContent = ` (${currentWrestler.weight}kg)`;
        wrestlerElements[i].appendChild(weightSpan);
    }
          

    // 重量が降順かどうかを確認
    for (let i = 0; i < wrestlerElements.length - 1; i++) {
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent);
        const nextWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i + 1].textContent);

        if (currentWrestler.weight < nextWrestler.weight) {
            correct = false;
            break;
        }
    }

    // 判定結果を表示
    if (correct) {
        alert('正解！次の問題に進みます。');
    } else {
        alert('不正解です。再挑戦してください。');
    }

    // ボタンのテキストを「もう一問」に変更
    document.getElementById('check-button').textContent = 'もう一問';
    gameStarted = false; // ゲームの状態をリセット
}

// ボタンをクリックしたときの処理を設定
document.getElementById('check-button').addEventListener('click', () => {
    if (gameStarted) {
        showWeightsAndJudge();
    } else {
        startGame();
    }
});

// ゲームを初期化して開始
startGame();
