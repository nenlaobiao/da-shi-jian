// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 系统会先自动调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((option) => {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    option.url = `http://www.liulongbin.top:3007` + option.url;
    if(option.url.indexOf('/my/')){
        option.headers={
         Authorization:localStorage.getItem('token')
        }
    }
    option.complete=(res)=>{
        console.log(1);
        if(
            res.responseJSON.status ===1 &&
            res.responseJSON.message ==="身份认证失败！"
        ){
            localStorage.removeItem('token');
            location.href='/login.html'
            console.log(2);
        }
    }
    
  });