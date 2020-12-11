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

            const $elem = $(elem);

            // make focussable and attach handler
            if ($elem.children().length === 0)  {
                $elem.attr('tabindex', '0');
                $elem.focus(() => blind.onFocus($elem));
            }
            else {
                const child = $elem.children().eq(0);
                child.attr('tabindex', '0');
                child.focus(() => blind.onFocus(child));
                console.log('Added child: ', child);
            }

        });

        // attach onKey function
        $(document).on('keydown', this.onKey);

        // TODO: detect swipes on mobile
        // for now:
        if ($(window).width() < 400) {
            if (confirm("Dit level werkt nog niet op mobiel, omdat een toetsenbord nodig is. \nWil je dit level overslaan?")) {
                showScore('100');
            }
        }

        // welcome player
        this.speak('Welkom bij het Blind level, gebruik de Tab-toetsen om te beginnen');
    },

    // Handle focus
    onFocus(elem) {
        console.log('focus', elem);
        speechSynthesis.cancel();
        if (elem.html() !== "") {
            this.speak(elem.html());
        }
        else {
            this.speak(elem.attr('title'));
        }
    },

    onSwipe(event) {
        console.log('swipe', event);
        $('#blind-background').css('background', 'red');
    },

    // speak every key pressed
    onKey(key) {
        let keyName = key.key;
        switch(keyName) {
            case ' ': keyName = 'Spatie';    break
            case '.': keyName = 'punt';      break
            case ',': keyName = 'comma';     break
            case ';': keyName = 'puntcomma'; break
        }
        console.log('Pressed key: ', keyName);
        blind.speak(String(keyName));
    },

    // Speaks string using SpeechSynthesis
    speak(str) {
        const utterance = new SpeechSynthesisUtterance(str);
        utterance.lang = 'nl';
        speechSynthesis.speak(utterance);
    }
};

blind.init();

function unload() {
    delete blind;
}