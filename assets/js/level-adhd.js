/*

    Script for ADHD level
    Accessibility Game

*/

var adhd = {

    // vars
    $clock: $('#clock'),

    // get time at start of level
    startTime: new Date().getTime(),
    TOTAL_TIME: 90000, // 1.5 minutes in milliseconds

    clockInterval: null,

    // keep track of time
    time: 0,

    // wire order
    order: [],
    orderIndex: 0,

    // initialisation
    init() {

        console.log('init adhd');

        // first clock set
        this.clockInterval = setInterval(this.updateClock, 41);
        this.showPopUp('01:30');

        // add clues in order
        this.order = this.shuffle([0, 1, 2, 3, 4]);
        console.log(this.shuffle([0, 1, 2, 3, 4]));
        this.addOrder();

    },

    addOrder() {
        for (let i of this.order) {
            // lookup color and style from wires
            const $wire = $('#wires').children().eq(i);
            const str = 
                String($wire.attr('data-style')).replace('undefined', '')  + ' ' +
                String($wire.attr('data-color')).replace('undefined', '')  + ' | ';
            
            $('#order').append(str);
        }
    },

    // function called by bomb wire buttons
    cutWire(index) {
        if (index == this.order[this.orderIndex]) {

            // CORRECT WIRE
            $('#wires').children().eq(index).hide();

            this.orderIndex++;
            // if all snipped, win game
            if (this.orderIndex > this.order.length - 1)
                this.endGame()

        } else {

            // WRONG WIRE
            this.stopGame();

        }
    },


    // creating order

    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },

    // methods
    updateClock() {

        adhd.time = new Date(adhd.TOTAL_TIME - (new Date().getTime() - adhd.startTime));
        if (adhd.time > 0) {

            const str = 
                adhd.formatNumber(adhd.time.getMinutes()) +':'+ 
                adhd.formatNumber(adhd.time.getSeconds()) +':'+ 
                adhd.formatNumber(adhd.time.getMilliseconds(), 3);
            // update clock
            adhd.$clock.find('p').text(str);


            // POPUPS trigger at specific times
            if (adhd.time > 59000 && adhd.time < 61000 ) adhd.showPopUp('01:00');
            if (adhd.time > 29000 && adhd.time < 31000 ) adhd.showPopUp('00:30');

        } else {

            // fail state
            adhd.stopGame();

        }
    },

    // add zeroes to number to make it N long
    formatNumber(input, n = 2) {
        let str = '';
        for (let i = 0; i < (n - String(input).length); i++) {
            str += '0';
        }
        return str + input;
    },

    hidePopUp() {
        $('#popup').removeClass('active');
    },

    showPopUp(time = '00:30') {
        $('#popup').addClass('active');
        
        time = ' '+time+'!!';
        $('#time').text( $('#time').attr('data-original-text') + time);
    },

    // WIN GAME
    endGame() {
        console.log('you win');

        clearInterval(this.clockInterval);
        showScore(100 + (this.time.getSeconds() + this.time.getMinutes()*60) * 3.3); // calc score based on time left
    },

    // hide game and show explosion
    stopGame() {
        clearInterval(this.clockInterval);
        $('#in-game').empty();
        $('#fail').addClass('active');
    },

    retry() {
        // reload page on retry
        location.reload();
    }

};

adhd.init();

function unload() {
    delete adhd;
}