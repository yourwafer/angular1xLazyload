/**
 * Created by hwwei on 2017/1/24.
 */
define(["routerConfig"], function(config){
    var routerConfig = {
        name: "main.language.springboot",
        url: "/language/springboot",
        templateUrl: "view/language/springboot.html"
    };
    config.state(routerConfig);
    return routerConfig;
});