/**
 * Created by hwwei on 2017/1/5.
 */
define(["routerConfig"], function(config){
    var controller = ["$rootScope", function($rootScope){
        $rootScope.title = "管理后台";
    }];
    config.lazyController("main.ctrl", controller);
});