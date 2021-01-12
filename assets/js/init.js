//-script.
// load and setup swup
let swup;
let globalSounds = {};
$(document).ready(()=>{
    swup = new Swup({
        plugins: [new SwupScrollPlugin(), new SwupA11YPlugin()]
    });

    // unload assets if in global scope
    swup.on('willReplaceContent', () => {
        try { unload(); delete unload } catch { }
    });

    // look for script with data-load-script and exec
    swup.on('contentReplaced', loadScripts);

    // init sounds
    loadGlobalSounds();
});


$(document).on('DOMContentLoaded', loadScripts);
function loadScripts() {
    if ($('body *[data-load-script]'))
        $.getScript($('body *[data-load-script]').attr('data-src'));

    try { swup.scrollTo(document.body, 0); } catch {}
}

// function for loading global win and fail sounds
function loadGlobalSounds() {
    if (Howl) {
        globalSounds.win = new Howl({ 
            src: '/assets/sounds/win.mp3'
        });
        globalSounds.fail = new Howl({ 
            src: '/assets/sounds/fail.mp3'
        });
        globalSounds.incorrect = new Howl({
            src: '/assets/sounds/incorrect.mp3'
        })
    }
}

// Utility functions used by all levels

// simple reverse string function
const reverse = str => String(str).split("").reverse().join("");


// fade in and out transition functions
function fadeOut(elem, callback = undefined, className = 'animating animating-out', time = 500) {
    const $elem = $(elem);

    console.log('fading out: ', elem);

    $elem.addClass(className);
    setTimeout(() => {
        $elem.css('display', 'none');
        // callback for when transition is done
        if (callback) callback();
    }, time);
}

function fadeIn(elem, callback = undefined, displayType = 'block', className = 'animating animating-in', time = 500) {
    const $elem = $(elem);

    console.log('fading in: ', elem);

    $elem.css('display', displayType);
    $elem.addClass(className);
    setTimeout(() => {
        $elem.removeClass(className + ' animating-out');
        console.log('fadeIn: removing animating class');
        // callback for when transition is done
        if (callback) setTimeout(callback, time);
    }, 50);
    
}