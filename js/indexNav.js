const indexNavItems = $('.index-nav__list span');
const links = $('.index-nav__list a');

let index = 5;
let order = 0
const timer = setInterval(() => {
	const item = $(indexNavItems[index % 5])
	item.css('zIndex', index++);
	// item.css('order', order--);
}, 1000);
