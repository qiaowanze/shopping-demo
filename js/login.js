; (function () {
    class Login {
        constructor() {
            this.url = "http://127.0.0.5:83/api";
            this.user = $("#input_user");
            this.pass = $("#input_pass");
            this.btn = $(".login-btn");
            this.bTip = $(".bottom-tip");
            this.code = $("#input_code")
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.btn.click(function () {
                if (that.user.val() == "" || that.pass.val() == "") return;
                if (that.code.val() == "") {
                    that.bTip.css("display", "block");
                    that.bTip.html("验证码不能为空")
                    that.t = setTimeout(function () {
                        that.bTip.css("display", "none");
                    }, 2000)
                    return;
                }
                if (that.code.val() != show_num.join("")) {
                    that.bTip.css("display", "block");
                    that.bTip.html("验证码不正确")
                    that.t = setTimeout(function () {
                        that.bTip.css("display", "none");
                    }, 2000)
                    return;
                }
                that.load();
            })
        }
        load() {
            var that = this;
            ajaxPost(this.url, function (res) {
                that.res = JSON.parse(res);
                console.log(res);
                that.display();
            }, {
                user: this.user.val(),
                pass: this.pass.val(),
                type: "login"
            })
        }
        display() {
            var that = this;
            if (this.res.code == 0) {
                this.bTip.css("display", "block");
                this.bTip.html("用户名不存在,先去注册吧")
                this.t = setTimeout(function () {
                    that.bTip.css("display", "none");
                }, 3000)
            } else if(this.res.code == 1){
                location.href = "index.html";
                this.setState();
            }else{
                this.bTip.css("display", "block");
                this.bTip.html("密码错误")
                this.t = setTimeout(function () {
                    that.bTip.css("display", "none");
                }, 3000)
            }
        }
        setState() {
            localStorage.setItem("loginUser",JSON.stringify(this.res.user))
        }
    }
    new Login;

    function ajaxPost(url, cb, data) {
        data = data || {};
        var str = "";
        for (var i in data) {
            str += `${i}=${data[i]}&`;
        }
        str = str.slice(0, str.length - 1);
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(xhr.responseText);
            }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str);
    }

    var msg = localStorage.getItem("loginUser");
    if (msg) {
        $(".top-header-status").hide();
        $(".personal").show();
        $(".personal").find("a").html(JSON.parse(msg));
    } else {
        $(".top-header-status").show();
        $(".personal").hide();
    }

    $(".per_btn").click(function () {
        $(".log_out").toggle();
    })

    $(".log_out_btn").click(function () {
        localStorage.removeItem("loginUser");
        $(".top-header-status").show();
        $(".personal").hide();
    })
})();