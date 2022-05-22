$(function () {
    const layer = layui.layer
    const form = layui.form
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取文章分类失败！')
                layer.msg('获取文章分类成功！')
                console.log(res);
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    initArtCateList()

    // 添加分类弹窗
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html()
        });
    });

    //添加分类
    $('body').on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('添加分类失败！')
                layer.msg('添加分类成功！')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    // 编辑文章分类弹窗
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "编辑文章分类",
            content: $('#dialog-edit').html()
        });
        // 获取当前列表id值
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + $(this).attr('data-id'),
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章分类失败！')
                layer.msg('获取文章分类成功！')
                form.val('form-edit', res.data)

            }
        })
        const id = $(this).attr("data-id");
        // 发起请求获取对应分类的数据、填充弹窗数据
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val("form-edit", res.data);
            },
        });
    })
    // 更新文章分类
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("更新分类数据失败！");
                }
                layer.msg("更新分类数据成功！");
                // 关闭修改弹窗
                layer.close(indexEdit);
                // 重新加载数据
                initArtCateList();
            },
        });
    });
    // 删除按钮
    $('tbody').on('click','.btn-delete',function() {
        const id= $(this).attr('data-id');
        // 删除提示
        layer.confirm('确定删除吗？',{icon:3,title:'提示'},function(index){
            $.ajax({
                type:'GET', 
                url:'/my/article/deletecate/'+id,
                success:(res)=>{
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败！");
                    }
                    layer.msg("删除分类成功！");
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
    })


})