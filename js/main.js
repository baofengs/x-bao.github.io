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

	const checkFocus = () => {
		return ;
	}
	$('#comments textarea').focus(() => {console.log('textarea focused...')});

	var isKeydown = false;
	$body.on('keydown', function (e) {
		// console.log(e.which, 'key down');
		var postNav = document.querySelector('.post-nav');
		if (postNav) {
			var postNavLeft = postNav.querySelector('.prev');
			var postnavRight = postNav.querySelector('.next');
		}

		switch (e.which) {
			case 74: // j down
				console.log('checkFocus: ', checkFocus());
				if (!isKeydown) {
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
				if (!isKeydown) {
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
				window.scrollToTop(1);
				break;
			case 66: // b
				window.scrollToBottom();
				break;
			case 78: // n half
				window.scrollPageDown(1);
				break;
			case 77: // m
				window.scrollPageUp(1);
				break;
			case 219: // [
				if (postNavLeft && postNavLeft.href) {
					window.location = postNavLeft.href;
				}
				break;
			case 221: // ]
				if (postnavRight && postnavRight.href) {
					window.location = postnavRight.href;
				}
				break;
			case 72: // h
				window.location = '/archives';
				break;
		}

	});

	$body.on('keyup', function (e) {
		isKeydown = false;
	});


	// var textarea = document.querySelector('#commments').querySelector('textarea');
	// console.log(textarea, textarea.focus());

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

	$('body').addClass('queue-in');
	setTimeout(function() {
		$('body').css({ opacity: 1}).removeClass('queue-in');
	}, 500);

});
