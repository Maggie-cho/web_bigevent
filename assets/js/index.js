$(function() {
    // 调用渲染用户头像
    var layer = layui.layer;
    getUserInfo();

    $('#btnLogout').on('click', function() {
        //弹出确认退出消息框
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function(index) {
            //本地token清除
            localStorage.removeItem('token')
            location.href = '/login.html'
                //跳转页面到登录页面
            layer.close(index);
        });
    })

})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderUserInfo(res.data)
        },

    })

}

function renderUserInfo(user) {
    //渲染用户信息
    var name = user.nickname || user.username
    $('.wel').html('欢迎&nbsp;&nbsp;' + name)
    $('.text-avatar').html(name[0].toUpperCase())
        //渲染头像 
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();

    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show();
    }
}