$(function () {
    const gitment = new Gitment({
        id: window.location.pathname,
        owner: 'x-bao',
        repo: 'comments',
        oauth: {
            client_id: '421d0e999e803d9a5adb',
            client_secret: '5dac591999594c62d2e850b35fe0bcfa7e8fce04',
        }
    });
    gitment.render('comments');

    var isFocused = false;
    const textarea = $('#comments textarea');
    window.isFocused = isFocused;
    textarea.on('focus', () => {
        console.log('is focused')
        window.isFocused = true;
    });
    textarea.on('blur', () => {
        console.log('is blured')
        window.isFocused = false;
    });
    
});
