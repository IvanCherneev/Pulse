$(document).ready(function(){

    /******** 
    Слайдер
    *********/
    var slider = tns({
        container: '.carousel__list-sliders',
        items: 1,
        slideBy: 'page',
        //autoplay: true,
        autoplayButtonOutput: false,
        controls: false,
        mouseDrag: true,
        nav: true,
        navPosition: "bottom",
    });

    document.querySelector('.arrow_left').onclick = function () {
        slider.goTo('prev');
    };

    document.querySelector('.arrow_right').onclick = function () {
        slider.goTo('next');
    };

    /******** 
    Табы
    *********/
    $('.catalog__list-tabs').on('click', 'li:not(.catalog__tab_active)', function() {

        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('.catalog__tabs').find('.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    
    });

    function toogleSlide(item) {
        $(item).each(function(i) {

            $(this).on('click', function(e) {
                e.preventDefault();
                $('.card-product__base').eq(i).toggleClass('card-product__base_active');
                $('.card-product__more').eq(i).toggleClass('card-product__more_active');
            });

        });
    }

    toogleSlide('.card-product__link-more');
    toogleSlide('.card-product__link-back');

    /******** 
    Модальные окна
    *********/
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('[data-modal=order]').each(function(i) {
        $(this).on('click', function() {
            $('.modal__desc').text($('.card-product__name').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        
        });    
    });

    $('.modal__close, .overlay').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    /******** 
    Плавная прокрутка наверх
    *********/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $('.pageup').on('click', function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    /******** 
    Валидация форм
    *********/
    function checkForm(id) {
        $(id).validate({
            rules: {
                user_name: {
                    required: true,
                    maxlength: 30
                },
                phone: "required",
                email: {
                required: true,
                email: true,
                maxlength: 40
                }
            },
            messages: {
                user_name: {
                    required: "Введите имя пользователя",
                    maxlength: jQuery.validator.format("Превышение количества символов")
                },
                phone: {
                    required: "Введите номер телефона"
                },
                email: {
                    required: "Введите адрес эл. почты",
                    maxlength: jQuery.validator.format("Превышение количества символов")
                }
            }
        });
    }

    checkForm('#form-consultation');
    checkForm('#consultation form');
    checkForm('#order form');

    /******** 
    Маска ввода для полей форм
    *********/
    $("input[name=phone]").mask("+9 (999) 999-99-99");

    /******** 
    Отправка данных формы на почтовый сервер
    *********/
    $('form').submit(function(e) {
        e.preventDefault();
        
        if (!$(this).valid()) {
            return;
        } 
        
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    /******** 
    Запуск библиотеки WOW.js
    *********/
    new WOW().init();
});