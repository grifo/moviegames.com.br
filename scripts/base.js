;(function($){

    var more = $('#supported-devices')

    $('.see-all').click(function(e){
        console.log('fui')
        e.preventDefault()
        console.log(e.target)
        more.toggleClass('vhidden')
    })

    var mouseout_delay = 0

    more.click(function(){
        more.addClass('vhidden')
    }).mouseout(function(){
        mouseout_delay = setTimeout(function(){
            more.addClass('vhidden')
        }, 3000)
    }).mouseover(function(){
        clearTimeout(mouseout_delay)
    })

})(jQuery)

jQuery(window).load(function(){
    var $ = jQuery

    var phones = $('#phones img')
      , j = 0
      , w = 300 //px
      , interval = 5000

    phone_list = $('<div id="phone-list"/>').css({
        position: 'absolute'
      , top: 0
      , left: 0
      , width: phones.length * w
      , height: phones.eq(0).height()
    })

    // make each image occupy "w" width
    phones.css('margin', function(){

        var self = $(this)
          , width = self.width()
          , m = parseInt(w - width, 10)/2 + 'px'

        return '0 '+m+' 0 '+m

    }).show()

    phones.wrapAll(phone_list)
    phone_list = $('#phone-list')

    var body = document.body
      , transition
      , transitionString = 'left .5s ease-in-out'

    transition = (
          body.style.webkitTransition !== undefined ? 'webkitT'
        : body.style.mozTransition !== undefined ? 'mozT'
        : body.style.msTransition !== undefined ? 'msT'
        : 't'
    ) + 'ransition'

    phone_list.css(transition, transitionString)

    function ending(){
        // move to end of list
        phone_list
            .css(transition, 'none')
            .css('left', 0)
            .children().eq(0).appendTo(phone_list)
        setTimeout(nextImage, interval)
    }
    
    var with_trans = function nextImage(){
        phone_list.css(transition, transitionString)
        phone_list.css({ left: -w })
        setTimeout(ending, 500)
    }

    var without_trans = function nextImage(){
        phone_list.animate({ left: -w }, 500, ending)
    }

    nextImage = Modernizr.csstransitions ? with_trans : without_trans;

    setTimeout(nextImage, interval)

})