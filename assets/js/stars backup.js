/*

    Generates Score Stars element
    for Accessibility Game

*/

function showScore(score, maxScore = 400, text = {
            title: 'Level behaald!', 
            subtitle: 'Goed gedaan.',
            retry: 'Probeer opnieuw',
            next: 'Ga verder'
        }) {

    console.log('showing score');

    // make elem
    let elemStr = `
        <div id="score-background">

        <div id="score" class="is-animating">
            <h2>${text.title}</h2>
            <h4>${text.subtitle}</h4>

            <div class="score-columns">
                ${ makeStars([ 100, 200, 300 ]) }
            </div>

            <label class="hidden"  for="process">Score: ${score}/${maxScore}</label>
            <progress id="process" min="0" max=${maxScore} value=${score}>${score}</progress>
            <h3 class="score-label" style="margin-left: ${score/maxScore*100}%; transform: translateX(-50%)">${score}</h3>

            <div class="container buttons">
                <button class="button light back" onclick="reloadPage()">${text.retry}</button>
                <button class="button" onclick="loadNextPage()">${text.next}</button>
            </div>
        </div>

        </div>
    `;

    // add to webpage
    $('main').append(elemStr);
    setTimeout(() => { $('#score').removeClass('is-animating') }, 100);

    function makeStars(arr) {

        return arr.map(a => `
            <div class="star">
                <img src='/assets/images/levels/icon_star_blue.svg' alt='Ster'>
                <p>${a}</p>
            </div>
        `).join('\n');

    }

}


function loadNextPage() {
    swup.loadPage({
        url: window.location.href.replace('/play/', '/outro/')
    });
}

function reloadPage() {
    location.reload();
}