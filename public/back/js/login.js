$(function () {
    // 登录表单校验
    /**
     * 需求:
     *  1.用户名不能为空
     *  2.密码不能为空
     *  3.密码必须为6-12位
     */

    // 获取表单
    var $form = $('form');

    // 调用bootstrapValidator方法 实现上面的需求
    $form.bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 规则
        fields: {
            // 这里是表单的name的值
            username: {
                // 写username所有的校验规则
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    callback:{
                        message:'密码错误'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度为6-12位'
                    }
                },

            }
        }
    });

    // 给表单注册一个校验成功事件 :success.form.bv
    $form.on('success.form.bv', function (e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            // 通过 serialize() 这个方法可以让表单的name值与value值自动拼接起来 拼接成 name值=value值&下一个name值=下一个value值
            data: $form.serialize(),
            success: function (data) {
                // console.log(data);
                // 通过了console.log 后 可以看出 当有输入错误的账号密码 会出现 error=1000 和 error=1001
                if (data.success) {
                    //跳转到首页
                    location.href = 'index.html';
                }
                if (data.error === 1000) {
                    //    alert('账号错误啦');
                    //使用updateStatus方法，主动把username这个字段变成校验失败
                    //第一个参数：字段名  表单中的name属性
                    //第二个参数：INVALID :校验失败 
                                // NOT_VALIDATED :未校验的
                                // VALIDATING:校验中的
                                // VALID:校验成功的
                    //第三个参数：配置提示消息  可以再 配置规则的那里配置 传到这里来
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if (data.error === 1001) {
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
            }
        });
    });

    // 表单重置功能
    // 获取到 重置 按钮
    $('[type="reset"]').on('click', function () {
        // 调用 bootstrapValidator 中的 resetForm() 方法 重置表单功能
        $form.data("bootstrapValidator").resetForm();
    })
})