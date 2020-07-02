;
(function () {
    class Species {
        constructor() {
            this.mainGoods = document.querySelector(".main-goods");
            this.pageCont = document.querySelector(".pageCont");
            this.index = 0;
            this.num = 20;
            this.load();
            this.addEvent();
        }
        load() {
            var that = this;
            $.get("http://127.0.0.5:83/data/species.json", function (res) {
                that.res = JSON.parse(res);
                that.createPage();
                that.display();
            })
        }
        display() {
            let str = "";
            for (var i=this.index*this.num;i<this.index*this.num+this.num;i++) {
                if(i<this.res.length){
                    str += `<div class="main-goods-same">
                        <div class="figure">
                            <a href="details.html" class="">
                                <img src="${this.res[i].img}" style="display: inline;" index=${i}>
                            </a>
                        </div>
                        <h4 class="figure-title">${this.res[i].name}</h4>
                        <div class="figure-title figureColor">${this.res[i].info}</div>
                        <p class="price">￥${this.res[i].nowPrice}</p>
                    </div>`
                }
            }
            $(".main-goods")[0].innerHTML = str;
        }
        createPage(){
            this.maxNum = Math.ceil(this.res.length / this.num);
            var str = "";
            for(var i=0;i<this.maxNum;i++){
                str += `<li index="${i}">${i+1}</li>`;
            }
            $(".pageCont")[0].innerHTML = str;
        }
        addEvent(){
            var that = this;
            this.pageCont.onclick = function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName == "LI"){
                    that.index = eve.target.getAttribute("index");
                    that.display();
                }
            }
            this.mainGoods.onclick = function (e) {
                if (e.target.nodeName == "IMG") {
                    that.setStorage(e.target.getAttribute("index"));  
                }
            }
        }
        setStorage(index) {
            localStorage.setItem("data", JSON.stringify(this.res[index]));
        }
    }
    new Species;
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