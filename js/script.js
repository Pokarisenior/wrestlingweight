// プロレスラーのデータ（名前と体重）
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
    { name: "ゲイブ・キッド", weight: 90 }// 必要に応じて他のプロレスラーを追加してください
];

// 5人のランダムなプロレスラーを選んで表示する関数
function displayWrestlers() {
    const container = document.getElementById('wrestlers-container');
    container.innerHTML = ''; // 空にする

    // ランダムに5人選ぶ
    const selectedWrestlers = getRandomWrestlers(5);

    // 選んだプロレスラーを表示
    selectedWrestlers.forEach(wrestler => {
        const wrestlerDiv = document.createElement('div');
        wrestlerDiv.className = 'wrestler';
        wrestlerDiv.innerText = wrestler.name;
        wrestlerDiv.setAttribute('draggable', 'true');
        container.appendChild(wrestlerDiv);
    });
}

// ページ読み込み時に実行
window.onload = function() {
    displayWrestlers(); // 初期表示
};

// プロレスラーをランダムに選ぶ関数
function getRandomWrestlers(count) {
    const shuffled = wrestlers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ドラッグアンドドロップの処理
const wrestlersContainer = document.getElementById('wrestlers-container');
let draggedItem = null;

wrestlersContainer.addEventListener('dragstart', function(event) {
    draggedItem = event.target;
    setTimeout(() => {
        event.target.style.display = 'none';
    }, 0);
});

wrestlersContainer.addEventListener('dragend', function() {
    setTimeout(() => {
        draggedItem.style.display = 'block';
        draggedItem = null;
    }, 0);
});

wrestlersContainer.addEventListener('dragover', function(event) {
    event.preventDefault();
});

wrestlersContainer.addEventListener('dragenter', function(event) {
    event.preventDefault();
    if (event.target.className === 'wrestler') {
        event.target.style.backgroundColor = 'lightgray';
    }
});

wrestlersContainer.addEventListener('dragleave', function(event) {
    if (event.target.className === 'wrestler') {
        event.target.style.backgroundColor = '';
    }
});

wrestlersContainer.addEventListener('drop', function(event) {
    event.preventDefault();
    if (event.target.className === 'wrestler') {
        event.target.style.backgroundColor = '';
        wrestlersContainer.insertBefore(draggedItem, event.target);
    }
});

// 並び替えを確認するボタンの処理
const checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', function() {
    const sortedNames = Array.from(wrestlersContainer.children).map(child => child.innerText);
    const sortedWrestlers = wrestlers.filter(wrestler => sortedNames.includes(wrestler.name));

    wrestlersContainer.innerHTML = ''; // 内容を空にする

    // 並び替え後の表示
    sortedWrestlers.forEach(wrestler => {
        const wrestlerDiv = document.createElement('div');
        wrestlerDiv.className = 'wrestler';
        wrestlerDiv.innerText = `${wrestler.name}：${wrestler.weight}kg`;
        wrestlersContainer.appendChild(wrestlerDiv);
    });

    // ボタンのテキストを変更する
    checkButton.textContent = 'もう一問';
    checkButton.removeEventListener('click', arguments.callee);
    checkButton.addEventListener('click', function() {
        displayWrestlers(); // 新しいゲームを始める
        checkButton.textContent = '並び替えを確認する';
    });
});
