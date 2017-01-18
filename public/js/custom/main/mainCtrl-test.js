/**
 * Created by hwwei on 2017/1/10.
 */
define(["main/mainCtrl"], function () {
    describe("mainCtrl test", function () {
        it("controller has bean defined", function () {
            beforeEach(module("lazyload"));
            var $controller;
            var rootScope;
            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                rootScope = _$rootScope_;
            }));

            var $scope = rootScope.$new();
            var controller = $controller("main.ctrl", {$scope: $scope});
            expect($scope.name).toEqual("hello world!");
        });
    });
});