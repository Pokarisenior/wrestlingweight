z// レスラーの情報をリストとして定義しています
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

// Sortableのインスタンスを保持する変数
let sortable = null;

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
        // ランダムなインデックスを生成
        const randomIndex = Math.floor(Math.random() * wrestlers.length);
        const selected = wrestlers[randomIndex];
        // すでに選ばれていない場合のみ追加
        if (!selectedWrestlers.includes(selected)) {
            // 選ばれたレスラーを配列に追加
            selectedWrestlers.push(selected);
            // レスラーの情報を表示するためのdiv要素を作成
            const div = document.createElement('div');
            div.className = 'wrestler';
            div.draggable = true; // ドラッグできるようにする
            div.textContent = selected.name; // 名前を表示
            wrestlerElements.appendChild(div);
        }
    }

    // 以前のSortableインスタンスがあれば、それを破棄
    if (sortable) {
        sortable.destroy();
    }

    // 新しいSortableインスタンスを作成
    sortable = new Sortable(wrestlerElements, {
        animation: 150
    });

    // ボタンのテキストを「判定」に変更
    document.getElementById('check-button').textContent = '判定';
}

// 重量が降順かどうかを判定する関数
function judgeOrder() {
    // レスラーの要素を取得
    const wrestlerElements = document.getElementById('wrestlers').children;
    let correct = true;

    // 重量が降順かどうかを確認
    for (let i = 0; i < wrestlerElements.length - 1; i++) {
        // 現在のレスラーと次のレスラーの情報を取得
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent.replace(/\s+\(\d+kg\)$/, ''));
        const nextWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i + 1].textContent.replace(/\s+\(\d+kg\)$/, ''));

        // 重量が降順になっているか確認
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
    // ゲームの状態をリセット
    gameStarted = false;
}

// 各レスラーの重量を表示する関数
function showWeights() {
    // レスラーの要素を取得
    const wrestlerElements = document.getElementById('wrestlers').children;

    // 各レスラーの重量を表示
    for (let i = 0; i < wrestlerElements.length; i++) {
        // レスラーの名前からレスラー情報を検索
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent.replace(/\s+\(\d+kg\)$/, ''));
        // 重量を表示するためのspan要素を作成
        const weightSpan = document.createElement('span');
        weightSpan.className = 'weight';
        weightSpan.textContent = ` (${currentWrestler.weight}kg)`;
        wrestlerElements[i].appendChild(weightSpan);
    }
}

// ボタンをクリックしたときの処理を設定
document.getElementById('check-button').addEventListener('click', () => {
    if (gameStarted) {
        // ゲームが開始されている場合、順序を判定してから重量を表示
        judgeOrder();
        showWeights();
    } else {
        // ゲームが開始されていない場合、新しいゲームを開始
        startGame();
    }
});

// ゲームを初期化して開始
startGame();
