/**
 * 注册表单相关内容检测
 */

const register = {

    //点击提交按钮出发函数
    checkSubmit: function(e){
        //验证手机号格式
        let phone_reg = /^1[34578]\d{9}$/;
        if(!phone_reg.test(e.phone)){
            e.$notify({
                type: "danger",
                message: "手机号格式错误"
            });
            return false;
        }
        //密码
        if(e.pwd != e.confirm_pwd){
            e.$notify({
                type: "danger",
                message: "密码不一致"
            });
            return false;
        }
    }
}

export default register;