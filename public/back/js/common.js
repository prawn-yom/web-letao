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

$(function () {
    // 二级菜单显示隐藏
    $('.child').prev().on('click', function () {
        $('.child').slideToggle();        
    });
    
    // 侧边栏 显示隐藏
    $('.btn_menu').on('click', function () {
        // 加上一个 now类 让 .yc_aside 的left变成 -180px
        $('.yc_aside').toggleClass('now');
        // 加上一个 now类 让 .yc_main 这个的padding-left为0；
        $('.yc_main').toggleClass('now');
        
    })

    // 退出功能
    $('.btn_logout').on('click', function () {
        // 显示模态框
        $('#logoutModal').modal('show');  
        // off() 不传参数是解绑所有时间
        // off('click') 只解绑click 时间
        // off('click', '**') 只解绑委托时间
        $('.btn_confirm').off().on('click', function () {
            $.ajax({
                type:'get',
                url:'/employee/employeeLogout',
                success:function (data) {
                    if(data.success){
                        location.href = 'login.html';
                    }
                }
            })
        })
    })
})
