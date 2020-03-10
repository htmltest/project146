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
        $(this).parent().find('.aperitive-video-player').html('<video src="' + $(this).attr('href') + '" autoplay="autoplay" controls="controls" tabindex="0"></video>');
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
            $('html, body').animate({'scrollTop': curBlock.find('.location-window').offset().top - $('header').height()});
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
            $('html, body').animate({'scrollTop': curBlock.find('.location-window').offset().top - $('header').height()});
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
        curWindow.find('.places-scheme-table-window-item.hover').removeClass('hover');
        $('.places-scheme-place.hover').removeClass('hover');
        $(this).addClass('hover');
        var curID = $(this).attr('data-id');
        $('.places-scheme-place[data-id="' + curID + '"]').addClass('hover');
    });

    $('body').on('mouseover', '.places-scheme-table', function(e) {
        var curWindow = $(this).find('.places-scheme-table-window');
        if (curWindow.find('.places-scheme-table-window-item.hover').length == 0) {
            curWindow.find('.places-scheme-table-window-item').eq(0).each(function() {
                $(this).addClass('hover');
                var curID = $(this).attr('data-id');
                $('.places-scheme-place[data-id="' + curID + '"]').addClass('hover');
                curWindow.find('.places-scheme-table-window-detail').html($(this).find('.places-scheme-table-window-item-detail').html());
            });
        } else {
            curWindow.find('.places-scheme-table-window-item.hover').each(function() {
                var curID = $(this).attr('data-id');
                $('.places-scheme-place[data-id="' + curID + '"]').addClass('hover');
            });
        }
    });

    $('body').on('mouseout', '.places-scheme-table', function(e) {
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
            e.preventDefault();
        }
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.participate input').change(function() {
        if ($('#participate-confirm').prop('checked')) {
            $('.form-info').html($('.form-template-info').html());
            $('.form-detail').addClass('open');
        } else {
            $('.form-info').html('');
            $('.form-detail').removeClass('open');
        }
    });

    $('#participate-confirm').each(function() {
        if ($('#participate-confirm').prop('checked')) {
            $('.form-info').html($('.form-template-info').html());
            $('.form-detail').addClass('open');
        } else {
            $('.form-info').html('');
            $('.form-detail').removeClass('open');
        }
    });

    $('body').on('change', '.form-checkbox-other .form-checkbox input', function() {
        var curInput = $(this);
        if (curInput.prop('checked')) {
            curInput.parents().filter('.form-checkbox-other').addClass('checked');
        } else {
            curInput.parents().filter('.form-checkbox-other').removeClass('checked');
        }
    });

    $('body').on('change', '.form-label-checkbox-other .form-label-checkbox input', function() {
        var curInput = $(this);
        if (curInput.prop('checked')) {
            curInput.parents().filter('.form-label-checkbox-other').addClass('checked');
        } else {
            curInput.parents().filter('.form-label-checkbox-other').removeClass('checked');
        }
    });

    $('body').on('change', '.form-avatar-upload input', function() {
        var curInput = $(this);
        var formData = new FormData($('.page-form-container form')[0]);
        $.ajax({
            type: 'POST',
            url: $('.form-avatar').attr('data-link'),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(data) {
                if (data.status == 'success') {
                    $('.form-avatar-preview').css({'background-image': 'url(' + data.path + ')'});
                }
            }
        });
    });

    var guestCount = 0;

    $('body').on('click', '.form-guest-add a', function(e) {
        guestCount++;
        var templateHTML = $('.form-template-guest').html();
        templateHTML = templateHTML.replace(/name="(.+?)"/g, 'name="guest[' + guestCount + '][$1]"');
        $('.form-guest-list').append('<div class="form-guest-item">' + templateHTML + '</div>');
        e.preventDefault();
    });

    $('body').on('change', '.form-label-checkbox-child input', function() {
        var curInput = $(this);
        var curGuest = curInput.parents().filter('.form-guest-item')
        if (curInput.prop('checked')) {
            curGuest.find('.form-child-alcohol').addClass('invisible');
        } else {
            curGuest.find('.form-child-alcohol').removeClass('invisible');
        }
    });

    $('body').on('click', '.form-guest-item .guest-remove', function(e) {
        var curItem = $(this).parents().filter('.form-guest-item');
        curItem.fadeOut(function() {
            curItem.remove();
        });
        e.preventDefault();
    });

    $('body').on('click', '.gallery-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.gallery-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.gallery-tab.active').removeClass('active');
            var curIndex = $('.gallery-menu ul li').index(curLi);
            $('.gallery-tab').eq(curIndex).addClass('active');
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

$(window).on('load resize scroll', function() {
    var curScroll = $(window).scrollTop();
    if (curScroll > 0) {
        $('html').addClass('header-fixed');
        var lastScroll = $('header').data('lastScroll');
        if (typeof (lastScroll) == 'undefined') {
            lastScroll = 0;
        }

        if (Math.abs(lastScroll - curScroll) > 5) {
            if (curScroll > lastScroll){
                $('header').addClass('header-up');
            } else {
                $('header').removeClass('header-up');
            }
            $('header').data('lastScroll', curScroll);
        }
    } else {
        $('html').removeClass('header-fixed header-up');
    }

    if (curScroll > $(window).height()) {
        $('.up-link').addClass('visible');
    } else {
        $('.up-link').removeClass('visible');
    }
});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = '171px';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.validate({
        ignore: ''
    });
}