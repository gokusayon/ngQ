var app = angular
    .module('app', []);

app.controller('Main', ['$scope', 'ngQ', '$timeout', function($scope, ngQ, $timeout) {
    var $el = $('#hello');


    var func = function fun1() {
        $timeout(function() {
            console.log("Executing fun1");
            $el.css("color", "brown");
        }, 2000);
        return "Test";
    }
    $scope.check = new ngQ();

    $scope.check.enQueue(function fun3() {
        $timeout(function() {
            console.log("Executing fun3");
            $el.css("color", "red");
        }, 500);

    });
    $scope.check.enQueue(function fun2() {
        $timeout(function() {
            console.log("Executing fun2");
            $el.css("color", "green");
        }, 1000);
    });

    $scope.check.enQueue(func);

    $scope.check.enQueue(function fun2() {
        $timeout(function() {
            console.log("Executing fun2");
            $el.css("color", "green");
        }, 1000);
    });

    $scope.check.initQueue();

    $scope.hello = "This will change color";
}]);