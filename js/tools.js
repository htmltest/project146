$(document).ready(function() {

    $('.welcome-days').each(function() {
        var today = new Date();
        var past  = new Date(2020, 04, 23);
        var diff = Math.floor(past.getTime() - today.getTime());
        var day = 1000 * 60 * 60 * 24;

        var days = Math.ceil(diff / day);

        $('.welcome-days span').html(days + ' ' + getDaysText(days));
    });

    $('.location-gallery').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        adaptiveHeight: true
    });

    $('body').on('click', '.aperitive-video-link', function(e) {
        $('.aperitive-video-player').html('');
        $(this).parent().addClass('start');
        $(this).parent().find('.aperitive-video-player').html('<iframe width="560" height="315" src="' + $(this).attr('href') + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        e.preventDefault();
    });

    $('body').on('mouseover', '.scheme-list ul li span, .scheme-content-map-area', function(e) {
        var curID = $(this).attr('data-id');
        $('.scheme-content-map-area[data-id="' + curID + '"]').addClass('hover');
        $('.scheme-content-point[data-id="' + curID + '"]').addClass('hover');
    });

    $('body').on('mouseout', '.scheme-list ul li span, .scheme-content-map-area', function(e) {
        $('.scheme-content-map-area').removeClass('hover');
        $('.scheme-content-point').removeClass('hover');
    });

    $('body').on('click', '.programs-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.programs-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.programs-tab.active').removeClass('active');
            var curIndex = $('.programs-menu ul li').index(curLi);
            $('.programs-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.programs-item-location-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.programs-item-location-inner.open').removeClass('open');
            curBlock.addClass('open');
        }
        e.preventDefault();
    });

    $('body').on('click', '.when-item-where-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.when-item-where.open').removeClass('open');
            curBlock.addClass('open');
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.programs-item-location-inner').length == 0) {
            $('.programs-item-location-inner.open').removeClass('open');
        }
        if ($(e.target).parents().filter('.when-item-where').length == 0) {
            $('.when-item-where.open').removeClass('open');
        }
    });

    $('body').on('click', '.location-window-btn-scroll', function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
        }
        $('.programs-item-location-inner.open').removeClass('open');
        $('.when-item-where.open').removeClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.menu-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.menu-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.menu-tab.active').removeClass('active');
            var curIndex = $('.menu-menu ul li').index(curLi);
            $('.menu-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('mouseover', '.places-scheme-table-window-item', function(e) {
        var curWindow = $(this).parents().filter('.places-scheme-table-window');
        curWindow.find('.places-scheme-table-window-detail').html($(this).find('.places-scheme-table-window-item-detail').html());
        var curID = $(this).attr('data-id');
        $('.places-scheme-place[data-id="' + curID + '"]').addClass('hover');
    });

    $('body').on('mouseout', '.places-scheme-table-window-item', function(e) {
        var curWindow = $(this).parents().filter('.places-scheme-table-window');
        curWindow.find('.places-scheme-table-window-detail').html('');
        $('.places-scheme-place.hover').removeClass('hover');
    });

    $('.places-scheme').each(function() {
        var curID = 0;
        $('.places-scheme-table-window-item').each(function() {
            var curItem = $(this);
            curItem.attr('data-id', curID);
            $('.places-scheme-places').append('<div class="places-scheme-place" data-id="' + curID + '" style="left:' + curItem.attr('data-left') + 'px; top:' + curItem.attr('data-top') + 'px"></div>');
            curID++;
        });
    });

    $('.team-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false
    });

    $('.guests-more-link a').click(function(e) {
        $('.guests').toggleClass('open');
        $('.guests-list-more').stop(true, true).slideToggle();
        e.preventDefault();
    });

    $('.footer-menu a, .confirm-link').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
        }
        e.preventDefault();
    });

});

function getDaysText(number) {
    var endings = Array('дней', 'день', 'дня');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}