/**
 * Created by hwwei on 2017/1/24.
 */
define(["routerConfig", "language/java/javaRouter", "language/springboot/springBootRouter"], function(config){
    var routerConfig = {
        name: "main.language",
        url: "/language",
        template: "<div ui-view></div>",
        abstract: true
    };
    config.state(routerConfig);
    return routerConfig;
});