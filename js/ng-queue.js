
//
//  ng-queue.js
//
//  Created by Vasu SHeoran on 25/06/16.
//  Copyright (c) 2016 Vasu Sheoran. All rights reserved.
//

app.factory('ngQ', ['$timeout', '$q', function($timeout, $q) {

    var queue = [];
    var name = [];
    var result = [];


    function Manager() {
        this.queue = queue;
        this.result = result;
    }

    function waitForAngular(callback) {
        try {
            var app = angular.element(document.querySelector('body'));
            var $browser = app.injector().get('$browser');
            $browser.notifyWhenNoOutstandingRequests(callback);
        } catch (err) {
            callback(err.message);
        }
    }

    Manager.prototype = (function() {

        var wrapFunction = function(fn, context, param, after) {
            return function() {
                name.push(fn.name);
                var result = fn.apply(context, param);
                after.call(this, result);
                return result;
            }
        }

        function _addFunction(element, params) {
            var myFunction = wrapFunction(element, this, params, wrapFunction);

            //queue.push($q.when(myFunction));
            if (element.name)
                Object.defineProperty(myFunction, "name", {
                    value: element.name
                });

            queue.push(myFunction);
            currentElement = myFunction;
        }

        /**
         * Adds a new element to the queue.
         *
         * @param {element} function name(params) {}
         * @param {params} Array
         *
         * @return {void}
         */
        function enQueue(element, params) {
            try {

                if (_isFunction(element)) {
                    if (params == undefined || params.length == 0)
                        params = [];

                    _addFunction(element, params);
                } else {
                    throw new Error(element + " is not a function")
                }
            } catch (err) {
                console.log(err);
                return err.message;
            }
        }

        function _search(name) {
            for (var i in queue) {
                if (queue[i].name == name)
                    return i;
            }
            return false;
        }

        
        /**
         * Removes an element from the queue.
         *
         * @param {name} String
         *
         * @return {void}
         */

        function deQueue(name) {
            if (name)
                var index = _search(name);
            if (index != null) {
                var func = queue.splice(index, 1);
                return func[0]();
            } else
                queue.shift();
        }

        function _isFunction(elem) {
            if (typeof elem == "function")
                return true;
            else
                return false;
        }

        function _strict(callback) {

            if (queue.length > 0) {
                waitForAngular(function() {
                    $q.resolve(queue.shift()(), function(args) {
                        if (args != null) result.push(args);
                        else result.push("");

                        callback(_strict);
                    }, function() {
                        if (args != null) result.push(args);
                        else result.push("");

                        callback(_strict);
                    });
                });
            }
        }

        function _execute(callback) {
            $q.resolve(queue.shift()(), function(args) {
                if (queue.length > 0) {
                    callback(_execute);
                }
            }, function() {
                if (queue.length > 0) {
                    callback(_execute);
                }
            });
        }

        /** 
         * Inititalizes the queue.
         *
         * @param {value} Boolean
         *
         * @return {void}
         */
        function initQueue(value) {
            if (!value) {
                var promise;
                if (queue.length > 0)
                    _strict(_strict);
            } else {
                if (queue.length > 0)
                    _execute(_execute);
            }
        }

        return {
            enQueue: enQueue,
            deQueue: deQueue,
            initQueue: initQueue
        };


    })();

    return Manager;
}]);
