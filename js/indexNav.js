const indexNavItems = $('.index-nav__list span');
const links = $('.index-nav__list a');

let index = 4;
const timer = setInterval(() => {
	const i = index % 4;
	$(indexNavItems[i]).css('zIndex', index++);
}, 1000);
