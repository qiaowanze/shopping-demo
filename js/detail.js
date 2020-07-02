;
(function () {
    $("#chooseUp").click(function () {
        $(".address").toggle();
    })

    function fn(str) {
        return document.getElementById(str);
    }
    var titleWrap = fn('title-wrap').getElementsByTagName('LI');
    var addrWrap = fn('addr-wrap'); //省市区显示模块
    var current = {
        prov: '',
        city: '',
        country: '',
        provVal: '',
        cityVal: '',
        countryVal: ''
    };

    /*自动加载省份列表*/
    window.onload = showProv2();

    function showProv2() {
        addrWrap.innerHTML = '';
        var len = provice.length;
        for (var i = 0; i < len; i++) {
            var provLi = document.createElement('li');
            provLi.innerText = provice[i]['name'];
            provLi.index = i;
            addrWrap.appendChild(provLi);
        }
    }

    addrWrap.onclick = function (e) {
        var n;
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target && target.nodeName == 'LI') {
            /*先判断当前显示区域显示的是省市区的那部分*/
            for (var z = 0; z < 3; z++) {
                if (titleWrap[z].className == 'titleSel')
                    n = z;
            }
            /*显示的处理函数*/
            switch (n) {
                case 0:
                    showCity2(target.index);
                    break;
                case 1:
                    showCountry2(target.index);
                    break;
                case 2:
                    selectCountry(target.index);
                    break;
                default:
                    showProv2();
            }
        }
    };

    /*选择省份之后显示该省下所有城市*/
    function showCity2(index) {
        addrWrap.innerHTML = '';
        current.prov = index;
        if (!provice[index]) return;
        current.provVal = provice[index].name;
        titleWrap[0].className = '';
        titleWrap[1].className = 'titleSel';
        var cityLen = provice[index].city.length;
        for (var j = 0; j < cityLen; j++) {
            var cityLi = document.createElement('li');
            cityLi.innerText = provice[index].city[j].name;
            cityLi.index = j;
            addrWrap.appendChild(cityLi);
        }
    }

    /*选择城市之后显示该城市下所有县区*/
    function showCountry2(index) {
        addrWrap.innerHTML = '';
        current.city = index;
        if (!provice[current.prov]) return;
        current.cityVal = provice[current.prov].city[index].name;
        titleWrap[1].className = '';
        titleWrap[2].className = 'titleSel';
        var countryLen = provice[current.prov].city[index].districtAndCounty.length;
        for (var k = 0; k < countryLen; k++) {
            var cityLi = document.createElement('li');
            cityLi.innerText = provice[current.prov].city[index].districtAndCounty[k];
            cityLi.index = k;
            addrWrap.appendChild(cityLi);
        }
    }

    /*选中具体的县区*/
    function selectCountry(index) {
        current.country = index;
        current.countryVal = provice[current.prov].city[current.city].districtAndCounty[index];
    }

    /*分别点击省市区标题的处理函数*/
    document.getElementById('title-wrap').onclick = function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target && target.nodeName == 'LI') {
            for (var z = 0; z < 3; z++) {
                titleWrap[z].className = '';
            }
            target.className = 'titleSel';
            if (target.value == '0') {
                showProv2();
            } else if (target.value == '1') {
                showCity2(current.prov);
            } else {
                showCountry2(current.city);
            }
        }
    };

    var data = JSON.parse(localStorage.getItem("data"));
    $(".product-top .active").html(data.name)
    var str = "";
    str = `<img src="${data.img}">`;
    $(".imgbox")[0].innerHTML = str;
    $(".product-buy h3").html(data.name);
    `  1q`
    $(".product-buy .title").html(data.info);
    $(".price-block p").html(`￥${data.nowPrice}<span class="del">&nbsp;￥<del>${data.prevPrice}</del></span>`);

    window.onload = function () {
        new Magnifier();
    };
    class Magnifier {
        constructor() {
            this.detailImg = $(".detail_img");
            this.zoomImg = $(".zoomImg");
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.detailImg.mouseover(function () {
                that.zoomImg.css("opacity", "1");
            })
            this.detailImg.mouseout(function () {
                that.zoomImg.css("opacity", "0");
            })
            this.detailImg.mousemove(function (e) {
                that.move(e);
                $(".imgbox").css("display", "none");
            })
            this.detailImg.mouseout(function (e) {
                $(".imgbox").css("display", "block");
            })

        }
        move(e) {
            var e = e || window.event;
            var l = e.clientX - this.detailImg.offset().left;
            var t = e.clientY - this.detailImg.offset().top;
            var x = l / this.detailImg.outerWidth();
            var y = t / this.detailImg.outerHeight();
            this.zoomImg[0].style.left = -x * (this.detailImg.width()) + "px";
            this.zoomImg[0].style.top = -y * (this.detailImg.height()) + "px";
        }
    }
    class Gift {
        constructor() {
            this.li = $(".list-inline li");
            this.pruchase = $(".pruchase");
            this.minusBtn = $(".minus-btn");
            this.input = $(".spinner-input");
            this.plusBtn = $(".plus-btn");
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.li.click(function () {
                for (var i = 0; i < that.li.length; i++) {
                    that.li[i].className = "";
                }
                this.className = "current";
            })
            this.pruchase.hover(function () {
                $(".qrCode").toggle();
            })
            this.minusBtn.click(function () {
                if (that.input.val() > 1) {
                    that.input[0].value = parseInt(that.input[0].value) - 1;
                }
            })
            this.plusBtn.click(function () {
                that.input[0].value = parseInt(that.input[0].value) + 1;
            })
            this.input[0].oninput = function () {
                if (that.input[0].value == "") {
                    that.input[0].value = 1;
                }
            }
        }
    }
    new Gift;

    class List {
        constructor() {
            this.cartBtn = $(".cart-btn");
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.cartBtn.click(function () {
                that.id = JSON.parse(localStorage.getItem("data")).goodsID;
                that.data = JSON.parse(localStorage.getItem("data"));
                that.setCookie();
            })
        }
        setCookie() {
            this.goods = getCookie("goodsMsg") ? JSON.parse(getCookie("goodsMsg")) : [];
            if (this.goods.length < 1) {
                this.goods.push({
                    data:this.data,
                    id: this.id,
                    num: 1
                })
            } else {
                var i = 0;
                var onoff = this.goods.some((val, idx) => {
                    i = idx;
                    return val.id == this.id;
                })
                
                if (!onoff) {
                    this.goods.push({
                        data:this.data,
                        id: this.id,
                        num: 1
                    })
                } else {
                    this.goods[i].num++;
                }
            }
            setCookie("goodsMsg", JSON.stringify(this.goods));
        }
    }
    new List;
    
    
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