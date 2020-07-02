const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

http.createServer((req,res)=>{
    if(req.url != "/favicon.ico"){
        var urlObj = url.parse(req.url);
        if(urlObj.pathname === "/api"){
            ajaxHandle(req, res);
        }else{
            fsHandle(req,res);
        }

    }
}).listen("83","127.0.0.5");

let userMsg = [];

function ajaxHandle(req,res){

    let str = "";
    req.on("data",(d)=>{
        str += d;
    })
    req.on("end",()=>{
        let data = str ? querystring.parse(str) : url.parse(req.url,true).query;
        if (data.type == "login") {
            login(res, data);
        } else {
            register(res, data);
        }
    })
}
function login(res,data){
    // 登录
    let on = true;
    for(var i=0;i<userMsg.length;i++){
        if(userMsg[i].user === data.user){
            on = false;
            let resMsg = {};
            if(userMsg[i].pass === data.pass){
                resMsg.code = 1;
                resMsg.msg = "登录成功";
                resMsg.user = data.user;
            }else{
                resMsg.code = 2;
                resMsg.msg = "密码不符";
            }
            res.write(JSON.stringify(resMsg));
            res.end();
            return;
        }
    }
    if(on){
        let resMsg = {
            code:0,
            msg:"用户名不存在，请先注册"
        }
        res.write(JSON.stringify(resMsg));
        res.end();
    }
}
function register(res,data){
    // 注册
    let i = userMsg.some((val)=>{
        return val.user === data.user;
    })
    let resMsg = {};
    if(i){
        resMsg.code = 0;
        resMsg.msg = "用户名重复";
    }else{
        userMsg.push({
            user:data.user,
            pass:data.pass,
        })
        resMsg.code = 1;
        resMsg.msg = "注册成功";
    }
    res.write(JSON.stringify(resMsg));
    res.end();
}
function fsHandle(req,res){
    const path = "../../kangjia" + req.url;
    fs.readFile(path,(err,data)=>{
        if(err){
            res.write("404");
        }else{
            res.write(data);
        }
        res.end();
    })
}
