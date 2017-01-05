/**
 * Created by hwwei on 2017/1/5.
 */
define(["require",
        "login/loginRouter",
        "home/homeRouter",
        "main/mainRouter"
    ],
    function () {
        function buildLoadDepend(depends) {
            return function ($q, $rootScope) {
                var defer = $q.defer();
                require(depends, function () {
                    $rootScope.$apply(function () {
                        defer.resolve();
                    });
                });
                return defer.promise;
            };
        }

        var routers = arguments;
        var require = routers[0];
        var routerSize = routers.length;
        /**the first element is require*/
        for (var routerIndex = 1; routerIndex < routerSize; ++routerIndex) {
            var router = routers[routerIndex];
            if (router.lazyload !== undefined) {
                if (router.lazyload.length > 0) {
                    router.resolve = router.resolve || {};
                    router.resolve._depends = buildLoadDepend(router.lazyload);
                }
            }
        }

        var lazyloadModule = angular.module("lazyload", ["ui.router"]);
        lazyloadModule.config(["$stateProvider", "$controllerProvider", "$filterProvider", "$compileProvider", "$provide",
            function ($stateProvider, $controllerProvider, $filterProvider, $compileProvider, $provide) {
                lazyloadModule.lazyDirective = $compileProvider.directive;
                lazyloadModule.lazyFilter = $filterProvider.register;
                lazyloadModule.lazyController = $controllerProvider.register;
                lazyloadModule.lazyProvider = $provide.provider;
                lazyloadModule.lazyService = $provide.service;
                lazyloadModule.lazyFactory = $provide.factory;
                lazyloadModule.lazyValue = $provide.value;
                lazyloadModule.lazyConstant = $provide.constant;

                for (var i = 1; i < routerSize; ++i) {
                    var item = routers[i];
                    $stateProvider.state(item);
                }
            }]);
        return lazyloadModule;
    });