$(function(){
const layer =layui.layer
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


$('#btnChooseImage').on('click', function() {
    $('#file').click()
  })

  $('#file').change((e)=>{
      let fileList =e.target.files;
      console.log(fileList);
    if (fileList.length===0)return layer.msg('请选择文件后上传！')
    const file =e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    $image.cropper('destroy').attr('src', imgUrl).cropper(options)
  })

  $('#btnUpload').click((e)=>{
      const dataURL =$image.cropper('getCroppedCanvas',{
          width:100,
          height:100,
      }).toDataURL('image/png');
      console.log(dataURL);

      $.ajax({
          type:'POST',
          url: '/my/update/avatar',
          data:{
              avatar:dataURL,
          },
          success: (res) => {
              if(res.status !== 0)return layer.msg('更新头像失败！')
              layer.msg('更新头像成功！');
              window.parent.getUserInfo()
          }
      })

  })

})