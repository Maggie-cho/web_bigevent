$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo();
    // 待写
    $('.layui-form').submit(function(e) {
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                        //调用父页面的方法，重新渲染用户头像和信息
                    window.parent.getUserInfo();
                }

            })
        })
        // 重置表单数据 
    $('#reSetUserInfo').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })


    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)

            }
        })
    }

})