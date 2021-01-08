/* 

    Kokervisie script
    for Accessibility Game

*/

var kokervisie = {

    // keep track of selected options
    selectedOptions: {},

    // keep time
    timer: new Timer(),
    score: 400,

    // INIT
    init() {
        console.log('init kokervisie');

        this.setupMouseDrag();
    },

    // close popup
    closePopUp() {
        $('#popup').removeClass('active');
    },

    setupMouseDrag() {
        var clicked = false, clickY, clickX;
        const content = $('#kokervisie');
        $(document).on({
            'mousemove': function(e) {
                clicked && updateScrollPos(e);
            },
            'mousedown': function(e) {
                clicked = true;
                clickY = e.pageY;
                clickX = e.pageX;
            },
            'mouseup': function() {
                clicked = false;
                content.css('cursor', 'grab');
            }
        });
        
        const updateScrollPos = function(e) {
            content.css('cursor', 'grabbing');
            content.css('user-select', 'none');
            content.scrollTop(content.scrollTop() + (clickY - e.pageY) * 0.05);
            content.scrollLeft(content.scrollLeft() + (clickX - e.pageX) * 0.05);
        }

        // based on method found in:
        // https://stackoverflow.com/questions/19743228/scroll-the-page-on-drag-with-jquery/19743358
        // SMALL BUG: safari doesn't want to show grabbing cursor
    },

    // open and close furniture page functions; called by buttons
    openPage(index) {
        $('.item-container').eq(index).addClass('open');
        $('#kokervisie').addClass('open');
    },
    closePage(index) {
        $('.item-container').eq(index).removeClass('open');
        $('#kokervisie').removeClass('open');
        // clear selected items
        this.selectedOptions = {};
    },
    // move between pages; called by arrow buttons
    previousItem() {
        const itemContainers = $('.item-container');
        let currentIndex = 0;
        // set all containers to not active
        itemContainers.each((index, item) => {
            if (item.id == 'active') currentIndex = index;
            item.id = '';
        });
        // set new item container to active
        itemContainers.eq(currentIndex-1).attr('id', 'active');

        // dots:
        const dots = $('#dots .dot');
        dots.removeClass('active');
        dots.eq(currentIndex-1).addClass('active');
    },
    nextItem() {
        const itemContainers = $('.item-container');
        let currentIndex = 0;
        // set all containers to not active
        itemContainers.each((index, item) => {
            if (item.id == 'active') currentIndex = index;
            item.id = '';
        });
        // set new item container to active
        itemContainers.eq((currentIndex+1) % (itemContainers.length)).attr('id', 'active');

        // dots:
        const dots = $('#dots .dot');
        dots.removeClass('active');
        dots.eq((currentIndex+1) % (itemContainers.length)).addClass('active');
    },

    // choice selector; called by .choice buttons
    selectOption(elem, option, choice) {
        const $elem = $(elem);

        // remove .selected class from siblings and add to this elem
        $elem.siblings().removeClass('selected');
        $elem.addClass('selected');

        // save selected choice
        this.selectedOptions[option] = choice;
    },
    // check options; called by confirm button
    checkOptions() {
        // get correct info from #correct-options and compare to selected options
        const correctOptions = JSON.parse($('#correct-options').html());
        const isCorrect = this.compare(correctOptions, this.selectedOptions);
        
        if (isCorrect) {
            showScore(this.calcScore());
        } else {
            alert('Verkeerde order'); // TODO: make popup
            this.score -= 50;
        }
    },
    // calculate score; used in checkOptions()
    calcScore() {
        const time = this.timer.stopAndGet();
        // reduce for each minute played
        this.score -= time * 150;

        return this.score;
    },

    // compare JSON objects
    compare(a, b){
        let flag = true;

        if(Object.keys(a).length == Object.keys(b).length){
            for(let key in a) { 
                if(a[key] == b[key]) {
                    continue;
                }
                else {
                    flag = false;
                    break;
                }
            }
        }
        else {
            flag = false;
        }

        return flag;
    }
}

kokervisie.init();

function unload() {
    kokervisie = undefined;
}