$(document).ready(function() {
    var youtubeSwiper = new Swiper('.swiper-container', {
        spaceBetween: 20,
        autoplay:
            {
                delay: 5000,
            },
        speed:1000,
        direction: 'horizontal',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        on: {
            slideChange: function(el) {
                $('.swiper-slide').each(function() {
                    var youtubePlayer = $(this).find('iframe').get(0);
                    if (youtubePlayer) {
                        youtubePlayer.on('click', function() {
                            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        });
                    }
                });
            },
        },
    });
});

let ww = window.innerWidth;

function responsiveSwiper() {
    if (ww >= 1200) {
        initSwiper('slide');
    }else if (ww < 1200) {
        // 페이드 효과
        initSwiper('fade');
    }
}

window.addEventListener('resize', function() {
    ww = window.innerWidth;
    responsiveSwiper();
});