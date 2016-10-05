jQuery(document).ready(function($) {



    // mobile nav
    $('#menutoggle').click(function() {
        $('nav#primary, div#content').toggleClass('reveal');
        $('i',this).toggleClass('menu_lines').toggleClass('close');

    });

    // Check to see if the window is top if not then display button
    $(window).scroll(function() {
        var headerheight = $('header').height();
        if ($(this).scrollTop() > headerheight) { //set to the header height
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });

    // Scroll to top on mobile
    $('#scroll').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

});