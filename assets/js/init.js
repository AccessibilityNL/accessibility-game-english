//-script.
// load and setup swup
let swup;
$(document).ready(()=>{
    swup = new Swup({
        plugins: [new SwupScrollPlugin()]
    });

    // unload assets if in global scope
    swup.on('willReplaceContent', () => {
        try { unload(); delete unload } catch { console.log('Couldnt find unload script') }
    });

    // look for script with data-load-script and exec
    swup.on('contentReplaced', loadScripts)
});


$(document).on('DOMContentLoaded', loadScripts);
function loadScripts() {
    console.log('looking for scripts');

    if ($('body *[data-load-script]'))
        $.getScript($('body *[data-load-script]').attr('data-src'));

    try { swup.scrollTo(document.body, 0); } catch {}
}