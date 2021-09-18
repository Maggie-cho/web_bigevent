$(function () {
    var layer = layui.layer
    var form = layui.form

    var index = null;
    var indexEdit = null;
    initArtCateList()
    //设置添加分类模块功能
    $('#btnAdd').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog_Add').html(),
            area: ['500px', '250px']
        })
    })

    //添加分类模块-监听表单提交事件
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
            }
        })
        layer.close(index)

        initArtCateList()

    })

    //设置修改按钮模块功能
    $('tbody').on('click','#changeCate',function(){
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dialog_Edit').html(),
            area: ['500px', '250px']
        })
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'get',
            url: '/my/article/cates/'+id,
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                form.val('formEdit',res.data)

            }
        })

    })
    //修改模块 监听表单提交行为
    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
            }
        })
        layer.close(indexEdit)

        initArtCateList()

    })
    //设置删除按钮模块功能 需要重新渲染列表
    $('tbody').on('click','#deleCate',function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除分类吗？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/'+id,
                success: function (res) {
                    if(res.status !== 0 ){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                }
            })
            initArtCateList()
            
            layer.close(index);
            
          });
    })
})

//初始化列表 
function initArtCateList() {
    $.ajax({
        type: "get",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            var htmlStr = template('temp1', res)
            $('tbody').html(htmlStr);
        }
    });
}