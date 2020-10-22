const allLevels = document.querySelectorAll('.level');
const startGameBtn = document.querySelector('.button');
const main = document.querySelector('.main');
const cardsBox = document.querySelector('.cards-box');

const chooseLevel = event => {
    allLevels.forEach((item) => item.classList.remove('level_active'));
    event.currentTarget.classList.add('level_active');
};

allLevels.forEach((item) => item.addEventListener('click', chooseLevel));

const getNumberCards = currentLevel => {
    switch (currentLevel) {
        case 'simple':
            cardsBox.classList.add('three-cards');
            return 3;
            break;
        case 'average':
            cardsBox.classList.add('six-cards');
            return 6;
            break;
        case 'difficult':
            cardsBox.classList.add('ten-cards');
            return 10;
            break;
    }
};

const createCards = currentLevelForStart => {
    for (let i = 0; i < currentLevelForStart; i++) {
        const container = document.createElement('div');
        const containerFluid = document.createElement('div');
        const card = document.createElement('div');
        const cardInner = document.createElement('div');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');

        container.classList.add('container');
        containerFluid.classList.add('container__fluid');
        card.classList.add('card');
        cardInner.classList.add('card__inner', 'card__inner_hover');
        cardFront.classList.add('card__front');
        cardBack.classList.add('card__back');

        cardsBox.append(container);
        container.append(containerFluid);
        containerFluid.append(card);
        card.append(cardInner);
        cardInner.append(cardFront);
        cardInner.append(cardBack);
    };
};

const createBug = currentLevelForStart => {
    let bug = Math.floor(Math.random() * currentLevelForStart);
    const cardsBack = document.querySelectorAll('.card__back');

    for (let i = 0; i < currentLevelForStart; i++) {
        if (i === bug) {
            cardsBack[i].classList.remove('card__back');
            cardsBack[i].classList.add('card__bug');
        }
    };
};

const deleteCards = () => {
    cardsBox.classList.remove('three-cards', 'six-cards', 'ten-cards');
    while (cardsBox.firstChild) {
        cardsBox.removeChild(cardsBox.firstChild);
    };
};

const flipCard = () => {
    let inGame = true;
    const allCards = document.querySelectorAll('.card__inner');
    allCards.forEach((item) => item.addEventListener('click', () => {
        if(inGame) {
            item.classList.add('flipped');
            item.classList.remove('card__inner_hover');
            inGame = false;
        } else {
            main.classList.remove('none');
            cardsBox.classList.add('none');
            inGame = true;
            deleteCards();
        };
    }));
};

const startGame = () => {
    let currentLevel = document.querySelector('.level_active').firstElementChild.getAttribute('id');
    let currentLevelForStart = getNumberCards(currentLevel);

    main.classList.add('none');
    cardsBox.classList.remove('none');

    createCards(currentLevelForStart);
    createBug(currentLevelForStart);
    flipCard();
};

startGameBtn.addEventListener('click', startGame);