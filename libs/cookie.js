function setCookie(key,val,options){
    options = options || {};
    var time = "";
    
    //根据是否传入有效期 设置有效期
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        time = ";expires="+d;
    }
    
    //根据是否传入路径 设置路径
    var path = "";
    if(options.path){
        path = ";path="+options.path;
    }
    //最后设置cookie
    document.cookie = key + "=" + val + time + path;
}

function getCookie(key){
    var v = "";
    var arr = document.cookie.split("; ");
    arr.forEach((val)=>{
        if(val.split("=")[0] === key){
            v = val.split("=")[1];  
        }
    });
    return v;
}

function removeCookie(key,options){
    options = options || {};
    options.expires = -1;
    setCookie(key,12312,options);
}
