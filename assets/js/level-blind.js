/*

    Blind level script
    for Accessibility Game

*/


var blind = {
    // Vars
    $content: $('#content'),

    // Methods
    // Init
    init() {
        // for each in content
        this.$content.find('*').each( (index, elem) => { 

            $(elem).focus(() => blind.onFocus(elem));

        });
    },

    // Handle focus
    onFocus(elem) {
        console.log('focus');
        this.speak($(elem).html());
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
}