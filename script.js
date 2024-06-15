let score = 0;
let isCorrect = false;
const wrestlers = [
    { name: 'Wrestler 1', weight: 120 },
    { name: 'Wrestler 2', weight: 150 },
    { name: 'Wrestler 3', weight: 130 },
    { name: 'Wrestler 4', weight: 140 },
    { name: 'Wrestler 5', weight: 160 },
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderWrestlers() {
    const sidebar = document.getElementById('A');
    sidebar.innerHTML = '';
    wrestlers.forEach(wrestler => {
        const div = document.createElement('div');
        div.classList.add('wrestler');
        div.draggable = true;
        div.textContent = wrestler.name;
        div.dataset.weight = wrestler.weight;
        sidebar.appendChild(div);
    });

    const draggables = document.querySelectorAll('.wrestler');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    const container = document.getElementById('A');
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.wrestler:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Pixi.jsを使ってキャラクターを描画
const app = new PIXI.Application({
    width: window.innerWidth * 0.8,
    height: window.innerHeight,
    backgroundColor: 0xeaeaea,
});
document.getElementById('B').appendChild(app.view);

const character = PIXI.Sprite.from('path/to/character/image.png');
character.anchor.set(0.5);
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;
app.stage.addChild(character);

document.getElementById('C').addEventListener('click', () => {
    const sortedWrestlers = Array.from(document.querySelectorAll('.wrestler')).map(el => ({
        name: el.textContent,
        weight: el.dataset.weight,
    }));

    const correctOrder = wrestlers.slice().sort((a, b) => b.weight - a.weight);
    isCorrect = JSON.stringify(sortedWrestlers) === JSON.stringify(correctOrder);

    const moveCharacter = new PIXI.Ticker();
    moveCharacter.add(() => {
        character.x += 5;
        if (character.x > app.screen.width) {
            character.x = 0;
            moveCharacter.stop();

            const resultText = document.getElementById('result-text');
            if (isCorrect) {
                score++;
                resultText.textContent = `正解！スコア: ${score}`;
                shuffle(wrestlers);
                renderWrestlers();
            } else {
                resultText.textContent = `不正解！最終スコア: ${score}`;
                document.getElementById('tweet-button').style.display = 'block';
            }
            document.getElementById('result').style.display = 'block';
        }
    });
    moveCharacter.start();
});

// ツイートボタンのイベントリスナー
document.getElementById('tweet-button').addEventListener('click', () => {
    const tweetText = `私のスコアは${score}点です！ #ブラウザゲーム`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
});

shuffle(wrestlers);
renderWrestlers();
