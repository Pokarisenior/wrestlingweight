// プロレスラーのデータを定義
const wrestlers = [
    { name: 'アレックス・ゼイン', weight: 92 },
    { name: '石井智宏', weight: 100 },
    { name: '石森太二', weight: 75 },
    { name: '岩谷麻優', weight: 50 },
    { name: '“キング・オブ・ダークネス“EVIL', weight: 106 },
    { name: '上村優也', weight: 100 },
    { name: '海野翔太', weight: 103 },
    { name: 'エディ・キングストン', weight: 111 },
    { name: 'エル・デスペラード', weight: 0 },
    { name: 'エル・ファンタズモ', weight: 84 },
    { name: '大岩陵平', weight: 110 },
    { name: 'オスカー・ロイべ', weight: 115 },
    { name: '嘉藤匠馬', weight: 82 },
    { name: '金丸義信', weight: 85 },
    { name: 'カラム・ニューマン', weight: 89 },
    { name: 'KUSHIDA', weight: 85 },
    { name: 'クラーク・コナーズ', weight: 92 },
    { name: 'グレート-O-カーン', weight: 120 },
    { name: 'ケビン・ナイト', weight: 91 },
    { name: 'KENTA', weight: 85 },
    { name: 'ゲイブ・キッド', weight: 90 }
];

// ランダムに5人のプロレスラーを選ぶ関数
function getRandomWrestlers() {
    const shuffled = wrestlers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
}

// プロレスラーのリストを生成する関数
function createWrestlerList(wrestlers) {
    const wrestlersDiv = document.getElementById('wrestlers');
    wrestlersDiv.innerHTML = '';
    wrestlers.forEach(wrestler => {
        const wrestlerDiv = document.createElement('div');
        wrestlerDiv.className = 'wrestler';
        wrestlerDiv.textContent = wrestler.name;
        wrestlerDiv.setAttribute('data-weight', wrestler.weight);
        wrestlersDiv.appendChild(wrestlerDiv);
    });
}

// 初回ロード時にリストを生成
createWrestlerList(getRandomWrestlers());

// Sortable.jsを使ってドラッグアンドドロップを有効にする
new Sortable(document.getElementById('wrestlers'), {
    animation: 150
});

// 判定ボタンのクリックイベントを設定
document.getElementById('checkOrder').addEventListener('click', () => {
    const wrestlersDiv = document.getElementById('wrestlers');
    const wrestlerNodes = Array.from(wrestlersDiv.children);
    let isCorrect = true;

    // 並び替えた順番が正しいかどうかをチェック
    for (let i = 0; i < wrestlerNodes.length - 1; i++) {
        const currentWeight = parseInt(wrestlerNodes[i].getAttribute('data-weight'));
        const nextWeight = parseInt(wrestlerNodes[i + 1].getAttribute('data-weight'));
        if (currentWeight < nextWeight) {
            isCorrect = false;
            break;
        }
    }

    // 結果を表示
    wrestlerNodes.forEach(node => {
        node.textContent += ` (${node.getAttribute('data-weight')}kg)`;
    });

    if (isCorrect) {
        alert('正解です！新しいゲームを始めます。');
        createWrestlerList(getRandomWrestlers());
    } else {
        alert('不正解です。もう一度挑戦してください。');
    }
});
