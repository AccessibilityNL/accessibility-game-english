/*

    Generates Score Stars element
    for Accessibility Game

*/

function showScore(score = 0) {

    console.log('showing score');
    const maxScore = 400;
    // limit score between 0 and maxScore
    score = Math.round(Math.max(Math.min(score, maxScore), 0));

    // show title and subtitle based on how good the player did
    let howWell = 0;
    if (score >= 100) howWell = 1;
    if (score >= 300) howWell = 2;
    $('#score-title').children().eq(howWell == 0 ? 0 : 1).css('display', 'block');
    $('#score-subtitle').children().eq(howWell).css('display', 'block');

    // update progress
    $('#process-label').html('Score: ' + score + ' / ' + maxScore);
    $('#process').attr('value', score);
    // label below progress bar (update text and position)
    $('#score-label').html(score);
    $('#score-label').css( 'margin-left', score > 10 ? (score/maxScore)*100 + '%' : '1rem' );

    // hide next button if score too low
    if (score < 100)
        $('#score-next-button').css('display', 'none');

    // show it
    $('#score-background').css('display', 'flex');

    // play it
    if (score < 100) 
        globalSounds.fail.play();
    else
        globalSounds.win.play();

    // animate it (remove animation class)
    setTimeout(() => { $('#score').removeClass('is-animating') }, 100);

}


function loadNextPage() {
    swup.loadPage({
        url: window.location.href.replace('/play/', '/outro/')
    });
}

function reloadPage() {
    location.reload();
}