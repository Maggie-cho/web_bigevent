$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date(date)
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDay())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss} `
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initArtTable()
    initArtCate()

    //给筛选绑定点击事件 
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initArtTable()
    });

    //给删除按钮绑定点击事件
    $('tbody').on('click', '.btn-del', function() {
        var len = $('.btn-del').length
        var id = $(this).attr('data-id')
        layer.confirm('确定删除文章吗？', { icon: 3, title: '删除文章' }, function(index) {
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initArtTable()

                }
            });
            layer.close(index);

        });
    })

    //给编辑绑定点击事件


    //初始化文章列表方法
    function initArtTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                var htmlStr = template('artList', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        });
    }
    //初始化文章分类方法 
    function initArtCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-artCate', res)
                $('#sleArtCate').html(htmlStr)
                form.render()

            }
        });
    }

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 5, 8, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initArtTable()

                    //do something
                }

            }
        })
    }

})

function padZero(n) {
    return n > 9 ? n : '0' + n
}