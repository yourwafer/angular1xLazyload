/**
 * Created by hwwei on 2017/1/5.
 */
define("loginCtrl", ["routerConfig"], function (config) {
    var controller = ["$scope", "$rootScope", "loginService", "$state", function ($scope, $rootScope, loginService, $state) {
        $rootScope.title = "后台登录";
        $scope.login = function () {
            $state.go("main")
        }
    }];
    config.lazyController("login.ctrl", controller);
    return controller;
});