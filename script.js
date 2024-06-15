const wrestlers = [
    { name: 'Wrestler 1', weight: 120 },
    { name: 'Wrestler 2', weight: 150 },
    { name: 'Wrestler 3', weight: 130 },
    { name: 'Wrestler 4', weight: 140 },
    { name: 'Wrestler 5', weight: 160 },
];

// シャッフル関数
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// プロレスラーのリストを描画
function renderWrestlerList() {
    const wrestlerListElement = document.getElementById('wrestlerList');
    wrestlerListElement.innerHTML = '';
    wrestlers.forEach(wrestler => {
        const wrestlerDiv = document.createElement('div');
        wrestlerDiv.textContent = wrestler.name;
        wrestlerDiv.draggable = true;
        wrestlerDiv.classList.add('wrestler');
        wrestlerListElement.appendChild(wrestlerDiv);
    });
}

// 判定ボタンのクリックイベント
document.getElementById('judgeButton').addEventListener('click', () => {
    // 判定ロジックをここに追加
    alert('判定ボタンが押されました');
});

// 初期化
function init() {
    shuffle(wrestlers);
    renderWrestlerList();
}

init();
