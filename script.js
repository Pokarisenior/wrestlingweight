// レスラーの情報をリストとして定義しています
const wrestlers = [
    { name: "アレックス・ゼイン", weight: 92 },
    { name: "アレックス・コグリン", weight: 93 },
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
    {name: "ロビー・イーグルス", weight: 80}
];
let gameStarted = false;
let consecutiveCorrectCount = 0;
let sortable = null;

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

    if (sortable) {
        sortable.destroy();
    }

    sortable = new Sortable(wrestlerElements, {
        animation: 150
    });

    document.getElementById('check-button').textContent = '判定';
    document.getElementById('seikai').style.visibility = 'hidden';
    document.getElementById('count').style.visibility = 'hidden';
    document.getElementById('zannen').style.visibility = 'hidden';
    document.getElementById('kekka').style.visibility = 'hidden';
    document.getElementById('tweet-button').style.visibility = 'hidden';
}

function Call() {
    const sideImage = document.getElementById('side-image');
    sideImage.style.visibility = sideImage.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

function TrueCall(correct) {
    const Seikai = document.getElementById('seikai');
    Seikai.style.visibility = correct ? 'visible' : 'hidden';
    const countElement = document.getElementById('count');
    countElement.textContent = ` ${consecutiveCorrectCount}`;
    countElement.style.visibility = correct ? 'visible' : 'hidden';
}

function FalseCall(correct) {
    const Zannen = document.getElementById('zannen');
    Zannen.style.visibility = correct ? 'visible' : 'hidden';
    const kekkaElement = document.getElementById('kekka');
    kekkaElement.style.visibility = correct ? 'visible' : 'hidden';
}

function displayTitle(consecutiveCorrectCount) {
    let title;

    switch (consecutiveCorrectCount) {
        case 0:
            title = "ち○ぽ野郎";
            break;
        case 1:
            title = "カブロン";
            break;
        case 2:
            title = "宇和島の恥";
            break;
        case 3:
            title = "愚鈍な餅";
            break;
        case 4:
            title = "ヤングライオン";
            break;
        case 5:
            title = "HP担当者";
            break;
        case 6:
            title = "ゲスト解説";
            break;
        case 7:
            title = "真社長";
            break;
        case 8:
            title = "神";
            break;
        case 9:
            title = "新社長";
            break;
        default:
            if (consecutiveCorrectCount >= 10) {
                title = "闘魂";
            }
    }

    const kekkaElement = document.getElementById('kekka');
    kekkaElement.innerText = title;
    kekkaElement.style.visibility = 'visible';

    const tweetButton = document.getElementById('tweet-button');
    const tweetText = `${consecutiveCorrectCount}問正解、ランクは${title}です。#新日WS https://pokarisenior.github.io/wrestlingweight/`;
  const tweetUrl = `https://twitter.com/share?text=${encodeURIComponent(tweetText)}&ref_src=twsrc%5Etfw`;
    tweetButton.href = tweetUrl;
    tweetButton.style.visibility = 'visible';
}

function judgeOrder() {
    const wrestlerElements = document.getElementById('wrestlers').children;
    let correct = true;

    for (let i = 0; i < wrestlerElements.length - 1; i++) {
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent);
        const nextWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i + 1].textContent);
        if (currentWrestler.weight < nextWrestler.weight) {
            correct = false;
            break;
        }
    }

    if (correct) {
        consecutiveCorrectCount++;
        Call();
        TrueCall(true);
        FalseCall(false);
　　    document.getElementById('check-button').textContent = 'もう一問';

    } else {
        Call();
        TrueCall(false);
        FalseCall(true);
　　     displayTitle(consecutiveCorrectCount);       			consecutiveCorrectCount = 0;
	    document.getElementById('check-button').textContent = '再挑戦';
    }

    gameStarted = false;
}

function showWeights() {
    const wrestlerElements = document.getElementById('wrestlers').children;

    for (let i = 0; i < wrestlerElements.length; i++) {
        const currentWrestler = wrestlers.find(wrestler => wrestler.name === wrestlerElements[i].textContent);
        wrestlerElements[i].textContent = '';
        const nameP = document.createElement('p');
        nameP.textContent = currentWrestler.name;
        wrestlerElements[i].appendChild(nameP);
        const weightP = document.createElement('p');
        weightP.className = 'weight';
        weightP.textContent = `(${currentWrestler.weight}kg)`;
        wrestlerElements[i].appendChild(weightP);
    }
}

document.getElementById('check-button').addEventListener('click', () => {
    if (gameStarted) {
        judgeOrder();
        showWeights();
    } else {
        startGame();
        Call();
    }
});

startGame();
