/*
    Javascript code for level:
        Kleurenblind memory

    Author: Bas de Bruin
    for: Stichting Accessibility
*/

console.log('Starting level1 script');

// get elems
let l = $('#level');

// 
let onFirstCard = true;

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

// array where memory cards are stored
let memoryCards = [];

let selectedCard;


// Make the memory cards
for (let i = 0; i < 4; i++) {
    memoryCards[i] = new MemoryCardPair();
}



// MemoryCardPair class
function MemoryCardPair(hasIcon = false) {

    const id = colorIndex;

    let correct = false;

    let color;
    if (colorIndex < colors.length) {
        color = colors[colorIndex];
        colorIndex++;
    } else {
        throw new Error('Memory Cards: no colors left');
    }

    // make element
    // start elem
    let elem = `<div class="memory-card id-${id}">`;
    // add icon if hasIcon
    if (hasIcon) {
        elem += '<img src="nothing" alt="icon">'
    }
    // close elem
    elem += '</div>';
    // and make it a jquery elem
    elem = $(elem);

    // add to #level
    l.append(elem);
    l.append(elem);

    // on click
    elem.on('click', event => {

        if (onFirstCard) {

            selectedCard = this;
            console.log(this);
            elem.css('background-color', color);

            onFirstCard = false;

        } else {

            elem.css('background-color', color);
            onFirstCard = true;
            if (selectedCard == this && !correct) {

                // correct
                correct = true;
                //give point

            } else {

                // incorrect

            }

        }

    });
}