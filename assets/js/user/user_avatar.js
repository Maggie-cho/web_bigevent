$(function () {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#btnUpload").on('click', function () {
        $('#chooseFile').click();
    })
    $('#chooseFile').on('change', function (e) {
        var fileList = e.target.files;
        if (fileList.length === 0) {
            return layui.layer.msg('请上传一张图片！')
        }
        var file = fileList[0]
        var imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域 
    })
    //给确定按钮绑定点击事件 
    $('#btnConfirm').on('click', function () {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: dataURL,
            success: function(res) {
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                    //重新渲染头像  调用父页面的方法 
                    layui.layer.msg(res.message)
                    window.parent.getUserInfo();
            }
        })
    })



})

