;
(function () {
    class Header {
        constructor() {
            // this.removeAd = $(".remove-advertising");
            this.content = $(".content-1");
            this.search = $(".search-btn");
            this.searchInput = $(".search");
            this.searchClose = $(".search-close");
            this.addEvent();
        }
        addEvent() {
            var thats = this;
            this.search[0].onclick = function () {
                var that = this;
                $(this).parent().siblings().not(".content-img").each(function () {
                    this.style.display = "none";
                    that.style.display = "none";
                    thats.searchInput[0].style.display = "block";
                });
            }
            this.searchClose[0].onclick = function () {
                $(this).parent().parent().parent().siblings().not(this).each(function () {
                    thats.search[0].style.display = "block";
                    this.style.display = "block";
                })
                thats.searchInput[0].style.display = "none";
            }
            // this.removeAd[0].onclick = function () {
            //     this.parentNode.remove();
            // }
            for (let i = 0; i < this.content.length; i++) {
                this.content[i].onmouseenter = function () {
                    this.style.backgroundColor = "#FFF";
                    this.children[0].style.color = "red";
                    if (this.children[1]) {
                        this.children[1].style.display = "block";
                    }
                }
                this.content[i].onmouseleave = function () {
                    this.style.backgroundColor = "#F4F4F4";
                    this.children[0].style.color = "#767676";
                    if (this.children[1]) {
                        this.children[1].style.display = "none";
                    }
                }
            }
        }
    }
    new Header();
    $(document).scroll(function () {
        if ($(document).scrollTop() > 110) {
            $("#header")[0].style.position = "fixed";
            $("#header")[0].style.top = 0;
        } else {
            $("#header")[0].style.position = "absolute";
            $("#header")[0].style.top = "40px";
        }
    })
})();