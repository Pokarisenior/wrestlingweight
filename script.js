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
    { name: "ゲイブ・キッド", weight: 90 },
    {name: "外道", weight: 86},
    {name: "小島 聡", weight: 108},
    {name: "後藤 洋央紀", weight: 103},
    {name: "SANADA", weight: 100},
    {name: "ザック・セイバーJr.", weight: 96},
    {name: "ザ・DKC", weight: 70},
    {name: "シェイン・ヘイスト", weight: 100},
    {name: "SHO", weight: 93},
    {name: "JR・クレイトス", weight: 130},
    {name: "ジェフ・コブ", weight: 119},
    {name: "邪道", weight: 91},
    {name: "獣神サンダー・ライガー", weight: 95},
    {name: "ジョレル・ネルソン", weight: 95},
    {name: "ジョン・モクスリー", weight: 102},
    {name: "鈴木 みのる", weight: 102},
    {name: "タイガーマスク", weight: 85},
    {name: "タイチ", weight: 100},
    {name: "鷹木 信悟", weight: 100},
    {name: "高橋 ヒロム", weight: 88},
    {name: "高橋 裕二郎", weight: 95},
    {name: "TAKAみちのく", weight: 80},
    {name: "田口 隆祐", weight: 91},
    {name: "棚橋 弘至", weight: 101},
    {name: "ダニー・ライムライト", weight: 79},
    {name: "チェーズ・オーエンズ", weight: 93},
    {name: "辻 陽太", weight: 103},
    {name: "TJP", weight: 79},
    {name: "天山 広吉", weight: 115},
    {name: "ディック東郷", weight: 90},
    {name: "デビッド・フィンレー", weight: 95},
    {name: "トム・ローラー", weight: 93},
    {name: "DOUKI", weight: 85},
    {name: "ドリラ・モロニー", weight: 90},
    {name: "内藤 哲也", weight: 102},
    {name: "中島 佑斗", weight: 105},
    {name: "中西 学", weight: 120},
    {name: "永井 大貴", weight: 84},
    {name: "永田 裕志", weight: 108},
    {name: "成田 蓮", weight: 100},
    {name: "ニック・ネメス", weight: 99},
    {name: "バッドラック・ファレ", weight: 160},
    {name: "バッド・デュード・ティト", weight: 116},
    {name: "ヒクレオ", weight: 120},
    {name: "藤田 晃生", weight: 86},
    {name: "フランシスコ・アキラ", weight: 70},
    {name: "フレッド・ロッサー", weight: 108},
    {name: "BUSHI", weight: 83},
    {name: "HENARE", weight: 105},
    {name: "本間 朋晃", weight: 95},
    {name: "ボラドール・ジュニア", weight: 87},
    {name: "ボルチン・オレッグ", weight: 120},
    {name: "マイキー・ニコルス", weight: 104},
    {name: "真壁 刀義", weight: 110},
    {name: "マスター・ワト", weight: 87},
    {name: "マット・リドル", weight: 98},
    {name: "村島 克哉", weight: 87},
    {name: "安田 優虎", weight: 83},
    {name: "矢野 通", weight: 115},
    {name: "YOH", weight: 85},
    {name: "YOSHI-HASHI", weight: 102},
    {name: "ランス・アーチャー", weight: 120},
    {name: "ロイス・アイザックス", weight: 110},
    {name: "ロッキー・ロメロ", weight: 80},
    {name: "ロビー・イーグルス", weight: 80},
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
for (let i = 0; i < wrestlerElements
