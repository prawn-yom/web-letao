$(function () {
    /*
       需求：
       1.用户名不能为空
       2.密码不能为空
       3.密码长度为6-12位 
     */

    // 获取 表单
    var $from = $('from');
    $form.bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //规则
        fields: {
            //对应了表单中的name属性
            username: {
                //写username所有的校验规则
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度为6-12位'
                    },
                    
                }

            }
        }
    });

})