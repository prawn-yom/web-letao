NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    // 为了凸显进度条的消失 在此定了一个计时器 （只是为了本地体验效果）
    setTimeout(function() {
        NProgress.done();      
    }, 500);
});