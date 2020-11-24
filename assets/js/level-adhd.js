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

    // initialisation
    init: function() {

        console.log('initting adhd');

        // first clock set
        setInterval(this.updateClock, 41);
        this.showPopUp('01:30');

    },

    // methods
    updateClock: function() {

        const time = new Date(adhd.TOTAL_TIME - (new Date().getTime() - adhd.startTime));
        if (time > 0) {

            const str = 
                adhd.formatNumber(time.getMinutes()) +':'+ 
                adhd.formatNumber(time.getSeconds()) +':'+ 
                adhd.formatNumber(time.getMilliseconds(), 3);
            // update clock
            adhd.$clock.find('p').text(str);


            // POPUPS trigger at specific times
            if (time > 59000 && time < 61000 ) adhd.showPopUp('01:00');
            if (time > 29000 && time < 31000 ) adhd.showPopUp('00:30');

        } else {

            // fail state
            adhd.stopGame();

        }
    },

    // add zeroes to number to make it N long
    formatNumber: function(input, n = 2) {
        let str = '';
        for (let i = 0; i < (n - String(input).length); i++) {
            str += '0';
        }
        return str + input;
    },

    hidePopUp: function() {
        $('#popup').removeClass('active');
    },

    showPopUp: function(time = '00:30') {
        $('#popup').addClass('active');
        
        time = ' '+time+'!!';
        $('#time').text( $('#time').attr('data-original-text') + time);
    },

    // hide game and show explosion
    stopGame: function() {
        $('#in-game').empty();
        $('#fail').addClass('active');
    },

    retry: function() {
        // reload page on retry
        location.reload();
    }

};

adhd.init();

function unload() {
    delete adhd;
}