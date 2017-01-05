/**
 * Created by hwwei on 2017/1/5.
 */
define([], function(){
    var routerConfig = {
        name: "login",
        url: "/login",
        templateUrl: "view/login/login.html",
        controller: "login.ctrl",
        lazyload: ["login/loginCtrl", "login/loginService"]
    };
    return routerConfig;
});