;
(function () {
    class Cart {
        constructor() {
            this.cartContent = $("tbody");
            this.checkAll = document.getElementsByClassName('check-all');
            this.selectedTotal = document.getElementById("selectedTotal");
            this.priceTotal = document.getElementById("priceTotal");
            this.selected;
            this.price;
            this.addEvent();
            this.getCookie();
            this.getTotal();
        }
        addEvent() {
            var that = this;
            //删除事件
            this.cartContent.click(function (eve) {
                if (eve.target.className == "delete") {
                    var con = confirm("确定删除此商品嘛?")
                    if (con) {
                        that.id = eve.target.parentNode.parentNode.getAttribute("index");
                        eve.target.parentNode.parentNode.remove();
                        that.changeCookie(function (index) {
                            that.goods.splice(index, 1);
                        });
                    }
                }
                if (eve.target.className == "add") {
                    eve.target.previousElementSibling.value = parseInt(eve.target.previousElementSibling.value) + 1;
                    eve.target.parentNode.nextElementSibling.innerHTML = (parseInt(eve.target.previousElementSibling.value) * eve.target.parentNode.previousElementSibling.innerHTML).toFixed(2);
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function (index) {
                        that.goods[index].num = eve.target.previousElementSibling.value;
                    });
                    that.getTotal();
                }
                if (eve.target.className == "reduce") {
                    if (eve.target.nextElementSibling.value > 1) {
                        eve.target.nextElementSibling.value = parseInt(eve.target.nextElementSibling.value) - 1;
                    }
                    eve.target.parentNode.nextElementSibling.innerHTML = (parseInt(eve.target.nextElementSibling.value) * eve.target.parentNode.previousElementSibling.innerHTML).toFixed(2);
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function (index) {
                        that.goods[index].num = eve.target.nextElementSibling.value;
                    });
                    that.getTotal();
                }
                if (eve.target.id == "check-one") {
                    var onoff = true;
                    for (let i = 1; i < $(".check").length - 1; i++) {
                        if ($(".check")[i].checked == false) {
                            onoff = false
                        }
                    }
                    if (onoff) {
                        that.checkAll[0].checked = true;
                        that.checkAll[1].checked = true;
                    } else {
                        that.checkAll[0].checked = false;
                        that.checkAll[1].checked = false;
                    }
                    that.getTotal();
                }
            })
            //修改数量事件
            this.cartContent[0].oninput = function (eve) {
                if (eve.target.className == "count-input") {
                    eve.target.parentNode.nextElementSibling.innerHTML = (parseInt(eve.target.value) * eve.target.parentNode.previousElementSibling.innerHTML).toFixed(2);
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function (index) {
                        that.goods[index].num = eve.target.value;
                    });
                    if (eve.target.value <= 1) {
                        eve.target.value = 1;
                    }
                }
            }
            for (let i = 0; i < this.checkAll.length; i++) {
                this.checkAll[i].onclick = function () {
                    for (var j = 0; j < document.getElementsByClassName('check').length; j++) {
                        document.getElementsByClassName('check')[j].checked = this.checked;
                    }
                    if (!that.checkAll[i].checked) {
                        that.selectedTotal.innerHTML = 0;
                        that.priceTotal.innerHTML = 0;
                    } else {
                        that.getTotal();
                    }

                }
            }
        }
        //总数和总价
        getTotal() {
            var Price = 0;
            var Num = 0;
            for (var i = 0; i < this.goods.length; i++) {
                Price += this.goods[i].data.nowPrice * this.goods[i].num;
                Num += (this.goods[i].num)*1;
            }

            this.selectedTotal.innerHTML = Num;
            this.priceTotal.innerHTML = Price.toFixed(2);
        }
        //改变cookie
        changeCookie(cb) {
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == this.id) {
                    cb(i);
                    break;
                }
            }
            setCookie("goodsMsg", JSON.stringify(this.goods))
        }
        //获取cookie中的数据
        getCookie() {
            this.goods = getCookie("goodsMsg") ? JSON.parse(getCookie("goodsMsg")) : [];
            this.display();
            console.log(this.goods);
        }
        display() {
            var str = "";
            for (var i = 0; i < this.goods.length; i++) {
                str += `
                    <tr class="on" index="${this.goods[i].id}">
                        <td class="checkbox"><input class="check" id="check-one"type="checkbox"checked></td>
                        <td class="goods">
                            <img src="${this.goods[i].data.img}">
                            <span>${this.goods[i].data.name}</span>
                            <h4>${this.goods[i].data.info}</h4>
                        </td>
                        <td class="price">${this.goods[i].data.nowPrice}</td>
                        <td class="count">
                            <span class="reduce">-</span>
                            <input class="count-input" type="text" value="${this.goods[i].num}">
                            <span class="add">+</span>
                        </td>
                        <td class="subtotal">${(this.goods[i].data.nowPrice * this.goods[i].num).toFixed(2)}</td>
                        <td class="operation"><span class="delete">删除</span></td>
                    </tr>
                `
            }
            this.cartContent.html(str);
        }
    }
    new Cart;

    //确认登录状态
    var msg = localStorage.getItem("loginUser");
    if (msg) {
        $(".top-header-status").hide();
        $(".personal").show();
        $(".personal").find("a").html(JSON.parse(msg));
        $(".foot").show();
    } else {
        $(".top-header-status").show();
        $(".personal").hide();
        $(".warning").show();
        $(".cart-content").hide();
        $(".foot").hide();
    }

    $(".per_btn").click(function () {
        $(".log_out").toggle();
    })

    $(".log_out_btn").click(function () {
        localStorage.removeItem("loginUser");
        $(".top-header-status").show();
        $(".personal").hide();
        location.reload();
    })
})();