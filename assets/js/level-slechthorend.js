/* 

    Dyslexie level script
    for Accessibility Game

*/

var doof = {

    init() {},

    //score
    score: 400,
    timer: new Timer(),

    checkQuestions() {
        let correct = true;
        // check each input field and select
        $('#questions').find('select, input[type=field]').each((_, q) => {

            if (q.value.toLowerCase() !== reverse($(q).attr('data-correct')).toLowerCase()) {  // incorrect

                correct = false;
                $(q).addClass('incorrect');

                // reduce score for each wrong answer
                this.score -= 10;

                // add incorrect class to corresponding label
                $('#questions label[for=' + $(q).attr('id') + ']').addClass('incorrect');

            } else { // correct

                // remove incorrect class
                $(q).removeClass('incorrect');
                // remove incorrect class from corresponding label
                $('#questions label[for=' + $(q).attr('id') + ']').removeClass('incorrect');

            }

        });

        // go to next page if all questions are correct
        if (correct) {
            showScore(this.calcScore()); 

        } else {
            // play incorrect buzzer if incorrect
            globalSounds.incorrect.play();
        }
    },

    // calculate score
    calcScore() {
        this.score -= this.timer.stopAndGet() * 70;
        return this.score;
    }

}

// GO
doof.init();

// Delete after level is complete
function unload() {
    doof = undefined;
}