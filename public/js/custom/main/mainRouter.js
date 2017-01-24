/**
 * Created by hwwei on 2017/1/5.
 */
define([], function(){
    var routerConfig = {
        name: "main",
        url: "/main",
        templateUrl: "view/main/main.html",
        controller: "main.ctrl",
        lazyload: ["main/mainCtrl", "language/languageRouter"]
    };
    return routerConfig;
});