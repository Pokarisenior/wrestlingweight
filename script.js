document.addEventListener('DOMContentLoaded', () => {
    let dragged;

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
            shuffleWrestlers();
        } else {
            result.textContent = '不正解。リスタートします。';
        }
    });

    function shuffleWrestlers() {
        const wrestlers = document.querySelectorAll('.wrestler');
        const wrestlersArray = Array.from(wrestlers);
        for (let i = wrestlersArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wrestlersArray[i], wrestlersArray[j]] = [wrestlersArray[j], wrestlersArray[i]];
        }
        const wrestlersContainer = document.getElementById('wrestlers');
        wrestlersContainer.innerHTML = '';
        wrestlersArray.forEach(wrestler => wrestlersContainer.appendChild(wrestler));
    }
});
