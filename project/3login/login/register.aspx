<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="login.register" %>

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<title>晒科网注册平台</title>

<link href="css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
 <script src="https://v.vaptcha.com/v3.js"></script>
</head>
<body>

<div class="videozz"></div>
	<video  autoplay muted loop poster="assets/images/fallba1ck.jpg">
		<source src="assets/images/mov.mp4">		
		你的游览器不支持video支持
	</video>
<div class="box">
	<div class="box-a">
    <div class="m-2">
          <div class="m-2-1">
            <form runat="server">
                <div style="color:green;font-size:30px"> 
                    <asp:Literal runat="server" ID="SuccessText" />
                </div>
                <div class="m-2-2">
                    <asp:TextBox runat="server" ID="UserName"  placeholder="请输入账号"/>
                </div>
                <div class="m-2-2">
                    <asp:TextBox runat="server" ID="Password" TextMode="Password" placeholder="请输入密码" />
                </div>
                  <div class="m-2-2">
                    <asp:TextBox runat="server" ID="Email"  placeholder="请输入邮箱"/>
                </div>
                <!-- 点击式按钮建议高度介于36px与46px  -->
                <div class="m-2-2">
                    <div id="vaptchaContainer" style="width: 300px;height: 36px;">
                    <!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画-->
                    </div>
                 </div>
                 <div style="color:red"> 
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="Email"
                                CssClass="text-danger" ErrorMessage="“邮箱”字段是必填字段。" />
                </div>
                 <div style="color:red"> 
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="UserName"
                                CssClass="text-danger" ErrorMessage="“账户”字段是必填字段。" />
                </div>
                 <div style="color:red"> 
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="Password" CssClass="text-danger" ErrorMessage="“密码”字段是必填字段。" />
                </div>
                <div style="color:red"> 
                    <asp:Literal runat="server" ID="FailureText" />
                </div>
                <div class="m-2-2">
                   <asp:Button runat="server" OnClick="Register" text="注册" ID="zhuce" style="display:none" />
                   <input type="button" value="注册" id="bzhuce"/>
                </div>
            </form>
              <div class="m-2-2">
                   <button  value="已有账户？去登录"  onclick="window.location.href='Login.aspx'" /> 已有账户？去登录
                </div>
          </div>
    </div>
    <div class="m-5"> 
    <div id="m-5-id-1"> 
    <div id="m-5-2"> 
    <div id="m-5-id-2">  
    </div> 
    <div id="m-5-id-3"></div> 
    </div> 
    </div> 
    </div>   
    <div class="m-10"></div>
    <div class="m-xz7"></div>
    <div class="m-xz8 xzleft"></div>
    <div class="m-xz9"></div>
    <div class="m-xz9-1"></div>
    <div class="m-x17 xzleft"></div>
    <div class="m-x18"></div>
    <div class="m-x19 xzleft"></div>
    <div class="m-x20"></div>  
    <div class="m-8"></div>
    <div class="m-9"><div class="masked1" id="sx8">晒科网注册平台</div></div> 
    <div class="m-11">
    	<div class="m-k-1"><div class="t1"></div></div>
        <div class="m-k-2"><div class="t2"></div></div>
        <div class="m-k-3"><div class="t3"></div></div>
        <div class="m-k-4"><div class="t4"></div></div>
        <div class="m-k-5"><div class="t5"></div></div>
        <div class="m-k-6"><div class="t6"></div></div>
        <div class="m-k-7"><div class="t7"></div></div>
    </div>   
    <div class="m-14"><div class="ss"></div></div>
    <div class="m-15-a">
    <div class="m-15-k">
    	<div class="m-15xz1">
            <div class="m-15-dd2"></div>
        </div>
    </div>
    </div>
    <div class="m-16"></div>
    <div class="m-17"></div>
    <div class="m-18 xzleft"></div>
    <div class="m-19"></div>
    <div class="m-20 xzleft"></div>
    <div class="m-21"></div>
    <div class="m-22"></div>
    <div class="m-23 xzleft"></div>
    <div class="m-24" id="localtime"></div>
    </div>
</div>
<script>
    var obj;
    vaptcha({
        vid: '6096a23b2c0666dd9bc80c64', // 验证单元id
        type: 'invisible', // 显示类型 隐藏式
        scene: 0, // 场景值 默认0
        offline_server: '', //离线模式服务端地址，若尚未配置离线模式，请填写任意地址即可。
        //可选参数
        //lang: 'auto', // 语言 默认auto,可选值auto,zh-CN,en,zh-TW,jp
        //https: true, // 使用https 默认 true
    }).then(function (vaptchaObj) {
        obj = vaptchaObj //将VAPTCHA验证实例保存到局部变量中
        //获取token的方式一：
        //vaptchaObj.renderTokenInput('.login-form')//以form的方式提交数据时，使用此函数向表单添加token值
        //获取token的方式二：
        vaptchaObj.listen('pass', function () {
            // 验证成功进行后续操作
            var data = {
                //表单数据
                token: vaptchaObj.getToken(),
            }
            $("#zhuce").click();
        })
        //关闭验证弹窗时触发
        vaptchaObj.listen('close', function () {
            //验证弹窗关闭触发
        })
    })
    var first = true;
    $("#bzhuce").click(function () {
        if (!first) {
            obj.reset();
        }
        first = false;
        obj.validate()
    })
</script>
<style>
.copyrights{text-indent:-9999px;height:0;line-height:0;font-size:0;overflow:hidden;}
.vaptcha-init-main {
    display: table;
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
}
.vaptcha-init-loading {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
​
.vaptcha-init-loading > a {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: none;
}
​
.vaptcha-init-loading > a img {
    vertical-align: middle;
}
​
.vaptcha-init-loading .vaptcha-text {
    font-family: sans-serif;
    font-size: 12px;
    color: #cccccc;
    vertical-align: middle;
}
</style>
</body>
<script src="js/common.min.js"></script>
</html>

