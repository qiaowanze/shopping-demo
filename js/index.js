;
(function () {
    "user strict";
    $(".inner-banner").banner({
        img: ['images/pc1.jpg', 'images/pc2.jpg', 'images/pc3.jpg', 'images/pc4.jpg', 'images/pc5.jpg'],
        btn: true,
        list: true,
        autoPlay: true,
        delayTime: 5000,
        moveTime: 600,
        index: 0
    })
    class Index {
        constructor() {
            this.children = $(".site-list>li");
            this.starContent = $(".star-content");
            this.televisionContent = $(".television-content");
            this.refrigeratorContent = $(".refrigerator-content");
            this.starLeft = $("#star-left");
            this.starRight = $("#star-right");
            this.addEvent();
            this.init();
        }
        addEvent() {
            var that = this;
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].onmouseenter = function () {
                    this.style.backgroundColor = "#ed1c24";
                    this.children[1].style.display = "block";
                }
                this.children[i].onmouseleave = function () {
                    this.style.backgroundColor = "";
                    this.children[1].style.display = "none";
                }
            }
            this.starLeft[0].onclick = function () {
                that.starContent[0].style.left = 0;
            }
            this.starRight[0].onclick = function () {
                that.starContent[0].style.left = -1100 + "px";
            }
            this.starContent[0].onclick = function (e) {
                if (e.target.nodeName == "IMG") {
                    localStorage.setItem("data", JSON.stringify(that.res[e.target.getAttribute("index")]));
                }
            }
            this.televisionContent[0].onclick = function (e) {
                if (e.target.nodeName == "IMG") {
                    localStorage.setItem("data", JSON.stringify(that.television[e.target.getAttribute("index")]));
                }
            }
            this.refrigeratorContent[0].onclick = function (e) {
                if (e.target.nodeName == "IMG") {
                    localStorage.setItem("data", JSON.stringify(that.refrigerator[e.target.getAttribute("index")]));
                }
            }

        }
        init() {
            var that = this;
            $.get("http://127.0.0.5:83/data/goods.json", function (res) {
                that.res = JSON.parse(res);
                that.display();
            })
            $.get("http://127.0.0.5:83/data/television.json", function (television) {
                that.television = JSON.parse(television);
                that.displayTelevision();
            })
            $.get("http://127.0.0.5:83/data/refrigerator.json", function (refrigerator) {
                that.refrigerator = JSON.parse(refrigerator);
                that.displayRefrigerator();
            })
        }
        displayRefrigerator() {
            var str = "";
            for (let i = 0; i < this.refrigerator.length; i++) {
                str += ` <div class="same-data">
                            <div class="figure">
                                <a href="details.html">
                                    <img src="${this.refrigerator[i].img}" index="${i}">
                                </a>
                            </div>
                            <h4>${this.refrigerator[i].name}</h4>
                            <div class="title">${this.refrigerator[i].info}</div>
                            <p>${this.refrigerator[i].nowPrice}<span class="del">&nbsp;<del>￥${this.refrigerator[i].prevPrice}</del></span>
                            </p>
                        </div>
                    </div>`
            }
            this.refrigeratorContent[0].innerHTML = str;
        }
        displayTelevision() {
            var str = "";
            for (let i = 0; i < this.television.length; i++) {
                str += ` <div class="same-data">
                            <div class="figure">
                                <a href="details.html">
                                    <img src="${this.television[i].img}" index="${i}">
                                </a>
                            </div>
                            <h4>${this.television[i].name}</h4>
                            <div class="title">${this.television[i].info}</div>
                            <p>${this.television[i].nowPrice}<span class="del">&nbsp;<del>￥${this.television[i].prevPrice}</del></span>
                            </p>
                        </div>
                    </div>`
            }
            this.televisionContent[0].innerHTML = str;
        }
        display() {
            var str = "";
            for (let i = 0; i < this.res.length; i++) {
                str += ` <div class="star-data">
                            <div class="figure">
                                <a href="details.html">
                                    <img src="${this.res[i].img}" index="${i}">
                                </a>
                            </div>
                            <h4>${this.res[i].name}</h4>
                            <div class="title">${this.res[i].info}</div>
                            <p>${this.res[i].nowPrice}<span class="del">&nbsp;<del>￥${this.res[i].prevPrice}</del></span>
                            </p>
                        </div>
                    </div>`
            }
            this.starContent[0].innerHTML = str;
        }
    }
    new Index;
    $("#star").click(function () {
        $("html,body").animate({
            scrollTop: $('.star-goods').offset().top - 50
        }, 800);
    })
    $("#television").click(function () {
        $("html,body").animate({
            scrollTop: $('.television').offset().top - 50
        }, 800);
    })
    $("#refrigerator").click(function () {
        $("html,body").animate({
            scrollTop: $('.refrigerator').offset().top - 50
        }, 800);
    })
    $(document).scroll(function () {
        if ($(document).scrollTop() > 733) {
            $(".floorNav")[0].style.display = "block";
        } else {
            $(".floorNav")[0].style.display = "none";
        }
    })

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