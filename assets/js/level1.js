/*
    Javascript code for level:
        Kleurenblind memory

    Author: Bas de Bruin
    for: Stichting Accessibility
*/

const CARD_PAIRS = 4;

// get elems
let l = $('#level');

// array of possible colors
const colors = [
    '#706231',
    '#443D29',
    '#615E51',
    '#736F5E',
    '#AB9D70',
    '#322A1B',
    '#94855A'
]
let colorIndex = 0;
const originalColor = '#21CEA0';

// array where memory cards are stored
let memoryCards = [];

// state 
let state = 'FIRST_CARD';
// round
let round = 1;
// selected card
let selectedCard;
// points
let points = 0;


// Memory Card Class
class MemoryCard {

    constructor(color = 'black', icon = false) {
        this.color = color;
        this.icon  = icon;

        this.correct = false;

        this.elem;

        l.append(this.makeElem());

        this.elem.on('click', () => this.onClick());
    }

    makeElem() {
        // build memeory card element
        let e = '<span class="memory-card">';
        if (this.icon) {
            e += '<img src="' + this.icon + '">';
        }
        e += '</span>';

        // save in this.elem and return
        this.elem = $(e);
        return this.elem;
    }

    onClick() {

        if (state === 'FIRST_CARD') {

            this.makeVisible();
            console.log('first card');

            selectedCard = this;
            state = 'SECOND_CARD';

        }
        else if (state === 'SECOND_CARD') {

            // correct
            if (selectedCard.color === this.color && selectedCard !== this) {

                this.makeVisible();
                this.correct = true;
                state = 'FIRST_CARD';
                addPoint();

                console.log('second card, correct');
                
            } else {

                this.makeVisible();
                // change back in 1 sec
                state = 'WAIT';
                console.log('second card, incorrect');
                setTimeout(() => this.makeInvisible(), 1000);
                
            }
            
        }
    }

    makeVisible() {
        this.elem.css('background-color', this.color);
    }

    makeInvisible() {
        this.elem.css('background-color', originalColor);
        if (selectedCard) {
            selectedCard.elem.css('background-color', originalColor);
        }
        state = 'FIRST_CARD';
    }

}

// GO
setupFirstRound();


function setupFirstRound() {
    // Make the memory cards
    for (let i = 0; i < CARD_PAIRS; i++) {
        memoryCards[i*2] =     new MemoryCard(colors[colorIndex]);
        memoryCards[(i*2)+1] = new MemoryCard(colors[colorIndex++]);
    }

    // Shuffle elements
    $( function() {
        let divs = l.children();
        while (divs.length) {
            l.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    });
}

function setupSecondRound() {

    points = 0;
    round++;
    console.log('Second Round');

    l.empty();

    colorIndex = 0;
    // Make the memory cards
    for (let i = 0; i < CARD_PAIRS; i++) {
        let icon = '/assets/images/index/icon_eye.svg';

        memoryCards[i*2] =     new MemoryCard(colors[colorIndex]  , icon);
        memoryCards[(i*2)+1] = new MemoryCard(colors[colorIndex++], icon);
    }

    // Shuffle elements
    $( function() {
        let divs = l.children();
        while (divs.length) {
            l.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    });

    // update label above level
    $('#title').html('Met iconen:')

}


function addPoint() {
    // add point
    // end if all points counted
    if (points < CARD_PAIRS-1) {

        points++;

    } else if (round == 1) {

        setupSecondRound();

    } else {

        // redirect, end of level
        console.log("Redirecting to Outro page")
        swup.loadPage({
            url: window.location.href.replace('/play/', '/outro/')
        });

    }
}

function unload() {

    delete memoryCards;
    delete MemoryCard;

}