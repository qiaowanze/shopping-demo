;
(function ($, jQuery) {
    "use strict";

    //$.fn jQuery封装出来的DOM对象
    $.fn.banner = function (options) {
        var that = this;
        options = options || {};
        
        //1.默认参数处理
        this._obj = {
            btn: options.btn === false ? false : true,
            list: options.list === false ? false : true,
            autoPlay: options.autoPlay === false ? false : true,
            delayTime: options.delayTime || 2000,
            moveTime: options.moveTime || 200,
            index: options.index || 0,
            iPrev: options.img.length - 1,
            img: options.img || []
        };
        //2.渲染布局
        this._obj.init = function () {
            var str = "";
            for (var i = 0; i < this.img.length; i++) {
                str += `<a href="##"><img src="${this.img[i]}"></a>`
            }
            that.html(`<div class="imgbox">${str}</div>`).css({
                width: 1920,
                height: 500,
                position: "relative",
                overflow: "hidden"
            }).children(".imgbox").css({
                width: 1920,
                height: 500
            }).children("a").css({
                position: "absolute",
                width: 1920,
                height: 500,
                top: 0,
                left: 1920
            }).eq(0).css({
                left: 0
            }).end().children("img").css({
                width: 1920,
                height: 500
            })
        }
        this._obj.init();
        this._obj.leftClick = function () {
            if (that._obj.index == 0) {
                that._obj.index = that._obj.img.length - 1;
                that._obj.iPrev = 0;
            } else {
                that._obj.index--;
                that._obj.iPrev = that._obj.index + 1;
            }
            that._obj.btnMove(1);
        }
        this._obj.rightClick = function () {
            if (that._obj.index == that._obj.img.length - 1) {
                that._obj.index = 0;
                that._obj.iPrev = that._obj.img.length - 1;
            } else {
                that._obj.index++;
                that._obj.iPrev = that._obj.index - 1;
            }
            that._obj.btnMove(-1)
        }
        this._obj.btnMove = function (type) {
            let imgs = that.children(".imgbox").children("a");
            imgs.eq(this.iPrev).css({
                left: 0
            }).stop().animate({
                left: imgs.eq(0).width() * type
            }, this.moveTime).end().eq(this.index).css({
                left: -imgs.eq(0).width() * type
            }).stop().animate({
                left: 0
            }, this.moveTime);

            if (!this.list) return;
            that.children(".list").children("li").css("background", "#FFF").eq(this.index).css("background", "red");
        }
        //3.确定左右按钮功能
        if (this._obj.btn) {
            $("<span id='left'><</span>").css({
                left:150
            }).appendTo(this).after($("<span id='right'>></span>").css({
                right: 540
            })).parent().children("span").css({
                position: "absolute",
                width: 40,
                height: 40,
                fontSize: 60,
                fontWeight: "bold",
                cursor:"default",
                color:"#FFF",
                top: 205,
                border: "none",
                opacity:0.8
            })
            this.on("click", "#left", that._obj.leftClick)
            this.on("click", "#right", that._obj.rightClick)
        }


        //4.判断用户是否需要小圆点的功能
        if (this._obj.list) {
            let str = "";
            for (var i = 0; i < this._obj.img.length; i++) {
                str += `<li></li>`
            }
            $("<ul class='list'>").html(str).appendTo(this).css({
                margin: 0,
                padding: 0,
                width: "100%",
                height: 40,
                position: "absolute",
                bottom: 15,
                display: "flex",
                justifyContent: "center",
                left:-120,
                lineHeight: "40px"
            }).children("li").css({
                width: 45,
                height: 4,
                background: "#FFF",
                margin: "0 5px",
                cursor: "pointer",
                borderRadius:0
            }).eq(this._obj.index).css({
                background: "red"
            }).end().click(function () {
                if ($(this).index() > that._obj.index) {
                    that._obj.listMove($(this).index(), -1);
                }
                if ($(this).index() < that._obj.index) {
                    that._obj.listMove($(this).index(), 1);
                }
                that._obj.index = $(this).index();
            })

            this._obj.listMove = function (iNow, type) {
                let imgs = that.children(".imgbox").children("a");
                imgs.eq(this.index).css({
                    left: 0
                }).stop().animate({
                    left: imgs.eq(0).width() * type
                }, this.moveTime).end().eq(iNow).css({
                    left: -imgs.eq(0).width() * type
                }).stop().animate({
                    left: 0
                }, this.moveTime)

                that.children(".list").children("li").css("background", "#FFF").eq(iNow).css("background", "red");
            }
        }

        //5.判断用户是否需要自动播放功能
        if (this._obj.autoPlay) {
            this._obj.t = setInterval(() => {
                this._obj.rightClick();
            }, this._obj.delayTime);

            this.hover(function () {
                clearInterval(that._obj.t)
            }, function () {
                that._obj.t = setInterval(() => {
                    that._obj.rightClick();
                }, that._obj.delayTime);
            })
        }
    }
})($, jQuery);