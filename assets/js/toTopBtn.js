// back to top
$(function () {
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $("#back-to-top").fadeIn(1000);
            }
            else {
                $("#back-to-top").fadeOut(1000);
            }
        });
        $("#back-to-top").click(function () {
            $('body,html').animate({ scrollTop: 0 }, 500);
            return false;
        });
    });
});