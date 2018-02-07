const indexNavItems = $('.index-nav__list span');
const links = $('.index-nav__list a');

let index = 5;
const timer = setInterval(() => {
	const item = $(indexNavItems[index % 5])
	item.css('zIndex', index++);
}, 1000);
