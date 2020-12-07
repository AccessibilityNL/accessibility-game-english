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
        try { unload(); delete unload } catch {}
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
    }
}

// simple reverse string function
const reverse = str => String(str).split("").reverse().join("");