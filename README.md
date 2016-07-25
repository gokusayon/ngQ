# ngQ
Implements queue using AngularJS

While javascript is a synchronous and a single threaded language except when it makes a ,lets say , http call . It has various callbacks to handle those situation but no tool to force various calls/timeouts to be executed in a 'synchronous' way. Here all you need is to present put functions you want in one place and 'ngQ' does the rest.

####Getting Started
Include 'ngQ' in your controller. You can find it in `ngQ/js/main.js`

#####Setup
ngQ needs `AngularJS 1.x.x` and `jquery 1.10.x` to run. The fastest way to do it would be to include  [AngularJS 1.7](https://code.angularjs.org/1.5.5/angular.js). 

`ngQ` is implented as a angular factory so you need to inject it in your controller and then set it up as :
```javascript
    .controller('controllerName', ['ngQ',function(ngQ) { 
    	var myQueue = new ngQ();
    } 
  
    myQueue.enQueue(function fun3() {
            $timeout(function() {
                console.log("Executing fun3");
                $el.css("color", "red");
          }, 500);
    });
    myQueue.enQueue(function fun2() {
        $timeout(function() {
            console.log("Executing fun2");
            $el.css("color", "green");
        }, 1000);
    });
    
    myQueue.deQueue('fun 1');
    
    myQueue.initQueue();
```

####Methods

| Name        | Arguments           | Description  |
| ------------- |:-------------:| -----:|
| enQueue      | element |It takes a function to be queued as an argument.|
|                     | params |Parameter values for the function.  |
| deQueue     | null   |Execute and remove the last element from queue  |
| 	          | name   |Search, execute and remove the function from queue  |
| initQueue | null/false      |Strictly implement the queue in order |
| 	       | true      |Executes in order but does not wait explicitly to call the next funtion.  |

####Results

Results are stored in array in variable of type `ngQ`. For Example : `myQueue.result`.
