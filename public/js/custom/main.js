/**
 * Created by hwwei on 2017/1/4.
 */
requirejs.config({
    baseUrl: 'js/custom'
});
requirejs(["routerConfig"], function (module) {
    module.controller("mainCtrl", ["$rootScope", "$scope", function($rootScope, $scope){
        $rootScope.title = "后台系统";
    }]);
    angular.element(function () {
        angular.bootstrap(document, [module.name]);
    });
});