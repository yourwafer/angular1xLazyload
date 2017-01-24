/**
 * Created by hwwei on 2017/1/5.
 */
define(["routerConfig"], function(config){
    var controller = ["$scope", "$state", "$rootScope", function($scope, $state, $rootScope){
        $rootScope.title = "点击跳转";
        $scope.go = function () {
            $state.go("login")
        };
    }];
    config.lazyController("home.ctrl", controller);
    return controller;
});