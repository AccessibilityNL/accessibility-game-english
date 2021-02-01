/*

    Blind level script
    for Accessibility Game

*/


var blind = {
    // Vars
    $content: $('#content'),

    // keep track of focussed element
    $focusElem: undefined,

    // score and timer
    score: 400,
    timer: new Timer(),

    // Methods
    // Init
    init() {
        // for each in content
        this.$content.find('*').each( (_, elem) => { 

            const $elem = $(elem);

            // make focussable and attach handler
            // checks if just text or html element parent
            if ($elem.children().length === 0)  {
                $elem.attr('tabindex', '0');
                $elem.focus(() => blind.onFocus($elem));
            }
            else {
                const child = $elem.children().eq(0);
                child.attr('tabindex', '0');
                child.focus(() => blind.onFocus(child));
                // add Enter click handler
            }

        });

        // attach onKey function
        $(document).on('keydown', this.onKey);

        // TODO: detect swipes on mobile
        // for now:
        if ($(window).width() < 400) {
            if (confirm("This level does not work on mobile because you need a keyboard. \nDo you want to skip this level?")) {
                showScore('100');
            }
        }

        // welcome player
        this.speak($('#page1_intro_text').html());
    },

    // functions for page2:
    page2: {
        // setting up page 2
        init() {
            blind.speak($('#page1_submit_text').html());
            $('#page1').removeClass('active');
            $('#page2').addClass('active');
        },

        radioButton: true,
        // emulating radio buttons
        setRadio(value) {
            this.radioButton = value;
        },

        // unlabeled confirm button
        confirm() {
            if (this.checkQuestions()) {
                blind.speak($("#page2_submit_text").html());
                blind.page3.init();
                console.log('correct');
            }
            else {
                blind.speak($('#page2_submit_incorrect_text').html());
                console.log('incorrect');
            }
        },

        //check inputs
        checkQuestions() {
            let correct = true;
            $('#page2 input').each( (_, e) => {
                if (e.value === "") correct = false;
            });
            return correct;
        },

        // unlabeled clear button
        clearForm() {
            // set input to empty
            $('#page2 input').val('');
            this.radioButton = true;

            blind.speak($("#page2_clear_text").html());
        }

    },

    page3: {
        init() {
            // show page 3
            $('#page2').removeClass('active');
            $('#page3').addClass('active');
        },

        // radio button, chooses between retry or end level
        radioButton: true,
        setRadio(value) {
            this.radioButton = value;
        },

        // activated confirm button
        confirm() {
            if (this.radioButton) {
                // refresh if chosen to retry
                location.reload();
            } else {
                // end level and show score
                showScore(blind.calcScore());
            }
        }
    },

    // Handle focus
    onFocus(elem) {
        // speak
        // if no html content, read title attribute
        speechSynthesis.cancel();
        if (elem.html() !== "") {
            this.speak(elem.html());
        }
        else {
            // if input, also read value
            if (elem.prop('tagName') === 'INPUT')
                this.speak(elem.attr('title') + '' + elem.val())
            else
                this.speak(elem.attr('title'));
        }
        // set current elem
        this.$focusElem = $(elem);
        console.log(this.$focusElem);
    },

    // speak every key pressed
    onKey(key) {
        // speak
        let keyName = key.key;
        switch(keyName) {
            case ' ': keyName = 'space';    break
            case '.': keyName = 'dot';      break
            case ',': keyName = 'comma';     break
            case ';': keyName = 'semicolon'; break
        }
        blind.speak(String(keyName));

        // check for Enter input handler and exec
        if (keyName === "Enter" && blind.$focusElem.attr('data-confirm')) {
            eval( blind.$focusElem.attr('data-confirm') );
        }
    },

    // Speaks string using SpeechSynthesis
    speak(str) {
        const utterance = new SpeechSynthesisUtterance(str);
        utterance.lang = 'en-GB';
        speechSynthesis.speak(utterance);
    },

    // calculate score
    calcScore() {
        return this.score - (this.timer.stopAndGet() * 50);
    }
};

blind.init();

function unload() {
    $(document).off('keydown');
    blind = undefined;
}