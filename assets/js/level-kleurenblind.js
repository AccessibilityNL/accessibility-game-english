/*
    Javascript code for level:
        Kleurenblind memory

    Author: Bas de Bruin
    for: Stichting Accessibility
*/

var memory = {

    CARD_PAIRS: 6, // 6: 12 cards in total, pretty hard

    // get elems
    l: $('#kleurenblind'),

    // array of possible colors
    colors: [
        '#706231',
        '#443D29',
        '#615E51',
        '#736F5E',
        '#AB9D70',
        '#322A1B',
        '#94855A'
    ],
    colorIndex: 0,
    originalColor: '#21CEA0',

    // array of icons
    icons: [
        'icon_eye.svg',
        'icon_hand.svg',
        'icon_no_sound.svg',
        'icon_star.svg',
        'icon_stars.svg',
        'icon_play.svg'
    ],

    // array where memory cards are stored
    memoryCards: [],

    // state 
    state: 'FIRST_CARD',
    // round
    round: 1,
    // selected card
    selectedCard: undefined,
    // points
    points: 0,

    // SCORE
    timer: new Timer(),
    scoreVal: 420,


    // Memory Card Class
    MemoryCard: class {

        constructor(color = 'black', icon = false) {
            this.color = color;
            this.icon  = icon;

            this.correct = false;

            this.elem;

            memory.l.append(this.makeElem());

            this.elem.on('click', () => this.onClick());
        }

        makeElem() {
            // build memeory card element
            let e = '<button class="memory-card">';
            if (this.icon) {
                e += '<img src="' + this.icon + '">';
            }
            e += '</button>';

            // save in this.elem and return
            this.elem = $(e);
            return this.elem;
        }

        onClick() {

            if (this.correct !== true) {
                
                if (memory.state === 'FIRST_CARD') {

                    this.makeVisible();

                    memory.selectedCard = this;
                    memory.state = 'SECOND_CARD';

                }
                else if (memory.state === 'SECOND_CARD') {

                    
                    if (memory.selectedCard.color === this.color && memory.selectedCard !== this) { // CORRECT

                        this.makeVisible();
                        this.correct = true;
                        memory.state = 'FIRST_CARD';
                        memory.addPoint();
                        
                    } else { // INCORRECT

                        this.makeVisible();
                        memory.scoreVal -= 10;
                        console.log(memory.scoreVal);
                        // change back in 1 sec
                        memory.state = 'WAIT';
                        setTimeout(() => this.makeInvisible(), 1000);
                        
                    }
                    
                }
            }
        }

        makeVisible() {
            this.elem.css('background-color', this.color);
            if (this.icon) {
                this.elem.find('img').css('display', 'block');
            }
        }

        makeInvisible() {
            // make both this.elem and the selected card invisible
            this.elem.css('background-color', memory.originalColor);
            if (this.icon) {
                this.elem.find('img').css('display', 'none');
            }
            if (memory.selectedCard) {
                memory.selectedCard.elem.css('background-color', memory.originalColor);
                if (this.icon) {
                    memory.selectedCard.elem.find('img').css('display', 'none');
                }
            }
            memory.state = 'FIRST_CARD';
        }

    },

    // start the first round (start of level)
    setupFirstRound() {
        // Make the memory cards
        for (let i = 0; i < this.CARD_PAIRS; i++) {
            this.memoryCards[i*2] =     new this.MemoryCard(this.colors[this.colorIndex]);
            this.memoryCards[(i*2)+1] = new this.MemoryCard(this.colors[this.colorIndex++]);
        }

        // Shuffle elements
        $( function() {
            let divs = memory.l.children();
            while (divs.length) {
                memory.l.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
            }
        });
    },

    // show stage 2 intro
    setupInBetween() {
        // remove cards
        fadeOut(memory.l, () => {
            memory.l.empty();
            // show explaination text bewteen rounds
            fadeIn('#in-between');
            // update label above level
            $('#title span').toggleClass('active')
        });
    },

    // start second stage
    setupSecondRound() {

        this.points = 0;
        this.round++;
        console.log('Second Round');

        fadeOut('#in-between', () => {
            fadeIn(memory.l, undefined, 'flex');
        });

        this.colorIndex = 0;
        // Make the memory cards
        for (let i = 0; i < this.CARD_PAIRS; i++) {
            let icon = '/assets/images/levels/' + this.icons[this.colorIndex];

            this.memoryCards[i*2] =     new this.MemoryCard(this.colors[this.colorIndex]  , icon);
            this.memoryCards[(i*2)+1] = new this.MemoryCard(this.colors[this.colorIndex++], icon);
        }

        // Shuffle elements
        $( function() {
            let divs = memory.l.children();
            while (divs.length) {
                memory.l.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
            }
        });

    },


    addPoint() {
        // add point
        // end if all points counted
        if (this.points < this.CARD_PAIRS-1) {

            this.points++;

        } else if (this.round == 1) {

            this.setupInBetween();

        } else {

            // FINISH
            showScore(this.calcScore());

        }
    },

    // calculate the score based on timer and incorrect cardflips
    calcScore() {
        const timerVal = this.timer.stopAndGet();

        console.log(this.score, timerVal);
        // timer in minutes, if below 0.6 minutes, dont remove score
        this.scoreVal -= timerVal > 0.6 ? timerVal * 50 : 0;

        return Math.round(this.scoreVal);
    }
}; // end of memory {}

function unload() {
    memory = undefined;
}

// --- GO ---
memory.setupFirstRound();