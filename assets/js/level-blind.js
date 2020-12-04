/*

    Blind level script
    for Accessibility Game

*/


var blind = {
    // Vars
    $content: $('#content'),
    // swipe detector
    //hammer: new Hammer($('#blind-background')[0]),

    // Methods
    // Init
    init() {
        // for each in content
        this.$content.find('*').each( (index, elem) => { 

            $(elem).focus(() => blind.onFocus(elem));

        });

        // TODO: detect swipes on mobile
        // for now:
        if ($(window).width() < 400) {
            if (confirm("Dit level werkt nog niet op mobiel, omdat een toetsenbord nodig is. \nWil je dit level overslaan?")) {
                showScore('100');
            }
        }
    },

    // Handle focus
    onFocus(elem) {
        console.log('focus');
        this.speak($(elem).html());
    },

    onSwipe(event) {
        console.log('swipe', event);
        $('#blind-background').css('background', 'red');
    },

    // Speaks string using SpeechSynthesis
    speak(str) {
        const utterance = new SpeechSynthesisUtterance(str);
        speechSynthesis.speak(utterance);
    }
};

blind.init();

function unload() {
    delete blind;
    delete Hammer;
}