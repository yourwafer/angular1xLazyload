/**
 * Created by hwwei on 2017/1/5.
 */
define([], function(){
    var routerConfig = {
        name: "home",
        url: "/",
        templateUrl: "view/home/home.html",
        controller: "home.ctrl",
        lazyload: ["home/homeCtrl"]
    };
    return routerConfig;
});