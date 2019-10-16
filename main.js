window.onload = function () {
    const svg = document.getElementById('svg-object').contentDocument;
    const arr = svg.getElementsByTagName('path');
    const $elm = $(svg).find('svg');

    for (let index = 0; index < arr.length; index++) {
        if (arr[index].classList.contains('fil3')) {
            arr[index].style.fill = '#fef' + Math.floor(Math.random() * (999 - 100 + 1) + 100);
            arr[index].addEventListener('click', function () {
                console.log(this.id)
            });
        }
    }
    handleZoomIn($elm);
    handleZoomOut($elm);
    activeDrag($elm);
    

}


function handleZoomIn() {
    $('button[name="zoom-in"]').click(function () {
        $('.svg-object').width($('.svg-object').width() * 1.1);
    });
}

function handleZoomOut() {
    $('button[name="zoom-out"]').click(function () {
        const svgWidth = $('.svg-object').width();

        if (svgWidth > $(window).width()) {
            $('.svg-object').width(svgWidth / 1.1);
        }
    });
}

function activeDrag($elm) {
    const slider = $elm[0];
    let isDown = false;
    let startX;
    let startY;
    var lastPositionX = -1;

    slider.addEventListener('mousedown', (e) => {
        $elm.css('cursor', 'grab');
        isDown = true;
        startX = e.pageX;
        startY = e.pageY;
    });
    slider.addEventListener('mouseleave', (e) => {
        isDown = false;
        $elm.css('cursor', 'default');
    });

    slider.addEventListener('mouseup', (e) => {
        isDown = false;
        $elm.css('cursor', 'default');
    });

    slider.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (isDown) {
            if (e.screenX != lastPositionX) {
                let x = e.pageX;
                let walk = (x - startX);
                $(window).scrollLeft($(window).scrollLeft() - walk);
            } else {
                let y = e.pageY;
                let walk = (y - startY);
                $(window).scrollTop($(window).scrollTop() - walk);
            }
        }
        lastPositionX = e.screenX;
    });
}