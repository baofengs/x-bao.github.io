$(function () {

	$('.post__main img').on('click', function () {
		var $img = $(this);

		$.fancybox.open([{
			src: $img.attr('src'),
			type: 'image'
		}]);
	});

	$('[data-fancybox]').fancybox({
		// closeClickOutside: false, 
		image: {
			protect: true
		}
	});

	// key bind

	// j  down
	// k  top
	// t  page top
	// b  page bottom

	// i  go index
	var $body = $('html');

    var isFocused = false;

    setTimeout(() => {
        const textarea = $('#comments textarea');
        window.isFocused = isFocused;
        textarea.focus(() => {
            console.log('is focused')
            isFocused = true;
        });
        textarea.blur(() => {
            console.log('is blured')
            isFocused = false;
        });
    });

	var isKeydown = false;
	$body.on('keydown', function (e) {
		// console.log(e.which, 'key down');
		var postNav = document.querySelector('.post-nav');
		if (postNav) {
			var postNavLeft = postNav.querySelector('.prev');
			var postnavRight = postNav.querySelector('.next');
        }

        // isFocused = document.hasFocus();

        // const textarea = $('#comments textarea');
        // textarea.focus(() => {
        //     console.log('is focused', document.hasFocus());
        //     isFocused = true;
        // });
        // textarea.blur(() => {
        //     console.log('is blured');
        //     isFocused = false;
        // });

		switch (e.which) {
			case 74: // j down
				if (!isFocused && !isKeydown) {
					isKeydown = true;
					requestAnimationFrame(function animate() {
						var curTop = window.scrollY;
						window.scrollTo(0, curTop + 15);

						if (isKeydown) {
							requestAnimationFrame(animate);
						}
					});
				}
				break;

			case 75: // k up
				if (!isFocused && !isKeydown) {
					isKeydown = true;
					requestAnimationFrame(function animate() {
						var curTop = window.scrollY;
						window.scrollTo(0, curTop - 15);

						if (isKeydown) {
							requestAnimationFrame(animate);
						}
					});
				}
				break;
			case 191: // shift + / = ? show help modal
				break;
				// 16 shift
			case 84: // t
				if (!isFocused) {
					window.scrollToTop(1);
				}
				break;
			case 66: // b
				if (!isFocused) {
					window.scrollToBottom();
				}
				break;
			case 78: // n half
				if (!isFocused) {
					window.scrollPageDown(1);
				}
				break;
			case 77: // m
				if (!isFocused) {
					window.scrollPageUp(1);
				}
				break;
			case 219: // [
				if (!isFocused && postNavLeft && postNavLeft.href) {
					window.location = postNavLeft.href;
				}
				break;
			case 221: // ]
				if (!isFocused && postnavRight && postnavRight.href) {
					window.location = postnavRight.href;
				}
				break;
			case 72: // h
				if (!isFocused) {
					window.location = '/archives';
				}
				break;
		}

	});

	$body.on('keyup', function (e) {
		isKeydown = false;
	});

	// print hint

	var comments = [
		'',
		'                    .::::.            快捷键：',
		'                  .::::::::.              	j: 下移',
		'                 :::::::::::              	k: 上移',
		"             ..:::::::::::'               	t: 移到最顶",
		"           '::::::::::::'                 	b: 移到最底",
		'             .::::::::::                  	n: 下移很多',
		"        '::::::::::::::..                 	m: 上移很多",
		'             ..:::::::::::::. 			  	[: 前一篇文章',
		'           ``:::::::::::::::::            	]: 后一篇文章',
		"            ::::``:::::::::'        .:::. 	h: 回到文章列表页",
		"           ::::'   ':::::'       .::::::::.",
		"         .::::'      ::::     .:::::::'::::.",
		"        .:::'       :::::  .::::::::'  ':::::.",
		"       .::'        :::::::::::::::'      ':::::.",
		"      .::'        :::::::::::::::'          ':::.",
		"  ...:::          :::::::::::::'              ``::.",
		" ```` ':.         '::::::::::'                  ::::..",
		"                    ':::::'                    ':'````..",
		''
	];

	comments.forEach(function (item) {
		console.log('%c' + item, 'color: #399c9c');
	});

	$('.btn-reward').on('click', function (e) {
		e.preventDefault();

		var $reward = $('.reward-wrapper');
		$reward.slideToggle();
    });
    
    var $backToTop = $('#back-to-top');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $backToTop.fadeIn(1000);
        } else {
            $backToTop.fadeOut(1000);
        }
    });

    $backToTop.click(function () {
        $('body,html').animate({ scrollTop: 0 });
    });

	$('body').addClass('queue-in');
	setTimeout(function() {
		$('body').css({ opacity: 1}).removeClass('queue-in');
	}, 500);

});
