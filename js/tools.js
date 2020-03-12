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
        var curTable = $(this).parents().filter('.places-scheme-table');
        var curWindow = $(this).parents().filter('.places-scheme-table-window');
        curWindow.find('.places-scheme-table-window-detail').html($(this).find('.places-scheme-table-window-item-detail').html());
        curWindow.find('.places-scheme-table-window-item.hover').removeClass('hover');
        $('.places-scheme-table-place.hover').removeClass('hover');
        $(this).addClass('hover');
        var curID = $(this).attr('data-id');
        curTable.find('.places-scheme-table-place[data-id="' + curID + '"]').addClass('hover');
    });

    $('body').on('mouseover', '.places-scheme-table-place', function(e) {
        var curPlace = $(this);
        var curTable = curPlace.parents().filter('.places-scheme-table');
        var curWindow = curTable.find('.places-scheme-table-window');
        var curID = curPlace.attr('data-id');
        var curItem = curWindow.find('.places-scheme-table-window-item[data-id="' + curID + '"]');
        curWindow.find('.places-scheme-table-window-detail').html(curItem.find('.places-scheme-table-window-item-detail').html());
        curWindow.find('.places-scheme-table-window-item.hover').removeClass('hover');
        $('.places-scheme-table-place.hover').removeClass('hover');
        curItem.addClass('hover');
        curTable.find('.places-scheme-table-place[data-id="' + curID + '"]').addClass('hover');
    });

    $('body').on('mouseover', '.places-scheme-table', function(e) {
        var curTable = $(this);
        var curWindow = $(this).find('.places-scheme-table-window');
        if (curWindow.find('.places-scheme-table-window-item.hover').length == 0) {
            curWindow.find('.places-scheme-table-window-item').eq(0).each(function() {
                $(this).addClass('hover');
                var curID = $(this).attr('data-id');
                curTable.find('.places-scheme-table-place[data-id="' + curID + '"]').addClass('hover');
                curWindow.find('.places-scheme-table-window-detail').html($(this).find('.places-scheme-table-window-item-detail').html());
            });
        } else {
            curWindow.find('.places-scheme-table-window-item.hover').each(function() {
                var curID = $(this).attr('data-id');
                curTable.find('.places-scheme-table-place[data-id="' + curID + '"]').addClass('hover');
            });
        }
    });

    $('body').on('mouseout', '.places-scheme-table', function(e) {
        $('.places-scheme-table-place.hover').removeClass('hover');
    });

    $('.places-scheme-table').each(function() {
        var curTable = $(this);
        var curID = 0;
        curTable.find('.places-scheme-table-window-item').each(function() {
            var curItem = $(this);
            curItem.attr('data-id', curID);
            curTable.find('.places-scheme-table-places').append('<div class="places-scheme-table-place" data-id="' + curID + '" style="left:' + curItem.attr('data-left') + 'px; top:' + curItem.attr('data-top') + 'px"></div>');
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

    $('.nav-list a, .footer-menu a, .confirm-link').click(function(e) {
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
            curInput.parents().filter('.form-checkbox-other').find('.form-input input').addClass('required');
        } else {
            curInput.parents().filter('.form-checkbox-other').removeClass('checked');
            curInput.parents().filter('.form-checkbox-other').find('.form-input input').removeClass('required');
        }
    });

    $('body').on('change', '.form-label-checkbox-other .form-label-checkbox input', function() {
        var curInput = $(this);
        if (curInput.prop('checked')) {
            curInput.parents().filter('.form-label-checkbox-other').addClass('checked');
            curInput.parents().filter('.form-label-checkbox-other').find('.form-input input').addClass('required');
        } else {
            curInput.parents().filter('.form-label-checkbox-other').removeClass('checked');
            curInput.parents().filter('.form-label-checkbox-other').find('.form-input input').removeClass('required');
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
                $('.form-avatar-upload label.error').remove();
                if (data.status == 'success') {
                    $('.form-avatar-preview').css({'background-image': 'url(' + data.path + ')'});
                } else {
                    $('.form-avatar-upload').append('<label class="error">Ошибка загрузки</label>');
                }
            },
            error: function() {
                $('.form-avatar-upload label.error').remove();
                $('.form-avatar-upload').append('<label class="error">Ошибка загрузки</label>');
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
            curGuest.find('.form-child-alcohol .form-checkbox-other .form-checkbox input').prop('checked', false).trigger('change');
        } else {
            curGuest.find('.form-child-alcohol').removeClass('invisible');
        }
    });

    $('body').on('change', '.form-guest-item input', function(e) {
        var curItem = $(this).parents().filter('.form-guest-item');
        curItem.addClass('changed');
    });

    $('body').on('click', '.form-guest-item .guest-remove', function(e) {
        var curItem = $(this).parents().filter('.form-guest-item');
        if (curItem.hasClass('changed')) {
            if (confirm('Удалить гостя')) {
                curItem.fadeOut(function() {
                    curItem.remove();
                });
            }
        } else {
            curItem.fadeOut(function() {
                curItem.remove();
            });
        }
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

    $.extend(true, $.magnificPopup.defaults, {
        tClose: 'Закрыть (Esc)',
        tLoading: 'Загрузка...',
        gallery: {
            tPrev: 'Предыдущая',
            tNext: 'Следующая',
            tCounter: '%curr% из %total%'
        },
        image: {
            tError: '<a href="%url%">Изображение</a> не может быть загружено.'
        },
        ajax: {
            tError: '<a href="%url%">Контент</a> не может быть загружен.'
        }
    });

    $('.gallery-list').each(function() {
        $(this).find('.gallery-item-zoom').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });

    $('.header-menu-link').click(function(e) {
        $('html').addClass('menu-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.nav').length == 0 && $(e.target).parents().filter('.header-menu-link').length == 0 && !$(e.target).hasClass('header-menu-link')) {
            $('html').removeClass('menu-open');
        }
    });

    $('.nav-header-menu-link').click(function(e) {
        $('html').removeClass('menu-open');
        e.preventDefault();
    });

    $('.nav-container').mCustomScrollbar({
        axis: 'y',
        scrollButtons: {
            enable: true
        }
    });

    var clipboard = new ClipboardJS('.location-coords span');
    clipboard.on('success', function(e) {
        alert('Координаты скопированы в буфер');
    });

    $('.location-routes a').click(function(e) {
        $('.location').toggleClass('location-routes-enable');
        if ($('.location').hasClass('location-routes-enable')) {
            if (myMap !== undefined) {
                myMap.controls.add('routePanelControl', {float: 'right'});

                var control = myMap.controls.get('routePanelControl');

                control.routePanel.state.set({
                    type: 'masstransit',
                    fromEnabled: true,
                    to: coords,
                    toEnabled: false
                });

                control.routePanel.options.set({
                    allowSwitch: false,
                    reverseGeocoding: true,
                    types: { driving: true, masstransit: true, pedestrian: true, taxi: true }
                });
            }
        } else {
            if (myMap !== undefined) {
                myMap.controls.remove('routePanelControl');
            }
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

    if (curScroll + $(window).height() > $('.footer').offset().top) {
        $('.up-link').css({'margin-bottom': (curScroll + $(window).height()) - $('.footer').offset().top});
    } else {
        $('.up-link').css({'margin-bottom': 0});
    }

    $('.nav-list a').each(function() {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            if ((curScroll + $(window).height() / 2) > curBlock.offset().top) {
                $('.nav-list li.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        }
    });

    $('.animate').each(function() {
        var curBlock = $(this);
        if ((curScroll + $(window).height()) > curBlock.offset().top) {
            curBlock.addClass('animate-start');
        } else {
            curBlock.removeClass('animate-start');
        }
    });

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
        ignore: '',
        invalidHandler: function(event, validator) {
            var curForm = $(this);
            curForm.find('.form-checkbox-group').each(function() {
                var curGroup = $(this);
                curGroup.find('> label.error').remove();
                if (!curGroup.parent().hasClass('invisible') && curGroup.find('.form-checkbox input:checked').length == 0) {
                    curGroup.prepend('<label class="error">Нужно выбрать хотя бы один вариант</label>')
                }
            });
        },
        submitHandler: function(form) {
            var groupCheck = true;
            var curForm = $(form);
            curForm.find('.form-checkbox-group').each(function() {
                var curGroup = $(this);
                curGroup.find('> label.error').remove();
                if (!curGroup.parent().hasClass('invisible') && curGroup.find('.form-checkbox input:checked').length == 0) {
                    groupCheck = false;
                    curGroup.prepend('<label class="error">Нужно выбрать хотя бы один вариант</label>')
                }
            });
            if (groupCheck) {
                form.submit();
            } else {
                $('html, body').animate({'scrollTop': $('.form-checkbox-group > label.error').eq(0).offset().top - 100});
            }
        }
    });
}