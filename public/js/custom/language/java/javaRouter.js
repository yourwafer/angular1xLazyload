/**
 * Created by hwwei on 2017/1/24.
 */
define(["routerConfig"], function(config){
    var routerConfig = {
        name: "main.language.java",
        url: "/language/java",
        templateUrl: "view/language/java.html"
    };
    config.state(routerConfig);
    return routerConfig;
});