//-script.
// load and setup swup
let swup;
$(document).ready(()=>{
    swup = new Swup({
        //plugins: [new SwupScriptsPlugin({head: false, body: true, optin: true})]
    });

    // unload assets if in global scope
    swup.on('willReplaceContent', () => {
        try { unload(); console.log('unloaded last script') } catch {}
    })

    // look for script with data-load-script and exec
    swup.on('contentReplaced', loadScripts)
});

$(document).on('DOMContentLoaded', loadScripts);

function loadScripts() {
    console.log('looking for scripts');

    if ($('body *[data-load-script]'))
        $.getScript($('body *[data-load-script]').attr('data-src'));
}