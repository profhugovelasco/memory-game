const FRONT = "card_front", BACK = "card_back", CARD = "card", ICON = "icon";
let gameOverLayer = document.getElementById("gameOver");

startGame();

function startGame() {

    game.createCardFromCarmaker()
    initializeCards();

}

function initializeCards() {
    let gameBoard = document.getElementById("boardGame");
    gameBoard.innerHTML = "";

    game.cards.forEach((card) => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement("div");
    let iconElement = document.createElement("img");
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        iconElement.src = "assets/img/" + card.icon + ".svg";
        iconElement.classList.add(ICON);
    } else {
        iconElement.src = "assets/img/waze.svg";
    }

    cardElementFace.appendChild(iconElement);
    element.appendChild(cardElementFace);

}

function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                        gameOverLayer.style.display = "flex";
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();
                }, 1000);
            }

        }
    }
};

function restart() {
    game.clearCards();
    startGame();
    gameOverLayer.style.display = "none";
}