/**
 * Created by hwwei on 2017/1/5.
 */
define(["routerConfig"], function(config){
    var controller = ["$rootScope", "$scope", function($rootScope, $scope){
        $rootScope.title = "管理后台";
        $scope.name = "hello world!";
    }];
    config.lazyController("main.ctrl", controller);
    return controller;
});