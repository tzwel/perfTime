# ⏱️ perfTime

PerfTime is a simple utility for measuring function execution time

It works by wrapping the `performance.now()` method and gives you a simple to use API for quick debugging purposes

## Installation:
```
npm i @tzwel/perftime
```

## Usage:
### Basic usage
```js
const perfTime = require('@tzwel/perftime')

function someRandomFunction() {
	const measurement = new perfTime({function: someRandomFunction}) // initialize perfTime
	measurement.start() // start measuring execution speed

	// code to be measured goes here

	measurement.stop() // stop the measurement and log results
	// => Executing 'someRandomFunction' took 0.006400000000000735ms
}

// call the measured function
someRandomFunction()
```

Some methods be chained, which means you can shorten the code above to this:
```js
const measurement = new perfTime({function: someRandomFunction}).start()
// code to be measured goes here
measurement.stop()

```

You can also pass the name of the benchmarked function as a string, or don't specify it at all. In the latter case fhe function will get called an *unnamed function*
```js
const measurement = new perfTime('some function name')
const measurement = new perfTime() // empty, function gets called an *unnamed function*
```


### Multiple measures and average
You can measure a function multiple times and then get its average execution time

> [!WARNING]
> When getting average time, the first result always gets omitted in calculating the average, because the first function call is always slower before optimizations take place

It can be done inside the function like this: 

```js
function someRandomFunction() {
	const measurement = new perfTime({function: someRandomFunction})
	
	for (let index = 0; index < 15; index++) { // a for loop that executes code multiple times
		measurement.start()
		// function code to be measured goes here
		measurement.stop()
	}

	console.log(measurement.averageTime); // log the average time of execution
}
```

Or by wrapping the function call in a for loop (you can implement this however you want)

```js
const measurement = new perfTime({function: someRandomFunction})
for (let index = 0; index < 15; index++) {
	measurement.start()
	someRandomFunction()
	measurement.stop()
}
console.log(measurement.averageTime);
```

## Compensation

PerfTime subtracts 0.0092 from the result by default. To disable this behavior, set compensation to 0:
```js
const measurement = new perfTime({compensation: 0})
```