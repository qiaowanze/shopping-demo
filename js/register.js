; (function () {
    class Register {
        constructor() {
            this.url = "http://127.0.0.5:83/api";
            this.user = $("#input_user");
            this.pass = $("#input_pass");
            this.btn = $(".reg-btn");
            this.input = $("#input_user");
            this.tip = $(".popover-content")
            this.passed = $("#input_passed");
            this.code = $("#input_code");
            this.bTip = $(".bottom-tip");
            this.t = null;
            this.reg = /^[\u4e00-\u9fa5]{2,}$/
            this.reg1 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            this.reg2 = /^[a-zA-z\d-_]{3,12}@[a-zA-z\d]{2,9}.[a-z]{2,5}$/;
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.input.blur(function () {
                if (that.user.val() == "") {
                    that.tip.css("display", "block");
                    that.user.css("border", "1px solid #a94442");
                    return;
                }
                if(that.reg.test(that.user.val()) || that.reg1.test(that.user.val()) || that.reg2.test(that.user.val())){
                    that.tip.css("display", "none");
                    that.user.css("border", "1px solid green");
                }else{
                    that.tip.css("display", "block");
                    that.tip[0].innerHTML = "用户名格式错误"
                    that.user.css("border", "1px solid #a94442");
                    return;
                }

                that.btn.click(function () {
                    clearTimeout(that.t);
                    if (that.pass.val() == "" || that.passed.val() == "") {
                        that.bTip.css("display", "block");
                        that.bTip.html("密码不能为空")
                        that.t = setTimeout(function () {
                            that.bTip.css("display", "none");
                        }, 2000)
                        return;
                    }
                    if (that.pass.val() != that.passed.val()) {
                        that.bTip.css("display", "block");
                        that.bTip.html("两次密码不一致")
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
            })
        }
        load() {
            var that = this;
            ajaxPost(this.url, function (res) {
                that.res = JSON.parse(res);
                that.display();
            }, {
                user: this.user.val(),
                pass: this.pass.val(),
                type: "register"
            })
        }
        display() {
            var that = this;
            if (this.res.code == 0) {
                this.bTip.css("display", "block");
                this.bTip.html(`用户名${this.user.val()}已经被占用，请换一个重试`)
                this.t = setTimeout(function () {
                    that.bTip.css("display", "none");
                }, 2000)
            } else {
                this.bTip.css("display", "block");
                this.bTip.html("注册成功,2秒后跳转登录页面")
                setTimeout(function () {
                    location.href = "login.html";
                }, 2000)
            }
        }
    }
    new Register;

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