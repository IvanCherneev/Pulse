var slider = tns({
    container: '.carousel__list-sliders',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    autoplayButtonOutput: false,
    nav: false,
    controls:false,
    mouseDrag: true
});

document.querySelector('.arrow_left').onclick = function () {
    slider.goTo('prev');
};

document.querySelector('.arrow_right').onclick = function () {
    slider.goTo('next');
};
