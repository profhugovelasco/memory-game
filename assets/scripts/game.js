let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    carmaker: [
        "audi",
        "bmw",
        "chevrolet",
        "ford",
        "hyundai",
        "jeep",
        "kia",
        "renault",
        "toyota",
        "volkswagen"],

    cards: null,

    setCard: function (id) {
        let card = this.cards.filter((card) => card.id === id)[0];

        if ((card.flipped) || (this.lockMode)) {
            return false;
        } else if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function () {

        return this.cards.filter((card) => !card.flipped).length === 0;
    },

    createCardFromCarmaker: function () {
        this.cards = [];

        this.carmaker.forEach((carmaker) => {
            this.cards.push(this.createPairFromCarmaker(carmaker));
        });
        this.cards = this.cards.flatMap((pair) => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromCarmaker: function (brand) {
        return [{
            id: this.createId(brand),
            icon: brand,
            flipped: false,
        }, {
            id: this.createId(brand),
            icon: brand,
            flipped: false,
        }];
    },

    createId: function (id) {
        return id + "_" + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },

};

