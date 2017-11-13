$(function () {
    // 定义当前页
    var currentPage = 1;
    // 定义每页数量
    var pageSize = 5;

    //因为需要多次使用所以封装起来 
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                console.log(data);
                var html = template('tableTem', data);
                $('tbody').html(html);
                // console.log(data.total);
                // 分页插件
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,//版本 默认为2 需要改成3
                    currentPage: currentPage,// 显示的当前页
                    totalPages: Math.ceil(data.total / pageSize),  // 总共有多少页
                    numberOfPages: 5,  //插件显示的总页码 默认为5
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //因为page 是当前点击的页数 所以修改当前页
                        currentPage = page;
                        // 修改了当前页后 需要 重新渲染当前的页面
                        render();
                    }
                });
            }
        });    
    };
    // 一开始就要渲染 所以先调用
    render();

    // 启用禁用功能
    $()
})