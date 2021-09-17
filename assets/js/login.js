$(function(){
    $('#link-login').on('click',function(){
        $('.loginBox').show()
        $('.regBox').hide()
    })

    $('#link-reg').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        username:function(value){
            if(!new RegExp("^[a-zA-Z0-9_$]{1,10}").test(value)){
                return '用户名必须是1-10位字母或数字';
              }
        },
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){  
            var pwd = $('.regBox [name=password]').val();
            if(value!==pwd){
                return '两次输入密码不一致！'
            }

        }
    })
    $('#form-reg').on('submit',function(e){
        var data = {
            username:$('#form-reg [name=username]').val(),
            password:$('#form-reg [name=password]').val()
        }
        e.preventDefault();
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#link-login').click();
        })
    })
    $('#form-login').submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('res.message')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token',res.token)
                location.href = './index.html'
            }
        })
    })
})