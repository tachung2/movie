$(document).ready(function() {
    var youtubeSwiper = new Swiper('.swiper-container', {
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