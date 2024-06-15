document.addEventListener('DOMContentLoaded', () => {
    const wrestlers = [
        { name: "レスラー1", weight: 100 },
        { name: "レスラー2", weight: 90 },
        { name: "レスラー3", weight: 110 },
        { name: "レスラー4", weight: 85 },
        { name: "レスラー5", weight: 95 }
    ];

    let dragged;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createWrestlerElement(wrestler) {
        const div = document.createElement('div');
        div.className = 'wrestler';
        div.draggable = true;
        div.dataset.weight = wrestler.weight;
        div.textContent = `${wrestler.name} (${wrestler.weight}kg)`;
        return div;
    }

    function loadWrestlers() {
        const container = document.getElementById('wrestlers');
        container.innerHTML = '';
        shuffle(wrestlers);
        wrestlers.forEach(wrestler => {
            container.appendChild(createWrestlerElement(wrestler));
        });
    }

    loadWrestlers();

    document.addEventListener('dragstart', (event) => {
        dragged = event.target;
        event.target.style.opacity = 0.5;
    });

    document.addEventListener('dragend', (event) => {
        event.target.style.opacity = "";
    });

    document.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    document.addEventListener('dragenter', (event) => {
        if (event.target.className === 'wrestler') {
            event.target.style.background = "lightyellow";
        }
    });

    document.addEventListener('dragleave', (event) => {
        if (event.target.className === 'wrestler') {
            event.target.style.background = "";
        }
    });

    document.addEventListener('drop', (event) => {
        event.preventDefault();
        if (event.target.className === 'wrestler') {
            event.target.style.background = "";
            dragged.parentNode.removeChild(dragged);
            event.target.parentNode.insertBefore(dragged, event.target.nextSibling);
        }
    });

    document.getElementById('judgeButton').addEventListener('click', () => {
        const wrestlers = document.querySelectorAll('.wrestler');
        let correctOrder = true;

        for (let i = 0; i < wrestlers.length - 1; i++) {
            if (parseInt(wrestlers[i].dataset.weight) < parseInt(wrestlers[i + 1].dataset.weight)) {
                correctOrder = false;
                break;
            }
        }

        const result = document.getElementById('result');
        if (correctOrder) {
            result.textContent = '正解！新しいリストを表示します。';
            loadWrestlers();
        } else {
            result.textContent = '不正解。リスタートします。';
        }
    });
});
